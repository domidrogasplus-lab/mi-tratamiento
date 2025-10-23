// Firebase configuration and services
// Note: This is a placeholder for Firebase integration
// In a real implementation, you would configure Firebase here

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Authentication services
export const createUser = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save additional user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      ...userData,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update last login time
    await setDoc(
      doc(db, "users", user.uid),
      {
        lastLogin: new Date().toISOString(),
      },
      { merge: true }
    );

    return user;
  } catch (error) {
    console.error("Error signing in user:", error);
    throw error;
  }
};

// Firestore services
export const saveUserData = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData, { merge: true });
    return true;
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

export const getUserData = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

export const saveMedication = async (userId, medication) => {
  try {
    const docRef = await addDoc(
      collection(db, "users", userId, "medications"),
      {
        ...medication,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
    return docRef.id;
  } catch (error) {
    console.error("Error saving medication:", error);
    throw error;
  }
};

export const getMedications = async (userId) => {
  try {
    const q = query(collection(db, "users", userId, "medications"));
    const querySnapshot = await getDocs(q);
    const medications = [];

    querySnapshot.forEach((doc) => {
      medications.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return medications;
  } catch (error) {
    console.error("Error getting medications:", error);
    throw error;
  }
};

export const saveBloodPressureMeasurement = async (userId, measurement) => {
  try {
    const docRef = await addDoc(
      collection(db, "users", userId, "bloodPressure"),
      {
        ...measurement,
        createdAt: new Date().toISOString(),
      }
    );
    return docRef.id;
  } catch (error) {
    console.error("Error saving blood pressure measurement:", error);
    throw error;
  }
};

export const getBloodPressureMeasurements = async (userId) => {
  try {
    const q = query(collection(db, "users", userId, "bloodPressure"));
    const querySnapshot = await getDocs(q);
    const measurements = [];

    querySnapshot.forEach((doc) => {
      measurements.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return measurements.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } catch (error) {
    console.error("Error getting blood pressure measurements:", error);
    throw error;
  }
};

export const saveDeliveryDate = async (userId, delivery) => {
  try {
    const docRef = await addDoc(collection(db, "users", userId, "deliveries"), {
      ...delivery,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving delivery date:", error);
    throw error;
  }
};

export const getDeliveryDates = async (userId) => {
  try {
    const q = query(collection(db, "users", userId, "deliveries"));
    const querySnapshot = await getDocs(q);
    const deliveries = [];

    querySnapshot.forEach((doc) => {
      deliveries.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return deliveries.sort((a, b) => new Date(a.date) - new Date(b.date));
  } catch (error) {
    console.error("Error getting delivery dates:", error);
    throw error;
  }
};

export const saveCaregiver = async (userId, caregiver) => {
  try {
    const docRef = await addDoc(collection(db, "users", userId, "caregivers"), {
      ...caregiver,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving caregiver:", error);
    throw error;
  }
};

export const getCaregivers = async (userId) => {
  try {
    const q = query(collection(db, "users", userId, "caregivers"));
    const querySnapshot = await getDocs(q);
    const caregivers = [];

    querySnapshot.forEach((doc) => {
      caregivers.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return caregivers;
  } catch (error) {
    console.error("Error getting caregivers:", error);
    throw error;
  }
};

// Sync services for offline/online data synchronization
export const syncDataToFirebase = async (userId, localData) => {
  try {
    // Sync medications
    if (localData.medications) {
      for (const medication of localData.medications) {
        await saveMedication(userId, medication);
      }
    }

    // Sync blood pressure measurements
    if (localData.bloodPressure) {
      for (const measurement of localData.bloodPressure) {
        await saveBloodPressureMeasurement(userId, measurement);
      }
    }

    // Sync delivery dates
    if (localData.deliveryDates) {
      for (const delivery of localData.deliveryDates) {
        await saveDeliveryDate(userId, delivery);
      }
    }

    // Sync caregivers
    if (localData.caregivers) {
      for (const caregiver of localData.caregivers) {
        await saveCaregiver(userId, caregiver);
      }
    }

    console.log("Data synced to Firebase successfully");
    return true;
  } catch (error) {
    console.error("Error syncing data to Firebase:", error);
    throw error;
  }
};

export const syncDataFromFirebase = async (userId) => {
  try {
    const [medications, bloodPressure, deliveryDates, caregivers] =
      await Promise.all([
        getMedications(userId),
        getBloodPressureMeasurements(userId),
        getDeliveryDates(userId),
        getCaregivers(userId),
      ]);

    return {
      medications,
      bloodPressure,
      deliveryDates,
      caregivers,
    };
  } catch (error) {
    console.error("Error syncing data from Firebase:", error);
    throw error;
  }
};

export { auth, db };
