import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Title, Paragraph } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import { colors, spacing, typography } from "../styles";
import { saveUserData } from "../services/StorageService";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    diagnosis: "",
    eps: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "Por favor ingresa tu nombre completo");
      return false;
    }
    if (!formData.age || isNaN(formData.age) || formData.age < 18) {
      Alert.alert(
        "Error",
        "Por favor ingresa una edad válida (mínimo 18 años)"
      );
      return false;
    }
    if (!formData.eps.trim()) {
      Alert.alert("Error", "Por favor selecciona tu EPS");
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert("Error", "Por favor ingresa tu número de teléfono");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await saveUserData(formData);
      Alert.alert(
        "¡Registro exitoso!",
        "Bienvenido a MiTratamiento. Ahora puedes comenzar a usar la aplicación.",
        [
          {
            text: "Continuar",
            onPress: () => navigation.navigate("Main"),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo guardar la información. Inténtalo de nuevo."
      );
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const epsOptions = [
    "Coosalud",
    "Sura",
    "Nueva EPS",
    "Sanitas",
    "Compensar",
    "Cafesalud",
    "Salud Total",
    "Famisanar",
    "Cruz Blanca",
    "Otra",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Title style={styles.title}>Registro de Paciente</Title>
          <Paragraph style={styles.subtitle}>
            Completa la información para personalizar tu experiencia
          </Paragraph>

          <View style={styles.form}>
            <TextInput
              label="Nombre completo *"
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
              style={styles.input}
              mode="outlined"
              autoCapitalize="words"
            />

            <TextInput
              label="Edad *"
              value={formData.age}
              onChangeText={(value) => handleInputChange("age", value)}
              style={styles.input}
              mode="outlined"
              keyboardType="numeric"
              maxLength={3}
            />

            <TextInput
              label="Diagnóstico principal"
              value={formData.diagnosis}
              onChangeText={(value) => handleInputChange("diagnosis", value)}
              style={styles.input}
              mode="outlined"
              multiline
              numberOfLines={2}
            />

            <TextInput
              label="EPS *"
              value={formData.eps}
              onChangeText={(value) => handleInputChange("eps", value)}
              style={styles.input}
              mode="outlined"
              placeholder="Ej: Coosalud, Sura, Nueva EPS..."
            />

            <TextInput
              label="Teléfono *"
              value={formData.phone}
              onChangeText={(value) => handleInputChange("phone", value)}
              style={styles.input}
              mode="outlined"
              keyboardType="phone-pad"
              placeholder="Ej: 3001234567"
            />
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Registrarme"
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
              icon="account-plus"
            />

            <CustomButton
              title="Ya tengo cuenta"
              onPress={() => navigation.navigate("Login")}
              mode="outlined"
              style={styles.loginButton}
              icon="login"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
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
    marginBottom: spacing.md,
    backgroundColor: colors.white,
  },
  buttonContainer: {
    marginTop: spacing.lg,
  },
  registerButton: {
    marginBottom: spacing.md,
  },
  loginButton: {
    marginBottom: spacing.sm,
  },
});
