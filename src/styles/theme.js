import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#A3D8FF", // Azul claro
    secondary: "#4CAF50", // Verde
    tertiary: "#E53935", // Rojo
    surface: "#FFFFFF",
    background: "#F8F9FA",
    error: "#E53935",
    onPrimary: "#000000",
    onSecondary: "#FFFFFF",
    onSurface: "#000000",
    onBackground: "#000000",
  },
  fonts: {
    ...MD3LightTheme.fonts,
    bodyLarge: {
      ...MD3LightTheme.fonts.bodyLarge,
      fontSize: 18,
      fontWeight: "400",
    },
    bodyMedium: {
      ...MD3LightTheme.fonts.bodyMedium,
      fontSize: 16,
      fontWeight: "400",
    },
    titleLarge: {
      ...MD3LightTheme.fonts.titleLarge,
      fontSize: 24,
      fontWeight: "600",
    },
    titleMedium: {
      ...MD3LightTheme.fonts.titleMedium,
      fontSize: 20,
      fontWeight: "500",
    },
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#A3D8FF",
    secondary: "#4CAF50",
    tertiary: "#E53935",
    surface: "#1E1E1E",
    background: "#121212",
    error: "#E53935",
    onPrimary: "#000000",
    onSecondary: "#FFFFFF",
    onSurface: "#FFFFFF",
    onBackground: "#FFFFFF",
  },
  fonts: {
    ...lightTheme.fonts,
  },
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};
