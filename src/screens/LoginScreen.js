import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Title, Paragraph } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import { colors, spacing, typography } from "../styles";
import { getUserData } from "../services/StorageService";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone.trim()) {
      Alert.alert("Error", "Por favor ingresa tu número de teléfono");
      return;
    }

    setLoading(true);
    try {
      const userData = await getUserData();
      if (userData && userData.phone === phone) {
        Alert.alert(
          "¡Bienvenido de nuevo!",
          `Hola ${userData.name}, es bueno verte de nuevo.`,
          [
            {
              text: "Continuar",
              onPress: () => navigation.navigate("Main"),
            },
          ]
        );
      } else {
        Alert.alert(
          "Usuario no encontrado",
          "No encontramos una cuenta con ese número. ¿Te gustaría registrarte?",
          [
            {
              text: "Cancelar",
              style: "cancel",
            },
            {
              text: "Registrarme",
              onPress: () => navigation.navigate("Register"),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo verificar la información. Inténtalo de nuevo."
      );
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Iniciar Sesión</Title>
        <Paragraph style={styles.subtitle}>
          Ingresa tu número de teléfono para acceder a tu cuenta
        </Paragraph>

        <View style={styles.form}>
          <TextInput
            label="Número de teléfono"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            mode="outlined"
            keyboardType="phone-pad"
            placeholder="Ej: 3001234567"
            left={<TextInput.Icon icon="phone" />}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Iniciar Sesión"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
            icon="login"
          />

          <CustomButton
            title="Crear cuenta nueva"
            onPress={() => navigation.navigate("Register")}
            mode="outlined"
            style={styles.registerButton}
            icon="account-plus"
          />
        </View>

        <View style={styles.infoContainer}>
          <Paragraph style={styles.infoText}>
            💡 Si es tu primera vez, crea una cuenta nueva
          </Paragraph>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.black,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.gray,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  form: {
    marginBottom: spacing.xl,
  },
  input: {
    backgroundColor: colors.white,
  },
  buttonContainer: {
    marginTop: spacing.lg,
  },
  loginButton: {
    marginBottom: spacing.md,
  },
  registerButton: {
    marginBottom: spacing.sm,
  },
  infoContainer: {
    marginTop: spacing.xl,
    alignItems: "center",
  },
  infoText: {
    ...typography.caption,
    color: colors.gray,
    textAlign: "center",
  },
});
