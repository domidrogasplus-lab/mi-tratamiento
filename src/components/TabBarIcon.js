import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function TabBarIcon({ route, focused, color, size }) {
  let iconName;

  switch (route.name) {
    case "Inicio":
      iconName = "home";
      break;
    case "Medicamentos":
      iconName = "medication";
      break;
    case "Calendario":
      iconName = "calendar-today";
      break;
    case "Tensión":
      iconName = "favorite";
      break;
    case "Configuración":
      iconName = "settings";
      break;
    default:
      iconName = "help";
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Icon name={iconName} size={size} color={color} />
    </View>
  );
}
