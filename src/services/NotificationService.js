import React, { createContext, useContext, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { getMedications, getDeliveryDates } from "./StorageService";

// Configurar el comportamiento de las notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#A3D8FF",
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Push token:", token);

    return token;
  };

  const scheduleMedicationReminder = async (medication) => {
    try {
      const { time, name, dosage } = medication;
      const [hours, minutes] = time.split(":").map(Number);

      const trigger = {
        hour: hours,
        minute: minutes,
        repeats: true,
      };

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "💊 Hora de tomar medicamento",
          body: `Es hora de tomar ${name} (${dosage})`,
          sound: "default",
          data: { medicationId: medication.id },
        },
        trigger,
        identifier: `medication_${medication.id}`,
      });

      console.log(`Scheduled reminder for ${name} at ${time}`);
    } catch (error) {
      console.error("Error scheduling medication reminder:", error);
    }
  };

  const scheduleDeliveryReminder = async (delivery) => {
    try {
      const deliveryDate = new Date(delivery.date);
      const reminderDate = new Date(deliveryDate);
      reminderDate.setDate(reminderDate.getDate() - 2); // Recordar 2 días antes

      // Solo programar si la fecha de recordatorio es en el futuro
      if (reminderDate > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "📅 Recordatorio de entrega",
            body: `En 2 días debes ir por ${delivery.medication} a las ${delivery.time}`,
            sound: "default",
            data: { deliveryId: delivery.id },
          },
          trigger: { date: reminderDate },
          identifier: `delivery_${delivery.id}`,
        });

        console.log(`Scheduled delivery reminder for ${delivery.medication}`);
      }
    } catch (error) {
      console.error("Error scheduling delivery reminder:", error);
    }
  };

  const scheduleBloodPressureReminder = async () => {
    try {
      const trigger = {
        hour: 18, // 6 PM
        minute: 0,
        repeats: true,
      };

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "❤️ Control de tensión arterial",
          body: "Recuerda medir tu presión arterial hoy",
          sound: "default",
        },
        trigger,
        identifier: "blood_pressure_reminder",
      });

      console.log("Scheduled blood pressure reminder");
    } catch (error) {
      console.error("Error scheduling blood pressure reminder:", error);
    }
  };

  const scheduleAllReminders = async () => {
    try {
      // Cancelar todas las notificaciones existentes
      await Notifications.cancelAllScheduledNotificationsAsync();

      // Programar recordatorios de medicamentos
      const medications = await getMedications();
      for (const medication of medications) {
        if (medication.schedule) {
          await scheduleMedicationReminder(medication);
        }
      }

      // Programar recordatorios de entregas
      const deliveries = await getDeliveryDates();
      for (const delivery of deliveries) {
        await scheduleDeliveryReminder(delivery);
      }

      // Programar recordatorio de presión arterial
      await scheduleBloodPressureReminder();

      console.log("All reminders scheduled successfully");
    } catch (error) {
      console.error("Error scheduling all reminders:", error);
    }
  };

  const cancelMedicationReminder = async (medicationId) => {
    try {
      await Notifications.cancelScheduledNotificationAsync(
        `medication_${medicationId}`
      );
      console.log(`Cancelled reminder for medication ${medicationId}`);
    } catch (error) {
      console.error("Error cancelling medication reminder:", error);
    }
  };

  const cancelDeliveryReminder = async (deliveryId) => {
    try {
      await Notifications.cancelScheduledNotificationAsync(
        `delivery_${deliveryId}`
      );
      console.log(`Cancelled reminder for delivery ${deliveryId}`);
    } catch (error) {
      console.error("Error cancelling delivery reminder:", error);
    }
  };

  const sendMotivationalNotification = async () => {
    const motivationalMessages = [
      "Tu salud está en tus manos 💪",
      "Cada día es una oportunidad de cuidarte 🌟",
      "Pequeños pasos, grandes resultados 🎯",
      "Tu bienestar es tu prioridad ❤️",
      "Hoy es un buen día para estar saludable 🌈",
      "La constancia es la clave del éxito 🗝️",
      "Cuidar tu salud es cuidar tu futuro 🔮",
      "Eres más fuerte de lo que crees 💪",
    ];

    const randomMessage =
      motivationalMessages[
        Math.floor(Math.random() * motivationalMessages.length)
      ];

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🌟 Mensaje motivacional",
          body: randomMessage,
          sound: "default",
        },
        trigger: {
          seconds: 60, // Enviar en 1 minuto
        },
        identifier: "motivational_message",
      });
    } catch (error) {
      console.error("Error sending motivational notification:", error);
    }
  };

  const getScheduledNotifications = async () => {
    try {
      const scheduledNotifications =
        await Notifications.getAllScheduledNotificationsAsync();
      return scheduledNotifications;
    } catch (error) {
      console.error("Error getting scheduled notifications:", error);
      return [];
    }
  };

  const value = {
    expoPushToken,
    notification,
    scheduleMedicationReminder,
    scheduleDeliveryReminder,
    scheduleBloodPressureReminder,
    scheduleAllReminders,
    cancelMedicationReminder,
    cancelDeliveryReminder,
    sendMotivationalNotification,
    getScheduledNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
