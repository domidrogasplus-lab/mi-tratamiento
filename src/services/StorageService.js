import AsyncStorage from "@react-native-async-storage/async-storage";

// Claves para AsyncStorage
const STORAGE_KEYS = {
  USER_DATA: "user_data",
  MEDICATIONS: "medications",
  BLOOD_PRESSURE: "blood_pressure",
  DELIVERY_DATES: "delivery_dates",
  CAREGIVERS: "caregivers",
  APP_SETTINGS: "app_settings",
  HAS_LAUNCHED: "has_launched",
};

// Servicio para datos del usuario
export const saveUserData = async (userData) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_DATA,
      JSON.stringify(userData)
    );
    await AsyncStorage.setItem(STORAGE_KEYS.HAS_LAUNCHED, "true");
    return true;
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

export const getUserData = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// Servicio para medicamentos
export const saveMedication = async (medication) => {
  try {
    const medications = await getMedications();
    const newMedication = {
      id: Date.now().toString(),
      ...medication,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    medications.push(newMedication);
    await AsyncStorage.setItem(
      STORAGE_KEYS.MEDICATIONS,
      JSON.stringify(medications)
    );
    return newMedication;
  } catch (error) {
    console.error("Error saving medication:", error);
    throw error;
  }
};

export const getMedications = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.MEDICATIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting medications:", error);
    return [];
  }
};

export const updateMedication = async (medicationId, updates) => {
  try {
    const medications = await getMedications();
    const index = medications.findIndex((med) => med.id === medicationId);
    if (index !== -1) {
      medications[index] = { ...medications[index], ...updates };
      await AsyncStorage.setItem(
        STORAGE_KEYS.MEDICATIONS,
        JSON.stringify(medications)
      );
      return medications[index];
    }
    throw new Error("Medication not found");
  } catch (error) {
    console.error("Error updating medication:", error);
    throw error;
  }
};

export const deleteMedication = async (medicationId) => {
  try {
    const medications = await getMedications();
    const filteredMedications = medications.filter(
      (med) => med.id !== medicationId
    );
    await AsyncStorage.setItem(
      STORAGE_KEYS.MEDICATIONS,
      JSON.stringify(filteredMedications)
    );
    return true;
  } catch (error) {
    console.error("Error deleting medication:", error);
    throw error;
  }
};

// Servicio para presión arterial
export const saveBloodPressureData = async (measurements) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.BLOOD_PRESSURE,
      JSON.stringify(measurements)
    );
    return true;
  } catch (error) {
    console.error("Error saving blood pressure data:", error);
    throw error;
  }
};

export const getBloodPressureData = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.BLOOD_PRESSURE);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting blood pressure data:", error);
    return [];
  }
};

// Servicio para fechas de entrega
export const saveDeliveryDate = async (delivery) => {
  try {
    const deliveries = await getDeliveryDates();
    const newDelivery = {
      id: Date.now().toString(),
      ...delivery,
      createdAt: new Date().toISOString(),
    };
    deliveries.push(newDelivery);
    await AsyncStorage.setItem(
      STORAGE_KEYS.DELIVERY_DATES,
      JSON.stringify(deliveries)
    );
    return newDelivery;
  } catch (error) {
    console.error("Error saving delivery date:", error);
    throw error;
  }
};

export const getDeliveryDates = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.DELIVERY_DATES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting delivery dates:", error);
    return [];
  }
};

// Servicio para cuidadores
export const saveCaregiver = async (caregiver) => {
  try {
    const caregivers = await getCaregivers();
    caregivers.push(caregiver);
    await AsyncStorage.setItem(
      STORAGE_KEYS.CAREGIVERS,
      JSON.stringify(caregivers)
    );
    return caregiver;
  } catch (error) {
    console.error("Error saving caregiver:", error);
    throw error;
  }
};

export const getCaregivers = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CAREGIVERS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting caregivers:", error);
    return [];
  }
};

export const deleteCaregiver = async (caregiverId) => {
  try {
    const caregivers = await getCaregivers();
    const filteredCaregivers = caregivers.filter(
      (caregiver) => caregiver.id !== caregiverId
    );
    await AsyncStorage.setItem(
      STORAGE_KEYS.CAREGIVERS,
      JSON.stringify(filteredCaregivers)
    );
    return true;
  } catch (error) {
    console.error("Error deleting caregiver:", error);
    throw error;
  }
};

// Servicio para configuraciones de la app
export const saveAppSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.APP_SETTINGS,
      JSON.stringify(settings)
    );
    return true;
  } catch (error) {
    console.error("Error saving app settings:", error);
    throw error;
  }
};

export const getAppSettings = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
    return data
      ? JSON.parse(data)
      : {
          notifications: true,
          darkMode: false,
          premium: false,
          language: "es",
          reminderTime: "08:00",
        };
  } catch (error) {
    console.error("Error getting app settings:", error);
    return {
      notifications: true,
      darkMode: false,
      premium: false,
      language: "es",
      reminderTime: "08:00",
    };
  }
};

// Servicio para limpiar todos los datos
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.MEDICATIONS,
      STORAGE_KEYS.BLOOD_PRESSURE,
      STORAGE_KEYS.DELIVERY_DATES,
      STORAGE_KEYS.CAREGIVERS,
      STORAGE_KEYS.APP_SETTINGS,
    ]);
    return true;
  } catch (error) {
    console.error("Error clearing all data:", error);
    throw error;
  }
};

// Servicio para exportar datos
export const exportAllData = async () => {
  try {
    const [
      userData,
      medications,
      bloodPressure,
      deliveryDates,
      caregivers,
      settings,
    ] = await Promise.all([
      getUserData(),
      getMedications(),
      getBloodPressureData(),
      getDeliveryDates(),
      getCaregivers(),
      getAppSettings(),
    ]);

    return {
      userData,
      medications,
      bloodPressure,
      deliveryDates,
      caregivers,
      settings,
      exportDate: new Date().toISOString(),
      appVersion: "1.0.0",
    };
  } catch (error) {
    console.error("Error exporting data:", error);
    throw error;
  }
};
