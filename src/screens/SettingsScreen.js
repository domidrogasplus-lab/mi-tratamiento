import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  Title,
  Paragraph,
  Card,
  Button,
  List,
  Divider,
  Chip,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import AdBanner from "../components/AdBanner";
import { colors, spacing, typography } from "../styles";
import {
  getUserData,
  getAppSettings,
  saveAppSettings,
} from "../services/StorageService";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    premium: false,
    language: "es",
    reminderTime: "08:00",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [user, appSettings] = await Promise.all([
        getUserData(),
        getAppSettings(),
      ]);
      setUserData(user);
      setSettings({ ...settings, ...appSettings });
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleSettingChange = async (setting, value) => {
    try {
      const newSettings = { ...settings, [setting]: value };
      setSettings(newSettings);
      await saveAppSettings(newSettings);
    } catch (error) {
      console.error("Error saving setting:", error);
      Alert.alert("Error", "No se pudo guardar la configuración");
    }
  };

  const handleExportData = async () => {
    setLoading(true);
    try {
      // Aquí se implementaría la exportación de datos
      Alert.alert(
        "Exportar Datos",
        "Se ha generado un reporte con tus datos de salud. ¿Dónde quieres guardarlo?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Guardar en Dispositivo",
            onPress: () => console.log("Guardar localmente"),
          },
          {
            text: "Enviar por Email",
            onPress: () => console.log("Enviar por email"),
          },
        ]
      );
    } catch (error) {
      console.error("Error exporting data:", error);
      Alert.alert("Error", "No se pudo exportar los datos");
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradePremium = () => {
    Alert.alert(
      "MiTratamiento Premium",
      "Desbloquea todas las funciones:\n\n• Sin publicidad\n• Exportación de reportes\n• Recordatorios avanzados\n• Soporte prioritario\n\n¿Quieres continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Ver Planes",
          onPress: () => console.log("Mostrar planes premium"),
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Eliminar Cuenta",
      "Esta acción no se puede deshacer. Se eliminarán todos tus datos de forma permanente.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Confirmar Eliminación",
              "¿Estás completamente seguro?",
              [
                { text: "Cancelar", style: "cancel" },
                {
                  text: "Sí, Eliminar",
                  style: "destructive",
                  onPress: () => console.log("Eliminar cuenta"),
                },
              ]
            );
          },
        },
      ]
    );
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Title style={styles.title}>Configuración</Title>
          <Paragraph style={styles.subtitle}>
            Personaliza tu experiencia con MiTratamiento
          </Paragraph>
        </View>

        {/* Información del usuario */}
        {userData && (
          <Card style={styles.userCard}>
            <Card.Content>
              <View style={styles.userHeader}>
                <Icon name="account-circle" size={48} color={colors.primary} />
                <View style={styles.userInfo}>
                  <Title style={styles.userName}>{userData.name}</Title>
                  <Paragraph style={styles.userDetails}>
                    {userData.eps} • {userData.age} años
                  </Paragraph>
                  {settings.premium && (
                    <Chip
                      style={[
                        styles.premiumChip,
                        { backgroundColor: colors.warning },
                      ]}
                      textStyle={styles.premiumChipText}
                    >
                      Premium
                    </Chip>
                  )}
                </View>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Configuraciones principales */}
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Configuraciones</Title>

            <List.Item
              title="Notificaciones"
              description="Recibir recordatorios de medicamentos"
              left={() => (
                <Icon name="notifications" size={24} color={colors.primary} />
              )}
              right={() => (
                <Switch
                  value={settings.notifications}
                  onValueChange={(value) =>
                    handleSettingChange("notifications", value)
                  }
                  trackColor={{ false: colors.lightGray, true: colors.primary }}
                  thumbColor={
                    settings.notifications ? colors.white : colors.gray
                  }
                />
              )}
            />

            <Divider />

            <List.Item
              title="Modo Oscuro"
              description="Cambiar tema de la aplicación"
              left={() => (
                <Icon name="dark-mode" size={24} color={colors.primary} />
              )}
              right={() => (
                <Switch
                  value={settings.darkMode}
                  onValueChange={(value) =>
                    handleSettingChange("darkMode", value)
                  }
                  trackColor={{ false: colors.lightGray, true: colors.primary }}
                  thumbColor={settings.darkMode ? colors.white : colors.gray}
                />
              )}
            />

            <Divider />

            <List.Item
              title="Idioma"
              description="Español"
              left={() => (
                <Icon name="language" size={24} color={colors.primary} />
              )}
              right={() => (
                <Icon name="chevron-right" size={24} color={colors.gray} />
              )}
              onPress={() => Alert.alert("Idioma", "Función en desarrollo")}
            />
          </Card.Content>
        </Card>

        {/* Funciones premium */}
        <Card style={styles.premiumCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>MiTratamiento Premium</Title>
            <Paragraph style={styles.premiumDescription}>
              Desbloquea funciones avanzadas y elimina la publicidad
            </Paragraph>

            <Button
              mode={settings.premium ? "outlined" : "contained"}
              onPress={handleUpgradePremium}
              style={styles.premiumButton}
              buttonColor={settings.premium ? colors.white : colors.warning}
              textColor={settings.premium ? colors.warning : colors.white}
              icon={settings.premium ? "check" : "star"}
            >
              {settings.premium ? "Activo" : "Actualizar a Premium"}
            </Button>
          </Card.Content>
        </Card>

        {/* Datos y privacidad */}
        <Card style={styles.dataCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Datos y Privacidad</Title>

            <List.Item
              title="Exportar Datos"
              description="Generar reporte de salud en PDF"
              left={() => (
                <Icon name="file-download" size={24} color={colors.primary} />
              )}
              right={() => (
                <Icon name="chevron-right" size={24} color={colors.gray} />
              )}
              onPress={handleExportData}
            />

            <Divider />

            <List.Item
              title="Eliminar Cuenta"
              description="Eliminar todos los datos permanentemente"
              left={() => (
                <Icon name="delete-forever" size={24} color={colors.danger} />
              )}
              right={() => (
                <Icon name="chevron-right" size={24} color={colors.gray} />
              )}
              onPress={handleDeleteAccount}
            />
          </Card.Content>
        </Card>

        {/* Información de la app */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Acerca de</Title>

            <List.Item
              title="Versión"
              description="1.0.0"
              left={() => <Icon name="info" size={24} color={colors.primary} />}
            />

            <Divider />

            <List.Item
              title="Política de Privacidad"
              description="Cómo protegemos tus datos"
              left={() => (
                <Icon name="privacy-tip" size={24} color={colors.primary} />
              )}
              right={() => (
                <Icon name="chevron-right" size={24} color={colors.gray} />
              )}
              onPress={() =>
                Alert.alert(
                  "Privacidad",
                  "Política de privacidad en desarrollo"
                )
              }
            />

            <Divider />

            <List.Item
              title="Términos de Uso"
              description="Condiciones de uso de la aplicación"
              left={() => (
                <Icon name="description" size={24} color={colors.primary} />
              )}
              right={() => (
                <Icon name="chevron-right" size={24} color={colors.gray} />
              )}
              onPress={() =>
                Alert.alert("Términos", "Términos de uso en desarrollo")
              }
            />
          </Card.Content>
        </Card>

        {/* Mensaje motivacional */}
        <Card style={styles.motivationCard}>
          <Card.Content>
            <View style={styles.motivationContent}>
              <Icon name="favorite" size={32} color={colors.tertiary} />
              <View style={styles.motivationText}>
                <Title style={styles.motivationTitle}>
                  {getGreeting()}, {userData?.name || "Usuario"}
                </Title>
                <Paragraph style={styles.motivationMessage}>
                  Tu salud es nuestra prioridad. Gracias por confiar en
                  MiTratamiento.
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
  userCard: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  userName: {
    ...typography.h4,
    color: colors.black,
    marginBottom: spacing.xs,
  },
  userDetails: {
    ...typography.body,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  premiumChip: {
    alignSelf: "flex-start",
  },
  premiumChipText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  settingsCard: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.black,
    marginBottom: spacing.md,
  },
  premiumCard: {
    margin: spacing.lg,
    backgroundColor: colors.warning,
    borderRadius: 12,
    elevation: 2,
  },
  premiumDescription: {
    ...typography.body,
    color: colors.white,
    marginBottom: spacing.md,
  },
  premiumButton: {
    alignSelf: "flex-start",
  },
  dataCard: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  infoCard: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  motivationCard: {
    margin: spacing.lg,
    backgroundColor: colors.tertiary,
    borderRadius: 12,
    elevation: 2,
  },
  motivationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  motivationText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  motivationTitle: {
    ...typography.h4,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  motivationMessage: {
    ...typography.body,
    color: colors.white,
    fontStyle: "italic",
  },
});
