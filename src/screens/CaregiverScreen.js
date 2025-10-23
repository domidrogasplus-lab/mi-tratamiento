import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Title,
  Paragraph,
  Card,
  Button,
  TextInput,
  Chip,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import AdBanner from "../components/AdBanner";
import { colors, spacing, typography } from "../styles";
import {
  getCaregivers,
  saveCaregiver,
  deleteCaregiver,
} from "../services/StorageService";

export default function CaregiverScreen() {
  const [caregivers, setCaregivers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    relationship: "",
    email: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCaregivers();
  }, []);

  const loadCaregivers = async () => {
    try {
      const data = await getCaregivers();
      setCaregivers(data || []);
    } catch (error) {
      console.error("Error loading caregivers:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "Por favor ingresa el nombre del cuidador");
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert("Error", "Por favor ingresa el número de teléfono");
      return false;
    }
    if (!formData.relationship.trim()) {
      Alert.alert("Error", "Por favor selecciona la relación");
      return false;
    }
    return true;
  };

  const handleSaveCaregiver = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const newCaregiver = {
        id: Date.now().toString(),
        ...formData,
        dateAdded: new Date().toISOString(),
        isActive: true,
      };

      const updatedCaregivers = [...caregivers, newCaregiver];
      await saveCaregiver(newCaregiver);
      setCaregivers(updatedCaregivers);
      setFormData({ name: "", phone: "", relationship: "", email: "" });
      setShowForm(false);

      Alert.alert(
        "Cuidador Agregado",
        `${formData.name} ha sido agregado como cuidador y recibirá notificaciones.`,
        [{ text: "Entendido" }]
      );
    } catch (error) {
      console.error("Error saving caregiver:", error);
      Alert.alert("Error", "No se pudo guardar el cuidador");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCaregiver = (caregiverId) => {
    Alert.alert(
      "Eliminar Cuidador",
      "¿Estás seguro de que quieres eliminar este cuidador?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCaregiver(caregiverId);
              setCaregivers(
                caregivers.filter((caregiver) => caregiver.id !== caregiverId)
              );
              Alert.alert("Eliminado", "Cuidador eliminado correctamente");
            } catch (error) {
              console.error("Error deleting caregiver:", error);
              Alert.alert("Error", "No se pudo eliminar el cuidador");
            }
          },
        },
      ]
    );
  };

  const relationshipOptions = [
    "Hijo(a)",
    "Cónyuge",
    "Padre/Madre",
    "Hermano(a)",
    "Nieto(a)",
    "Sobrino(a)",
    "Amigo(a)",
    "Vecino(a)",
    "Otro",
  ];

  const getRelationshipColor = (relationship) => {
    const colors_map = {
      "Hijo(a)": colors.primary,
      Cónyuge: colors.secondary,
      "Padre/Madre": colors.tertiary,
      "Hermano(a)": colors.info,
      "Nieto(a)": colors.warning,
      "Sobrino(a)": colors.success,
      "Amigo(a)": colors.gray,
      "Vecino(a)": colors.darkGray,
      Otro: colors.lightGray,
    };
    return colors_map[relationship] || colors.gray;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Title style={styles.title}>Modo Cuidador</Title>
          <Paragraph style={styles.subtitle}>
            Agrega familiares o contactos que puedan recibir notificaciones
            sobre tu salud
          </Paragraph>
        </View>

        {/* Información sobre el modo cuidador */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <View style={styles.infoHeader}>
              <Icon name="info" size={24} color={colors.info} />
              <Title style={styles.infoTitle}>¿Qué es el Modo Cuidador?</Title>
            </View>
            <Paragraph style={styles.infoText}>
              Permite que familiares o personas de confianza reciban
              notificaciones cuando no tomes tus medicamentos o cuando tengas
              citas médicas importantes. Esto es especialmente útil para adultos
              mayores o personas con condiciones especiales.
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Lista de cuidadores */}
        {caregivers.length > 0 && (
          <View style={styles.caregiversContainer}>
            <Title style={styles.sectionTitle}>Tus Cuidadores</Title>
            {caregivers.map((caregiver) => (
              <Card key={caregiver.id} style={styles.caregiverCard}>
                <Card.Content>
                  <View style={styles.caregiverHeader}>
                    <View style={styles.caregiverInfo}>
                      <Title style={styles.caregiverName}>
                        {caregiver.name}
                      </Title>
                      <Chip
                        style={[
                          styles.relationshipChip,
                          {
                            backgroundColor: getRelationshipColor(
                              caregiver.relationship
                            ),
                          },
                        ]}
                        textStyle={styles.relationshipChipText}
                      >
                        {caregiver.relationship}
                      </Chip>
                    </View>
                    <Button
                      mode="text"
                      onPress={() => handleDeleteCaregiver(caregiver.id)}
                      icon="delete"
                      textColor={colors.danger}
                    >
                      Eliminar
                    </Button>
                  </View>

                  <View style={styles.caregiverDetails}>
                    <View style={styles.detailItem}>
                      <Icon name="phone" size={16} color={colors.gray} />
                      <Paragraph style={styles.detailText}>
                        {caregiver.phone}
                      </Paragraph>
                    </View>
                    {caregiver.email && (
                      <View style={styles.detailItem}>
                        <Icon name="email" size={16} color={colors.gray} />
                        <Paragraph style={styles.detailText}>
                          {caregiver.email}
                        </Paragraph>
                      </View>
                    )}
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>
        )}

        {/* Formulario para agregar cuidador */}
        {showForm ? (
          <Card style={styles.formCard}>
            <Card.Content>
              <Title style={styles.formTitle}>Agregar Cuidador</Title>

              <TextInput
                label="Nombre completo *"
                value={formData.name}
                onChangeText={(value) => handleInputChange("name", value)}
                style={styles.input}
                mode="outlined"
                autoCapitalize="words"
              />

              <TextInput
                label="Número de teléfono *"
                value={formData.phone}
                onChangeText={(value) => handleInputChange("phone", value)}
                style={styles.input}
                mode="outlined"
                keyboardType="phone-pad"
                placeholder="Ej: 3001234567"
              />

              <TextInput
                label="Relación *"
                value={formData.relationship}
                onChangeText={(value) =>
                  handleInputChange("relationship", value)
                }
                style={styles.input}
                mode="outlined"
                placeholder="Ej: Hijo, Cónyuge, Amigo..."
              />

              <TextInput
                label="Email (opcional)"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                style={styles.input}
                mode="outlined"
                keyboardType="email-address"
                placeholder="ejemplo@correo.com"
              />

              <View style={styles.formActions}>
                <Button
                  mode="outlined"
                  onPress={() => setShowForm(false)}
                  style={styles.cancelButton}
                >
                  Cancelar
                </Button>

                <Button
                  mode="contained"
                  onPress={handleSaveCaregiver}
                  loading={loading}
                  style={styles.saveButton}
                  buttonColor={colors.primary}
                >
                  Guardar
                </Button>
              </View>
            </Card.Content>
          </Card>
        ) : (
          <View style={styles.addButtonContainer}>
            <Button
              mode="contained"
              onPress={() => setShowForm(true)}
              style={styles.addButton}
              buttonColor={colors.primary}
              icon="plus"
            >
              Agregar Cuidador
            </Button>
          </View>
        )}

        {/* Configuración de notificaciones */}
        <Card style={styles.configCard}>
          <Card.Content>
            <Title style={styles.configTitle}>
              Configuración de Notificaciones
            </Title>
            <Paragraph style={styles.configText}>
              Los cuidadores recibirán notificaciones cuando:
            </Paragraph>

            <View style={styles.notificationList}>
              <View style={styles.notificationItem}>
                <Icon name="medication" size={20} color={colors.primary} />
                <Paragraph style={styles.notificationText}>
                  No tomes un medicamento en el horario programado
                </Paragraph>
              </View>

              <View style={styles.notificationItem}>
                <Icon name="schedule" size={20} color={colors.secondary} />
                <Paragraph style={styles.notificationText}>
                  Tengas una cita médica próxima
                </Paragraph>
              </View>

              <View style={styles.notificationItem}>
                <Icon name="favorite" size={20} color={colors.tertiary} />
                <Paragraph style={styles.notificationText}>
                  Registres valores altos de presión arterial
                </Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

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
  infoCard: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  infoTitle: {
    ...typography.h4,
    color: colors.black,
    marginLeft: spacing.sm,
  },
  infoText: {
    ...typography.body,
    color: colors.darkGray,
    lineHeight: 24,
  },
  caregiversContainer: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.black,
    marginBottom: spacing.md,
  },
  caregiverCard: {
    marginBottom: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  caregiverHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  caregiverInfo: {
    flex: 1,
  },
  caregiverName: {
    ...typography.h4,
    color: colors.black,
    marginBottom: spacing.xs,
  },
  relationshipChip: {
    alignSelf: "flex-start",
  },
  relationshipChipText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  caregiverDetails: {
    gap: spacing.xs,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    ...typography.body,
    color: colors.darkGray,
    marginLeft: spacing.sm,
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
  input: {
    marginBottom: spacing.md,
    backgroundColor: colors.white,
  },
  formActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
  },
  cancelButton: {
    flex: 1,
    marginRight: spacing.sm,
  },
  saveButton: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  addButtonContainer: {
    padding: spacing.lg,
    alignItems: "center",
  },
  addButton: {
    minWidth: 200,
  },
  configCard: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  configTitle: {
    ...typography.h4,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  configText: {
    ...typography.body,
    color: colors.darkGray,
    marginBottom: spacing.md,
  },
  notificationList: {
    gap: spacing.sm,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationText: {
    ...typography.body,
    color: colors.darkGray,
    marginLeft: spacing.sm,
    flex: 1,
  },
});
