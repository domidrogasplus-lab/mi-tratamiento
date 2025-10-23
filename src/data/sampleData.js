// Datos de ejemplo para probar la aplicación MiTratamiento

export const sampleUserData = {
  name: "María García",
  age: "65",
  diagnosis: "Hipertensión arterial, Diabetes tipo 2",
  eps: "Coosalud",
  phone: "3001234567",
  email: "maria.garcia@email.com",
  address: "Calle 123 #45-67, Bogotá",
  emergencyContact: {
    name: "Carlos García",
    phone: "3007654321",
    relationship: "Hijo",
  },
};

export const sampleMedications = [
  {
    id: "1",
    name: "Losartán",
    dosage: "50mg",
    schedule: "08:00",
    frequency: "Una vez al día",
    instructions: "Tomar con el desayuno",
    nextDelivery: "2024-02-15",
    status: "pending",
    createdAt: "2024-01-15T08:00:00Z",
    lastTaken: null,
  },
  {
    id: "2",
    name: "Metformina",
    dosage: "500mg",
    schedule: "08:00,20:00",
    frequency: "Dos veces al día",
    instructions: "Tomar con las comidas principales",
    nextDelivery: "2024-02-20",
    status: "taken",
    createdAt: "2024-01-15T08:00:00Z",
    lastTaken: "2024-01-20T08:30:00Z",
  },
  {
    id: "3",
    name: "Amlodipino",
    dosage: "5mg",
    schedule: "20:00",
    frequency: "Una vez al día",
    instructions: "Tomar en la noche",
    nextDelivery: "2024-02-10",
    status: "overdue",
    createdAt: "2024-01-15T08:00:00Z",
    lastTaken: "2024-01-18T20:15:00Z",
  },
  {
    id: "4",
    name: "Atorvastatina",
    dosage: "20mg",
    schedule: "22:00",
    frequency: "Una vez al día",
    instructions: "Tomar en la noche, con o sin comida",
    nextDelivery: "2024-02-25",
    status: "pending",
    createdAt: "2024-01-15T08:00:00Z",
    lastTaken: null,
  },
];

export const sampleBloodPressureData = [
  {
    id: "1",
    systolic: 135,
    diastolic: 85,
    pulse: 72,
    date: "20/01/2024",
    time: "08:30",
    category: "Prehipertensión",
    color: "#FF9800",
    notes: "Después del desayuno",
    createdAt: "2024-01-20T08:30:00Z",
  },
  {
    id: "2",
    systolic: 128,
    diastolic: 82,
    pulse: 68,
    date: "19/01/2024",
    time: "20:15",
    category: "Prehipertensión",
    color: "#FF9800",
    notes: "Antes de dormir",
    createdAt: "2024-01-19T20:15:00Z",
  },
  {
    id: "3",
    systolic: 142,
    diastolic: 88,
    pulse: 75,
    date: "18/01/2024",
    time: "08:00",
    category: "Hipertensión",
    color: "#E53935",
    notes: "En ayunas",
    createdAt: "2024-01-18T08:00:00Z",
  },
  {
    id: "4",
    systolic: 120,
    diastolic: 78,
    pulse: 70,
    date: "17/01/2024",
    time: "20:00",
    category: "Normal",
    color: "#4CAF50",
    notes: "Después de la cena",
    createdAt: "2024-01-17T20:00:00Z",
  },
  {
    id: "5",
    systolic: 138,
    diastolic: 86,
    pulse: 73,
    date: "16/01/2024",
    time: "08:15",
    category: "Prehipertensión",
    color: "#FF9800",
    notes: "Después del desayuno",
    createdAt: "2024-01-16T08:15:00Z",
  },
];

export const sampleDeliveryDates = [
  {
    id: "1",
    medication: "Losartán",
    date: "2024-02-15",
    time: "09:00",
    location: "Dispensario Principal - Coosalud",
    address: "Carrera 15 #93-47, Bogotá",
    status: "scheduled",
    notes: "Llevar cédula y fórmula médica",
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "2",
    medication: "Metformina",
    date: "2024-02-20",
    time: "10:30",
    location: "Dispensario Principal - Coosalud",
    address: "Carrera 15 #93-47, Bogotá",
    status: "scheduled",
    notes: "Llevar cédula y fórmula médica",
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "3",
    medication: "Amlodipino",
    date: "2024-02-10",
    time: "14:00",
    location: "Dispensario Principal - Coosalud",
    address: "Carrera 15 #93-47, Bogotá",
    status: "scheduled",
    notes: "Llevar cédula y fórmula médica",
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "4",
    medication: "Atorvastatina",
    date: "2024-02-25",
    time: "11:00",
    location: "Dispensario Principal - Coosalud",
    address: "Carrera 15 #93-47, Bogotá",
    status: "scheduled",
    notes: "Llevar cédula y fórmula médica",
    createdAt: "2024-01-15T08:00:00Z",
  },
];

export const sampleCaregivers = [
  {
    id: "1",
    name: "Carlos García",
    phone: "3007654321",
    relationship: "Hijo",
    email: "carlos.garcia@email.com",
    isActive: true,
    dateAdded: "2024-01-15T08:00:00Z",
    notifications: {
      medicationReminders: true,
      deliveryReminders: true,
      bloodPressureAlerts: true,
    },
  },
  {
    id: "2",
    name: "Ana García",
    phone: "3009876543",
    relationship: "Hija",
    email: "ana.garcia@email.com",
    isActive: true,
    dateAdded: "2024-01-15T08:00:00Z",
    notifications: {
      medicationReminders: true,
      deliveryReminders: false,
      bloodPressureAlerts: true,
    },
  },
];

export const sampleAppSettings = {
  notifications: true,
  darkMode: false,
  premium: false,
  language: "es",
  reminderTime: "08:00",
  bloodPressureReminders: true,
  deliveryReminders: true,
  motivationalMessages: true,
  soundEnabled: true,
  vibrationEnabled: true,
};

export const sampleEducationContent = [
  {
    id: "1",
    title: "Cómo Medir la Tensión Arterial Correctamente",
    type: "video",
    duration: "5 min",
    description:
      "Aprende la técnica correcta para medir tu presión arterial en casa",
    url: "https://youtube.com/watch?v=example1",
    category: "tension",
    difficulty: "básico",
    tags: ["tensión arterial", "medición", "casa"],
  },
  {
    id: "2",
    title: "Alimentación Saludable para el Corazón",
    type: "audio",
    duration: "8 min",
    description: "Consejos nutricionales para cuidar tu salud cardiovascular",
    url: "https://example.com/audio1",
    category: "alimentacion",
    difficulty: "intermedio",
    tags: ["alimentación", "corazón", "nutrición"],
  },
  {
    id: "3",
    title: "Ejercicios Seguros para Hipertensos",
    type: "video",
    duration: "10 min",
    description: "Rutina de ejercicios adaptada para personas con hipertensión",
    url: "https://youtube.com/watch?v=example2",
    category: "ejercicio",
    difficulty: "básico",
    tags: ["ejercicio", "hipertensión", "actividad física"],
  },
];

export const sampleRightsData = [
  {
    id: "medicamentos",
    title: "Derecho a Medicamentos Completos y Oportunos",
    icon: "medication",
    color: "#A3D8FF",
    content:
      "Tienes derecho a recibir todos los medicamentos que te recete tu médico, en las cantidades y dosis indicadas, sin demoras injustificadas.",
    actions: [
      { text: "Modelo de Derecho de Petición", action: "download_petition" },
      { text: "Cómo Reclamar", action: "how_to_claim" },
    ],
  },
  {
    id: "domicilio",
    title: "Derecho a Entrega a Domicilio",
    icon: "home",
    color: "#4CAF50",
    content:
      "Si tienes dificultades para desplazarte al dispensario, tienes derecho a solicitar la entrega de medicamentos a domicilio.",
    actions: [
      { text: "Solicitar Entrega a Domicilio", action: "request_delivery" },
      { text: "Requisitos", action: "requirements" },
    ],
  },
];

// Función para inicializar datos de ejemplo
export const initializeSampleData = async () => {
  try {
    const {
      saveUserData,
      saveMedication,
      saveBloodPressureData,
      saveDeliveryDate,
      saveCaregiver,
      saveAppSettings,
    } = await import("../services/StorageService");

    // Guardar datos del usuario
    await saveUserData(sampleUserData);

    // Guardar medicamentos
    for (const medication of sampleMedications) {
      await saveMedication(medication);
    }

    // Guardar datos de presión arterial
    await saveBloodPressureData(sampleBloodPressureData);

    // Guardar fechas de entrega
    for (const delivery of sampleDeliveryDates) {
      await saveDeliveryDate(delivery);
    }

    // Guardar cuidadores
    for (const caregiver of sampleCaregivers) {
      await saveCaregiver(caregiver);
    }

    // Guardar configuraciones
    await saveAppSettings(sampleAppSettings);

    console.log("Sample data initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing sample data:", error);
    return false;
  }
};

// Función para limpiar datos de ejemplo
export const clearSampleData = async () => {
  try {
    const { clearAllData } = await import("../services/StorageService");
    await clearAllData();
    console.log("Sample data cleared successfully");
    return true;
  } catch (error) {
    console.error("Error clearing sample data:", error);
    return false;
  }
};
