// Utilidades y funciones auxiliares para MiTratamiento

import { colors } from "../styles/colors";

// Formateo de fechas
export const formatDate = (dateString, options = {}) => {
  const date = new Date(dateString);
  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  };
  return date.toLocaleDateString("es-CO", defaultOptions);
};

export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Cálculos de presión arterial
export const getBloodPressureCategory = (systolic, diastolic) => {
  if (systolic < 120 && diastolic < 80) {
    return {
      category: "Normal",
      color: colors.pressure.normal,
      message: "¡Excelente! Tu presión arterial está en el rango normal.",
      recommendations: [
        "Mantén tu estilo de vida saludable",
        "Continúa con tu tratamiento médico",
        "Realiza controles regulares",
      ],
    };
  } else if (systolic < 140 && diastolic < 90) {
    return {
      category: "Prehipertensión",
      color: colors.pressure.prehypertension,
      message: "Tu presión está elevada. Consulta con tu médico.",
      recommendations: [
        "Reduce el consumo de sal",
        "Aumenta la actividad física",
        "Mantén un peso saludable",
        "Evita el estrés",
      ],
    };
  } else {
    return {
      category: "Hipertensión",
      color: colors.pressure.hypertension,
      message: "Tu presión está alta. Consulta inmediatamente con tu médico.",
      recommendations: [
        "Consulta con tu médico urgentemente",
        "Toma tus medicamentos según indicación",
        "Evita actividades que aumenten la presión",
        "Monitorea tu presión regularmente",
      ],
    };
  }
};

// Validaciones
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ""));
};

export const validateAge = (age) => {
  const ageNum = parseInt(age);
  return ageNum >= 18 && ageNum <= 120;
};

// Cálculos de tiempo
export const getDaysUntil = (targetDate) => {
  const today = new Date();
  const target = new Date(targetDate);
  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getTimeUntil = (targetTime) => {
  const now = new Date();
  const [hours, minutes] = targetTime.split(":");
  const target = new Date();
  target.setHours(parseInt(hours), parseInt(minutes), 0, 0);

  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  const diffTime = target - now;
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  return { hours: diffHours, minutes: diffMinutes };
};

// Generación de mensajes motivacionales
export const getMotivationalMessage = () => {
  const messages = [
    "Tu salud está en tus manos 💪",
    "Cada día es una oportunidad de cuidarte 🌟",
    "Pequeños pasos, grandes resultados 🎯",
    "Tu bienestar es tu prioridad ❤️",
    "Hoy es un buen día para estar saludable 🌈",
    "La constancia es la clave del éxito 🗝️",
    "Cuidar tu salud es cuidar tu futuro 🔮",
    "Eres más fuerte de lo que crees 💪",
    "Cada medicamento es un paso hacia la salud 🏥",
    "Tu dedicación a la salud es admirable 👏",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

// Generación de consejos de salud
export const getHealthTip = () => {
  const tips = [
    {
      title: "Hidratación",
      content:
        "Bebe al menos 8 vasos de agua al día para mantener tu cuerpo hidratado",
      icon: "💧",
    },
    {
      title: "Ejercicio",
      content:
        "Camina al menos 30 minutos diarios para mantener tu corazón saludable",
      icon: "🚶‍♀️",
    },
    {
      title: "Alimentación",
      content:
        "Incluye frutas y verduras en cada comida para una dieta balanceada",
      icon: "🥗",
    },
    {
      title: "Descanso",
      content: "Duerme 7-8 horas diarias para que tu cuerpo se recupere",
      icon: "😴",
    },
    {
      title: "Estrés",
      content: "Practica técnicas de relajación como respiración profunda",
      icon: "🧘‍♀️",
    },
  ];
  return tips[Math.floor(Math.random() * tips.length)];
};

// Cálculo de estadísticas
export const calculateMedicationStats = (medications) => {
  const total = medications.length;
  const taken = medications.filter((med) => med.status === "taken").length;
  const pending = medications.filter((med) => med.status === "pending").length;
  const overdue = medications.filter((med) => med.status === "overdue").length;

  return {
    total,
    taken,
    pending,
    overdue,
    adherenceRate: total > 0 ? Math.round((taken / total) * 100) : 0,
  };
};

export const calculateBloodPressureStats = (measurements) => {
  if (measurements.length === 0) return null;

  const recent = measurements.slice(0, 7); // Últimos 7 días
  const avgSystolic =
    recent.reduce((sum, m) => sum + m.systolic, 0) / recent.length;
  const avgDiastolic =
    recent.reduce((sum, m) => sum + m.diastolic, 0) / recent.length;
  const avgPulse =
    recent.reduce((sum, m) => sum + (m.pulse || 0), 0) / recent.length;

  return {
    avgSystolic: Math.round(avgSystolic),
    avgDiastolic: Math.round(avgDiastolic),
    avgPulse: Math.round(avgPulse),
    totalMeasurements: measurements.length,
    recentMeasurements: recent.length,
  };
};

// Generación de reportes
export const generateHealthReport = (
  userData,
  medications,
  bloodPressure,
  deliveryDates
) => {
  const report = {
    patient: {
      name: userData.name,
      age: userData.age,
      eps: userData.eps,
      reportDate: new Date().toISOString(),
    },
    medications: {
      total: medications.length,
      adherence: calculateMedicationStats(medications).adherenceRate,
      list: medications.map((med) => ({
        name: med.name,
        dosage: med.dosage,
        status: med.status,
        lastTaken: med.lastTaken,
      })),
    },
    bloodPressure:
      bloodPressure.length > 0
        ? {
            latest: bloodPressure[0],
            average: calculateBloodPressureStats(bloodPressure),
          }
        : null,
    deliveries: {
      upcoming: deliveryDates.filter((d) => getDaysUntil(d.date) >= 0).length,
      overdue: deliveryDates.filter((d) => getDaysUntil(d.date) < 0).length,
    },
  };

  return report;
};

// Utilidades para notificaciones
export const getNotificationMessage = (type, data) => {
  const messages = {
    medication: {
      title: "💊 Hora de tomar medicamento",
      body: `Es hora de tomar ${data.name} (${data.dosage})`,
    },
    delivery: {
      title: "📅 Recordatorio de entrega",
      body: `En ${data.daysUntil} días debes ir por ${data.medication}`,
    },
    bloodPressure: {
      title: "❤️ Control de tensión arterial",
      body: "Recuerda medir tu presión arterial hoy",
    },
    motivational: {
      title: "🌟 Mensaje motivacional",
      body: getMotivationalMessage(),
    },
  };

  return messages[type] || messages.motivational;
};

// Utilidades para exportación
export const formatDataForExport = (data) => {
  return {
    ...data,
    exportDate: new Date().toISOString(),
    appVersion: "1.0.0",
    format: "MiTratamiento Health Report",
  };
};

// Utilidades para validación de formularios
export const validateMedicationForm = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = "El nombre del medicamento es requerido";
  }

  if (!formData.dosage?.trim()) {
    errors.dosage = "La dosis es requerida";
  }

  if (!formData.schedule?.trim()) {
    errors.schedule = "El horario es requerido";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateBloodPressureForm = (formData) => {
  const errors = {};

  if (!formData.systolic || isNaN(formData.systolic)) {
    errors.systolic = "La presión sistólica es requerida";
  } else if (formData.systolic < 50 || formData.systolic > 300) {
    errors.systolic = "La presión sistólica debe estar entre 50 y 300 mmHg";
  }

  if (!formData.diastolic || isNaN(formData.diastolic)) {
    errors.diastolic = "La presión diastólica es requerida";
  } else if (formData.diastolic < 30 || formData.diastolic > 200) {
    errors.diastolic = "La presión diastólica debe estar entre 30 y 200 mmHg";
  }

  if (
    formData.systolic &&
    formData.diastolic &&
    formData.systolic <= formData.diastolic
  ) {
    errors.systolic = "La presión sistólica debe ser mayor que la diastólica";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
