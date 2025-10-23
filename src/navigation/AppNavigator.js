import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Pantallas
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import MedicationsScreen from "../screens/MedicationsScreen";
import CalendarScreen from "../screens/CalendarScreen";
import BloodPressureScreen from "../screens/BloodPressureScreen";
import RightsScreen from "../screens/RightsScreen";
import EducationScreen from "../screens/EducationScreen";
import CaregiverScreen from "../screens/CaregiverScreen";
import SettingsScreen from "../screens/SettingsScreen";

// Componentes
import TabBarIcon from "../components/TabBarIcon";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon
            route={route}
            focused={focused}
            color={color}
            size={size}
          />
        ),
        tabBarActiveTintColor: "#A3D8FF",
        tabBarInactiveTintColor: "#6C757D",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E0E0E0",
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name="Medicamentos"
        component={MedicationsScreen}
        options={{ title: "Medicamentos" }}
      />
      <Tab.Screen
        name="Calendario"
        component={CalendarScreen}
        options={{ title: "Calendario" }}
      />
      <Tab.Screen
        name="Tensión"
        component={BloodPressureScreen}
        options={{ title: "Tensión" }}
      />
      <Tab.Screen
        name="Configuración"
        component={SettingsScreen}
        options={{ title: "Configuración" }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      setIsFirstLaunch(hasLaunched === null);
    } catch (error) {
      console.error("Error checking first launch:", error);
      setIsFirstLaunch(true);
    }
  };

  if (isFirstLaunch === null) {
    return <View />; // Pantalla de carga
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isFirstLaunch ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      )}

      {/* Pantallas adicionales */}
      <Stack.Screen
        name="Rights"
        component={RightsScreen}
        options={{
          title: "Derechos en Salud",
          headerShown: true,
          headerStyle: { backgroundColor: "#A3D8FF" },
          headerTintColor: "#000000",
        }}
      />
      <Stack.Screen
        name="Education"
        component={EducationScreen}
        options={{
          title: "Educación y Consejos",
          headerShown: true,
          headerStyle: { backgroundColor: "#A3D8FF" },
          headerTintColor: "#000000",
        }}
      />
      <Stack.Screen
        name="Caregiver"
        component={CaregiverScreen}
        options={{
          title: "Modo Cuidador",
          headerShown: true,
          headerStyle: { backgroundColor: "#A3D8FF" },
          headerTintColor: "#000000",
        }}
      />
    </Stack.Navigator>
  );
}
