import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { theme } from "./src/styles/theme";
import AppNavigator from "./src/navigation/AppNavigator";
import { NotificationProvider } from "./src/services/NotificationService";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NotificationProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <AppNavigator />
          </NavigationContainer>
        </NotificationProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
