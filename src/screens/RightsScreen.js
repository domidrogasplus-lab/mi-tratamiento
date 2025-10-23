import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Linking, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Title,
  Paragraph,
  Card,
  Button,
  Chip,
  Divider,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import AdBanner from "../components/AdBanner";
import { colors, spacing, typography } from "../styles";

export default function RightsScreen() {
  const [expandedCard, setExpandedCard] = useState(null);

  const rightsData = [
    {
      id: "medicamentos",
      title: "Derecho a Medicamentos Completos y Oportunos",
      icon: "medication",
      color: colors.primary,
      content: `Tienes derecho a recibir todos los medicamentos que te recete tu médico, en las cantidades y dosis indicadas, sin demoras injustificadas.

• La EPS debe entregar los medicamentos dentro de los 5 días hábiles
• Si no hay medicamento disponible, debe darte una autorización para comprarlo
• Puedes reclamar medicamentos faltantes en cualquier momento
• Los medicamentos deben estar en buen estado y con fecha de vencimiento vigente`,
      actions: [
        { text: "Modelo de Derecho de Petición", action: "download_petition" },
        { text: "Cómo Reclamar", action: "how_to_claim" },
      ],
    },
    {
      id: "domicilio",
      title: "Derecho a Entrega a Domicilio",
      icon: "home",
      color: colors.secondary,
      content: `Si tienes dificultades para desplazarte al dispensario, tienes derecho a solicitar la entrega de medicamentos a domicilio.

• Aplica para adultos mayores de 60 años
• Personas con discapacidad o movilidad reducida
• Pacientes con enfermedades crónicas
• La entrega debe ser gratuita
• Debe coordinarse con anticipación`,
      actions: [
        { text: "Solicitar Entrega a Domicilio", action: "request_delivery" },
        { text: "Requisitos", action: "requirements" },
      ],
    },
    {
      id: "tutela",
      title: "Derecho de Tutela",
      icon: "gavel",
      color: colors.tertiary,
      content: `Cuando tus derechos en salud son vulnerados, puedes presentar una tutela para que un juez ordene a la EPS cumplir con sus obligaciones.

• Es gratuita y no necesitas abogado
• Debe presentarse ante cualquier juez
• El juez tiene 10 días para resolver
• La EPS debe cumplir la orden en 48 horas
• Puedes presentarla en cualquier momento`,
      actions: [
        { text: "Modelo de Tutela", action: "download_tutela" },
        { text: "Dónde Presentar", action: "where_to_present" },
      ],
    },
    {
      id: "formula",
      title: "Fórmula Médica Correcta",
      icon: "description",
      color: colors.info,
      content: `Tu fórmula médica debe cumplir con los requisitos establecidos en el Decreto 780 de 2016.

• Nombre completo del paciente
• Cédula de identidad
• Diagnóstico (Código CIE-10)
• Medicamento con nombre genérico
• Dosis, frecuencia y duración
• Firma y sello del médico
• Fecha de expedición`,
      actions: [
        { text: "Ver Ejemplo de Fórmula", action: "view_formula" },
        { text: "Qué Hacer si está Mal", action: "wrong_formula" },
      ],
    },
  ];

  const handleAction = (action) => {
    switch (action) {
      case "download_petition":
        Alert.alert("Descargar", "Modelo de derecho de petición descargado");
        break;
      case "download_tutela":
        Alert.alert("Descargar", "Modelo de tutela descargado");
        break;
      case "how_to_claim":
        Alert.alert(
          "Cómo Reclamar Medicamentos",
          "1. Ve al dispensario de tu EPS\n2. Presenta tu cédula y fórmula\n3. Si no hay medicamento, solicita autorización\n4. Guarda el comprobante de la solicitud\n5. Si no te atienden, presenta derecho de petición"
        );
        break;
      case "request_delivery":
        Alert.alert(
          "Solicitar Entrega a Domicilio",
          "1. Llama a tu EPS y solicita entrega a domicilio\n2. Proporciona tu dirección y teléfono\n3. Coordina fecha y hora\n4. Ten lista tu cédula y fórmula\n5. Recibe los medicamentos sin costo"
        );
        break;
      case "view_formula":
        Alert.alert(
          "Ejemplo de Fórmula Correcta",
          "Dr. Juan Pérez\nCédula: 12345678\n\nPaciente: María García\nCédula: 87654321\n\nDiagnóstico: HTA (I10)\n\nMedicamentos:\n• Losartán 50mg\n• Tomar 1 tableta cada 24 horas\n• Duración: 30 días\n\nFirma: Dr. Juan Pérez\nFecha: 15/01/2024"
        );
        break;
      case "wrong_formula":
        Alert.alert(
          "Fórmula Incorrecta",
          "Si tu fórmula no cumple los requisitos:\n\n1. Solicita al médico que la corrija\n2. Si se niega, pide hablar con el coordinador\n3. Puedes presentar queja ante la EPS\n4. Si persiste el problema, presenta tutela"
        );
        break;
      default:
        Alert.alert("Información", "Función en desarrollo");
    }
  };

  const openExternalLink = (url) => {
    Linking.openURL(url).catch((err) => {
      Alert.alert("Error", "No se pudo abrir el enlace");
    });
  };

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Title style={styles.title}>Derechos en Salud</Title>
          <Paragraph style={styles.subtitle}>
            Conoce y ejerce tus derechos como paciente. Toda la información que
            necesitas.
          </Paragraph>
        </View>

        {rightsData.map((right) => (
          <Card
            key={right.id}
            style={[styles.rightCard, { borderLeftColor: right.color }]}
          >
            <Card.Content>
              <View style={styles.cardHeader}>
                <View style={styles.titleContainer}>
                  <Icon name={right.icon} size={24} color={right.color} />
                  <Title style={styles.cardTitle}>{right.title}</Title>
                </View>
                <Button
                  mode="text"
                  onPress={() => toggleCard(right.id)}
                  icon={
                    expandedCard === right.id ? "expand-less" : "expand-more"
                  }
                >
                  {expandedCard === right.id ? "Menos" : "Más"}
                </Button>
              </View>

              {expandedCard === right.id && (
                <View style={styles.cardContent}>
                  <Paragraph style={styles.cardText}>{right.content}</Paragraph>

                  <Divider style={styles.divider} />

                  <View style={styles.actionsContainer}>
                    {right.actions.map((action, index) => (
                      <Button
                        key={index}
                        mode="outlined"
                        onPress={() => handleAction(action.action)}
                        style={styles.actionButton}
                        icon="arrow-forward"
                      >
                        {action.text}
                      </Button>
                    ))}
                  </View>
                </View>
              )}
            </Card.Content>
          </Card>
        ))}

        {/* Enlaces útiles */}
        <Card style={styles.linksCard}>
          <Card.Content>
            <Title style={styles.linksTitle}>Enlaces Útiles</Title>

            <Button
              mode="outlined"
              onPress={() => openExternalLink("https://www.supersalud.gov.co")}
              style={styles.linkButton}
              icon="open-in-new"
            >
              SuperSalud
            </Button>

            <Button
              mode="outlined"
              onPress={() => openExternalLink("https://www.minsalud.gov.co")}
              style={styles.linkButton}
              icon="open-in-new"
            >
              Ministerio de Salud
            </Button>

            <Button
              mode="outlined"
              onPress={() =>
                openExternalLink("https://www.procuraduria.gov.co")
              }
              style={styles.linkButton}
              icon="open-in-new"
            >
              Procuraduría General
            </Button>
          </Card.Content>
        </Card>

        {/* Información de contacto */}
        <Card style={styles.contactCard}>
          <Card.Content>
            <Title style={styles.contactTitle}>¿Necesitas Ayuda?</Title>
            <Paragraph style={styles.contactText}>
              Si tienes problemas con tu EPS o necesitas asesoría legal
              gratuita:
            </Paragraph>

            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Icon name="phone" size={20} color={colors.primary} />
                <Paragraph style={styles.contactDetail}>
                  Línea de atención: 01 8000 123 456
                </Paragraph>
              </View>

              <View style={styles.contactItem}>
                <Icon name="email" size={20} color={colors.primary} />
                <Paragraph style={styles.contactDetail}>
                  Email: atencion@supersalud.gov.co
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
  rightCard: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardTitle: {
    ...typography.h4,
    color: colors.black,
    marginLeft: spacing.sm,
    flex: 1,
  },
  cardContent: {
    marginTop: spacing.md,
  },
  cardText: {
    ...typography.body,
    color: colors.darkGray,
    lineHeight: 24,
  },
  divider: {
    marginVertical: spacing.md,
  },
  actionsContainer: {
    gap: spacing.sm,
  },
  actionButton: {
    marginBottom: spacing.xs,
  },
  linksCard: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  linksTitle: {
    ...typography.h4,
    color: colors.black,
    marginBottom: spacing.md,
  },
  linkButton: {
    marginBottom: spacing.sm,
  },
  contactCard: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  contactTitle: {
    ...typography.h4,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  contactText: {
    ...typography.body,
    color: colors.darkGray,
    marginBottom: spacing.md,
  },
  contactInfo: {
    gap: spacing.sm,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactDetail: {
    ...typography.body,
    color: colors.darkGray,
    marginLeft: spacing.sm,
  },
});
