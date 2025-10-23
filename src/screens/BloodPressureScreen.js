import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Title, Paragraph, Button, Card } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import BloodPressureCard from "../components/BloodPressureCard";
import AdBanner from "../components/AdBanner";
import { colors, spacing, typography } from "../styles";
import {
  getBloodPressureData,
  saveBloodPressureData,
} from "../services/StorageService";

const screenWidth = Dimensions.get("window").width;

export default function BloodPressureScreen() {
  const navigation = useNavigation();
  const [measurements, setMeasurements] = useState([]);
  const [formData, setFormData] = useState({
    systolic: "",
    diastolic: "",
    pulse: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMeasurements();
  }, []);

  const loadMeasurements = async () => {
    try {
      const data = await getBloodPressureData();
      setMeasurements(data || []);
    } catch (error) {
      console.error("Error loading blood pressure data:", error);
    }
  };

  const handleInputChange = (field, value) => {
    // Solo permitir números
    const numericValue = value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({ ...prev, [field]: numericValue }));
  };

  const validateForm = () => {
    if (!formData.systolic || !formData.diastolic) {
      Alert.alert(
        "Error",
        "Por favor ingresa tanto la presión sistólica como la diastólica"
      );
      return false;
    }

    const systolic = parseInt(formData.systolic);
    const diastolic = parseInt(formData.diastolic);

    if (systolic < 50 || systolic > 300) {
      Alert.alert(
        "Error",
        "La presión sistólica debe estar entre 50 y 300 mmHg"
      );
      return false;
    }

    if (diastolic < 30 || diastolic > 200) {
      Alert.alert(
        "Error",
        "La presión diastólica debe estar entre 30 y 200 mmHg"
      );
      return false;
    }

    if (systolic <= diastolic) {
      Alert.alert(
        "Error",
        "La presión sistólica debe ser mayor que la diastólica"
      );
      return false;
    }

    return true;
  };

  const getPressureCategory = (systolic, diastolic) => {
    if (systolic < 120 && diastolic < 80) {
      return {
        category: "Normal",
        color: colors.pressure.normal,
        message: "¡Excelente! Tu presión arterial está en el rango normal.",
      };
    } else if (systolic < 140 && diastolic < 90) {
      return {
        category: "Prehipertensión",
        color: colors.pressure.prehypertension,
        message: "Tu presión está elevada. Consulta con tu médico.",
      };
    } else {
      return {
        category: "Hipertensión",
        color: colors.pressure.hypertension,
        message: "Tu presión está alta. Consulta inmediatamente con tu médico.",
      };
    }
  };

  const handleSaveMeasurement = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const systolic = parseInt(formData.systolic);
      const diastolic = parseInt(formData.diastolic);
      const pulse = formData.pulse ? parseInt(formData.pulse) : null;

      const pressureInfo = getPressureCategory(systolic, diastolic);

      const newMeasurement = {
        id: Date.now().toString(),
        systolic,
        diastolic,
        pulse,
        date: new Date().toLocaleDateString("es-CO"),
        time: new Date().toLocaleTimeString("es-CO", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        category: pressureInfo.category,
        color: pressureInfo.color,
      };

      const updatedMeasurements = [newMeasurement, ...measurements];
      await saveBloodPressureData(updatedMeasurements);
      setMeasurements(updatedMeasurements);
      setFormData({ systolic: "", diastolic: "", pulse: "" });

      Alert.alert("Registro Guardado", pressureInfo.message, [
        { text: "Entendido" },
      ]);
    } catch (error) {
      console.error("Error saving measurement:", error);
      Alert.alert("Error", "No se pudo guardar la medición");
    } finally {
      setLoading(false);
    }
  };

  const getChartData = () => {
    if (measurements.length < 2) return null;

    const recentMeasurements = measurements.slice(0, 7).reverse();

    return {
      labels: recentMeasurements.map((m) => m.date.split("/")[0]),
      datasets: [
        {
          data: recentMeasurements.map((m) => m.systolic),
          color: (opacity = 1) => `rgba(163, 216, 255, ${opacity})`,
          strokeWidth: 2,
        },
        {
          data: recentMeasurements.map((m) => m.diastolic),
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  };

  const chartData = getChartData();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Title style={styles.title}>Control de Tensión Arterial</Title>
          <Paragraph style={styles.subtitle}>
            Registra tus mediciones para llevar un control de tu presión
            arterial
          </Paragraph>
        </View>

        {/* Formulario de registro */}
        <Card style={styles.formCard}>
          <Card.Content>
            <Title style={styles.formTitle}>Nueva Medición</Title>

            <View style={styles.inputRow}>
              <TextInput
                label="Sistólica (mmHg) *"
                value={formData.systolic}
                onChangeText={(value) => handleInputChange("systolic", value)}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                maxLength={3}
              />

              <TextInput
                label="Diastólica (mmHg) *"
                value={formData.diastolic}
                onChangeText={(value) => handleInputChange("diastolic", value)}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                maxLength={3}
              />
            </View>

            <TextInput
              label="Pulso (opcional)"
              value={formData.pulse}
              onChangeText={(value) => handleInputChange("pulse", value)}
              style={styles.input}
              mode="outlined"
              keyboardType="numeric"
              maxLength={3}
            />

            <Button
              mode="contained"
              onPress={handleSaveMeasurement}
              loading={loading}
              style={styles.saveButton}
              buttonColor={colors.primary}
            >
              Guardar Medición
            </Button>
          </Card.Content>
        </Card>

        {/* Gráfico */}
        {chartData && (
          <Card style={styles.chartCard}>
            <Card.Content>
              <Title style={styles.chartTitle}>
                Evolución de la Presión Arterial
              </Title>
              <LineChart
                data={chartData}
                width={screenWidth - 64}
                height={220}
                chartConfig={{
                  backgroundColor: colors.white,
                  backgroundGradientFrom: colors.white,
                  backgroundGradientTo: colors.white,
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: colors.primary,
                  },
                }}
                bezier
                style={styles.chart}
              />
              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: colors.primary },
                    ]}
                  />
                  <Paragraph style={styles.legendText}>Sistólica</Paragraph>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: colors.secondary },
                    ]}
                  />
                  <Paragraph style={styles.legendText}>Diastólica</Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Lista de mediciones recientes */}
        {measurements.length > 0 && (
          <View style={styles.measurementsContainer}>
            <Title style={styles.sectionTitle}>Mediciones Recientes</Title>
            {measurements.slice(0, 3).map((measurement) => (
              <BloodPressureCard
                key={measurement.id}
                measurement={measurement}
                onPress={() => {
                  /* Navegar a detalles */
                }}
              />
            ))}
          </View>
        )}

        <AdBanner />
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
  header: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.black,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.darkGray,
  },
  formCard: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  formTitle: {
    ...typography.h4,
    color: colors.black,
    marginBottom: spacing.md,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    marginHorizontal: spacing.xs,
    backgroundColor: colors.white,
  },
  saveButton: {
    marginTop: spacing.md,
  },
  chartCard: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  chartTitle: {
    ...typography.h4,
    color: colors.black,
    marginBottom: spacing.md,
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: 16,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.md,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: spacing.md,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.xs,
  },
  legendText: {
    ...typography.caption,
    color: colors.gray,
  },
  measurementsContainer: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.black,
    marginBottom: spacing.md,
  },
});
