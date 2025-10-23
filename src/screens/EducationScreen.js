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

export default function EducationScreen() {
  const [expandedCard, setExpandedCard] = useState(null);

  const educationData = [
    {
      id: "tension",
      title: "Cómo Medir la Tensión Arterial",
      icon: "favorite",
      color: colors.tertiary,
      type: "video",
      duration: "5 min",
      content: `Aprende a medir tu tensión arterial correctamente en casa:

• Descansa 5 minutos antes de medir
• No fumes ni tomes café 30 minutos antes
• Siéntate con la espalda recta
• Coloca el brazalete a la altura del corazón
• Mantén los pies en el suelo
• No hables durante la medición
• Toma 3 mediciones con 1 minuto de diferencia`,
      actions: [
        {
          text: "Ver Video",
          action: "play_video",
          url: "https://youtube.com/watch?v=example1",
        },
        { text: "Guía Paso a Paso", action: "step_guide" },
      ],
    },
    {
      id: "alimentacion",
      title: "Alimentación Saludable",
      icon: "restaurant",
      color: colors.secondary,
      type: "audio",
      duration: "8 min",
      content: `Consejos para una alimentación que cuide tu corazón:

• Reduce el consumo de sal (máximo 5g por día)
• Aumenta frutas y verduras (5 porciones diarias)
• Prefiere carnes magras y pescado
• Evita alimentos procesados y fritos
• Bebe suficiente agua (8 vasos diarios)
• Controla las porciones
• Come a horarios regulares`,
      actions: [
        {
          text: "Escuchar Audio",
          action: "play_audio",
          url: "https://example.com/audio1",
        },
        { text: "Recetas Saludables", action: "recipes" },
      ],
    },
    {
      id: "ejercicio",
      title: "Actividad Física",
      icon: "directions-walk",
      color: colors.primary,
      type: "video",
      duration: "10 min",
      content: `Ejercicios seguros para personas con hipertensión:

• Caminar 30 minutos diarios
• Ejercicios de estiramiento
• Yoga suave o tai chi
• Natación (si está disponible)
• Subir escaleras
• Bailar
• Evita ejercicios de alta intensidad
• Siempre consulta con tu médico`,
      actions: [
        {
          text: "Ver Rutina",
          action: "play_video",
          url: "https://youtube.com/watch?v=example2",
        },
        { text: "Plan de Ejercicios", action: "exercise_plan" },
      ],
    },
    {
      id: "medicamentos",
      title: "Uso Correcto de Medicamentos",
      icon: "medication",
      color: colors.info,
      type: "audio",
      duration: "6 min",
      content: `Aprende a tomar tus medicamentos correctamente:

• Toma los medicamentos a la misma hora
• No suspendas el tratamiento sin consultar
• Informa sobre efectos secundarios
• Guarda los medicamentos en lugar fresco y seco
• Revisa las fechas de vencimiento
• No compartas medicamentos
• Lleva lista actualizada de medicamentos`,
      actions: [
        {
          text: "Escuchar Consejos",
          action: "play_audio",
          url: "https://example.com/audio2",
        },
        { text: "Recordatorios", action: "reminders" },
      ],
    },
    {
      id: "estres",
      title: "Manejo del Estrés",
      icon: "spa",
      color: colors.warning,
      type: "video",
      duration: "7 min",
      content: `Técnicas para reducir el estrés y la ansiedad:

• Respiración profunda y relajación
• Meditación o mindfulness
• Escuchar música relajante
• Pasar tiempo en la naturaleza
• Mantener relaciones sociales
• Dormir 7-8 horas diarias
• Evitar situaciones estresantes
• Buscar ayuda profesional si es necesario`,
      actions: [
        {
          text: "Ver Técnicas",
          action: "play_video",
          url: "https://youtube.com/watch?v=example3",
        },
        { text: "Ejercicios de Relajación", action: "relaxation" },
      ],
    },
  ];

  const handleAction = (action, url) => {
    switch (action) {
      case "play_video":
        if (url) {
          Linking.openURL(url).catch((err) => {
            Alert.alert("Error", "No se pudo abrir el video");
          });
        } else {
          Alert.alert("Video", "Reproduciendo video educativo...");
        }
        break;
      case "play_audio":
        if (url) {
          Linking.openURL(url).catch((err) => {
            Alert.alert("Error", "No se pudo reproducir el audio");
          });
        } else {
          Alert.alert("Audio", "Reproduciendo audio educativo...");
        }
        break;
      case "step_guide":
        Alert.alert(
          "Guía Paso a Paso",
          "1. Prepara el tensiómetro\n2. Siéntate cómodamente\n3. Coloca el brazalete\n4. Infla hasta 180 mmHg\n5. Desinfla lentamente\n6. Anota los valores\n7. Repite 2 veces más"
        );
        break;
      case "recipes":
        Alert.alert(
          "Recetas Saludables",
          "Recetas bajas en sodio y grasas saturadas disponibles en la sección de recetas."
        );
        break;
      case "exercise_plan":
        Alert.alert(
          "Plan de Ejercicios",
          "Lunes: Caminata 30 min\nMartes: Estiramientos\nMiércoles: Yoga suave\nJueves: Caminata 30 min\nViernes: Estiramientos\nSábado: Actividad recreativa\nDomingo: Descanso"
        );
        break;
      case "reminders":
        Alert.alert(
          "Recordatorios",
          "Configura recordatorios en la sección de medicamentos para no olvidar tomarlos."
        );
        break;
      case "relaxation":
        Alert.alert(
          "Ejercicios de Relajación",
          "1. Respiración 4-7-8\n2. Relajación muscular progresiva\n3. Visualización guiada\n4. Meditación de atención plena\n5. Técnicas de grounding"
        );
        break;
      default:
        Alert.alert("Información", "Función en desarrollo");
    }
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
          <Title style={styles.title}>Educación y Consejos</Title>
          <Paragraph style={styles.subtitle}>
            Aprende sobre salud y autocuidado con nuestros recursos educativos
          </Paragraph>
        </View>

        {educationData.map((item) => (
          <Card
            key={item.id}
            style={[styles.educationCard, { borderLeftColor: item.color }]}
          >
            <Card.Content>
              <View style={styles.cardHeader}>
                <View style={styles.titleContainer}>
                  <Icon name={item.icon} size={24} color={item.color} />
                  <View style={styles.titleTextContainer}>
                    <Title style={styles.cardTitle}>{item.title}</Title>
                    <View style={styles.metaInfo}>
                      <Chip
                        style={[
                          styles.typeChip,
                          { backgroundColor: item.color },
                        ]}
                        textStyle={styles.typeChipText}
                      >
                        {item.type === "video" ? "Video" : "Audio"}
                      </Chip>
                      <Paragraph style={styles.duration}>
                        {item.duration}
                      </Paragraph>
                    </View>
                  </View>
                </View>
                <Button
                  mode="text"
                  onPress={() => toggleCard(item.id)}
                  icon={
                    expandedCard === item.id ? "expand-less" : "expand-more"
                  }
                >
                  {expandedCard === item.id ? "Menos" : "Más"}
                </Button>
              </View>

              {expandedCard === item.id && (
                <View style={styles.cardContent}>
                  <Paragraph style={styles.cardText}>{item.content}</Paragraph>

                  <Divider style={styles.divider} />

                  <View style={styles.actionsContainer}>
                    {item.actions.map((action, index) => (
                      <Button
                        key={index}
                        mode="contained"
                        onPress={() => handleAction(action.action, action.url)}
                        style={[
                          styles.actionButton,
                          { backgroundColor: item.color },
                        ]}
                        icon={
                          action.action.includes("play")
                            ? "play"
                            : "arrow-forward"
                        }
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

        {/* Recursos adicionales */}
        <Card style={styles.resourcesCard}>
          <Card.Content>
            <Title style={styles.resourcesTitle}>Recursos Adicionales</Title>

            <Button
              mode="outlined"
              onPress={() =>
                Linking.openURL(
                  "https://www.minsalud.gov.co/salud/publica/PENT/Paginas/politica-nacional-de-educacion-para-la-salud.aspx"
                )
              }
              style={styles.resourceButton}
              icon="school"
            >
              Política Nacional de Educación en Salud
            </Button>

            <Button
              mode="outlined"
              onPress={() => Linking.openURL("https://www.heart.org")}
              style={styles.resourceButton}
              icon="favorite"
            >
              Asociación Americana del Corazón
            </Button>

            <Button
              mode="outlined"
              onPress={() =>
                Linking.openURL(
                  "https://www.who.int/es/news-room/fact-sheets/detail/hypertension"
                )
              }
              style={styles.resourceButton}
              icon="public"
            >
              OMS - Hipertensión
            </Button>
          </Card.Content>
        </Card>

        {/* Consejos del día */}
        <Card style={styles.tipCard}>
          <Card.Content>
            <Title style={styles.tipTitle}>
              <Icon name="lightbulb" size={20} color={colors.warning} /> Consejo
              del Día
            </Title>
            <Paragraph style={styles.tipText}>
              "Recuerda que la constancia es clave en el tratamiento de la
              hipertensión. Tomar tus medicamentos a la misma hora todos los
              días ayuda a mantener niveles estables de presión arterial."
            </Paragraph>
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
  educationCard: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  titleTextContainer: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  cardTitle: {
    ...typography.h4,
    color: colors.black,
    marginBottom: spacing.xs,
  },
  metaInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  typeChip: {
    height: 24,
  },
  typeChipText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  duration: {
    ...typography.caption,
    color: colors.gray,
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
  resourcesCard: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  resourcesTitle: {
    ...typography.h4,
    color: colors.black,
    marginBottom: spacing.md,
  },
  resourceButton: {
    marginBottom: spacing.sm,
  },
  tipCard: {
    margin: spacing.lg,
    backgroundColor: colors.warning,
    borderRadius: 12,
    elevation: 2,
  },
  tipTitle: {
    ...typography.h4,
    color: colors.white,
    marginBottom: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
  },
  tipText: {
    ...typography.body,
    color: colors.white,
    lineHeight: 24,
    fontStyle: "italic",
  },
});
