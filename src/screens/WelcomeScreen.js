import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import { colors, spacing, typography } from "../styles";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo y título */}
        <View style={styles.logoContainer}>
          <Text style={styles.emoji}>💊</Text>
          <Text style={styles.appName}>MiTratamiento</Text>
          <Text style={styles.subtitle}>Tu asistente personal de salud</Text>
        </View>

        {/* Descripción */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Nunca más olvides tomar tus medicamentos. Recibe recordatorios,
            controla tu tensión arterial y conoce tus derechos en salud.
          </Text>
        </View>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Comenzar"
            onPress={() => navigation.navigate("Register")}
            style={styles.primaryButton}
            icon="arrow-forward"
          />

          <CustomButton
            title="Ya tengo cuenta"
            onPress={() => navigation.navigate("Login")}
            mode="outlined"
            style={styles.secondaryButton}
            icon="login"
          />
        </View>

        {/* Información adicional */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            💡 Gratis • 🔒 Seguro • 👥 Para toda la familia
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  emoji: {
    fontSize: 80,
    marginBottom: spacing.md,
  },
  appName: {
    ...typography.h1,
    color: colors.black,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.h3,
    color: colors.darkGray,
    textAlign: "center",
  },
  descriptionContainer: {
    marginBottom: spacing.xxl,
  },
  description: {
    ...typography.bodyLarge,
    color: colors.darkGray,
    textAlign: "center",
    lineHeight: 28,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: spacing.xl,
  },
  primaryButton: {
    marginBottom: spacing.md,
  },
  secondaryButton: {
    marginBottom: spacing.sm,
  },
  infoContainer: {
    marginTop: spacing.lg,
  },
  infoText: {
    ...typography.caption,
    color: colors.gray,
    textAlign: "center",
  },
});
