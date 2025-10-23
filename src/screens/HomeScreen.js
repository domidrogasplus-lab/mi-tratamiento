import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Title, Paragraph, Card, Button, Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomCard from "../components/CustomCard";
import AdBanner from "../components/AdBanner";
import { colors, spacing, typography } from "../styles";
import {
  getUserData,
  getMedications,
  getBloodPressureData,
} from "../services/StorageService";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [medications, setMedications] = useState([]);
  const [bloodPressure, setBloodPressure] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [user, meds, bp] = await Promise.all([
        getUserData(),
        getMedications(),
        getBloodPressureData(),
      ]);
      setUserData(user);
      setMedications(meds);
      setBloodPressure(bp);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Tu salud está en tus manos 💪",
      "Cada día es una oportunidad de cuidarte 🌟",
      "Pequeños pasos, grandes resultados 🎯",
      "Tu bienestar es tu prioridad ❤️",
      "Hoy es un buen día para estar saludable 🌈",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getPendingMedications = () => {
    return medications.filter((med) => med.status === "pending").length;
  };

  const getOverdueMedications = () => {
    return medications.filter((med) => med.status === "overdue").length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header con saludo */}
        <View style={styles.header}>
          <Title style={styles.greeting}>
            {getGreeting()}
            {userData ? `, ${userData.name}` : ""}
          </Title>
          <Paragraph style={styles.motivationalMessage}>
            {getMotivationalMessage()}
          </Paragraph>
        </View>

        {/* Resumen rápido */}
        <View style={styles.summaryContainer}>
          <CustomCard style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Icon name="medication" size={24} color={colors.primary} />
                <Paragraph style={styles.summaryNumber}>
                  {medications.length}
                </Paragraph>
                <Paragraph style={styles.summaryLabel}>Medicamentos</Paragraph>
              </View>

              <View style={styles.summaryItem}>
                <Icon name="schedule" size={24} color={colors.warning} />
                <Paragraph style={styles.summaryNumber}>
                  {getPendingMedications()}
                </Paragraph>
                <Paragraph style={styles.summaryLabel}>Pendientes</Paragraph>
              </View>

              <View style={styles.summaryItem}>
                <Icon name="favorite" size={24} color={colors.tertiary} />
                <Paragraph style={styles.summaryNumber}>
                  {bloodPressure ? "1" : "0"}
                </Paragraph>
                <Paragraph style={styles.summaryLabel}>Registros</Paragraph>
              </View>
            </View>
          </CustomCard>
        </View>

        {/* Acciones rápidas */}
        <View style={styles.actionsContainer}>
          <Title style={styles.sectionTitle}>Acciones Rápidas</Title>

          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("Medicamentos")}
              style={styles.actionButton}
              buttonColor={colors.primary}
              icon="medication"
            >
              Ver Medicamentos
            </Button>

            <Button
              mode="contained"
              onPress={() => navigation.navigate("Tensión")}
              style={styles.actionButton}
              buttonColor={colors.secondary}
              icon="favorite"
            >
              Registrar Tensión
            </Button>
          </View>

          <View style={styles.actionButtons}>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate("Rights")}
              style={styles.actionButton}
              icon="gavel"
            >
              Derechos en Salud
            </Button>

            <Button
              mode="outlined"
              onPress={() => navigation.navigate("Education")}
              style={styles.actionButton}
              icon="school"
            >
              Educación
            </Button>
          </View>
        </View>

        {/* Alertas importantes */}
        {getOverdueMedications() > 0 && (
          <View style={styles.alertContainer}>
            <Card
              style={[styles.alertCard, { backgroundColor: colors.danger }]}
            >
              <Card.Content>
                <View style={styles.alertContent}>
                  <Icon name="warning" size={24} color={colors.white} />
                  <View style={styles.alertText}>
                    <Paragraph style={styles.alertTitle}>
                      Medicamentos Atrasados
                    </Paragraph>
                    <Paragraph style={styles.alertMessage}>
                      Tienes {getOverdueMedications()} medicamento(s) que debes
                      tomar
                    </Paragraph>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>
        )}

        {/* Banner de publicidad */}
        <AdBanner />

        {/* Información adicional */}
        <View style={styles.infoContainer}>
          <Paragraph style={styles.infoText}>
            💡 Tip: Activa las notificaciones para no olvidar tus medicamentos
          </Paragraph>
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
  header: {
    padding: spacing.lg,
    backgroundColor: colors.primary,
  },
  greeting: {
    ...typography.h2,
    color: colors.black,
    marginBottom: spacing.xs,
  },
  motivationalMessage: {
    ...typography.body,
    color: colors.darkGray,
    fontStyle: "italic",
  },
  summaryContainer: {
    marginTop: -spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  summaryCard: {
    elevation: 4,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryNumber: {
    ...typography.h2,
    color: colors.black,
    marginVertical: spacing.xs,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.gray,
  },
  actionsContainer: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.black,
    marginBottom: spacing.md,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  alertContainer: {
    padding: spacing.lg,
  },
  alertCard: {
    borderRadius: 12,
  },
  alertContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  alertText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  alertTitle: {
    ...typography.h4,
    color: colors.white,
    fontWeight: "bold",
  },
  alertMessage: {
    ...typography.body,
    color: colors.white,
  },
  infoContainer: {
    padding: spacing.lg,
    alignItems: "center",
  },
  infoText: {
    ...typography.caption,
    color: colors.gray,
    textAlign: "center",
  },
});
