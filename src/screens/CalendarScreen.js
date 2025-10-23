import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Title, Paragraph, Card, Chip, Button } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialIcons";
import AdBanner from "../components/AdBanner";
import { colors, spacing, typography } from "../styles";
import { getMedications, getDeliveryDates } from "../services/StorageService";

export default function CalendarScreen() {
  const navigation = useNavigation();
  const [medications, setMedications] = useState([]);
  const [deliveryDates, setDeliveryDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    generateMarkedDates();
  }, [deliveryDates]);

  const loadData = async () => {
    try {
      const [meds, deliveries] = await Promise.all([
        getMedications(),
        getDeliveryDates(),
      ]);
      setMedications(meds);
      setDeliveryDates(deliveries);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const generateMarkedDates = () => {
    const marked = {};

    deliveryDates.forEach((delivery) => {
      const date = delivery.date;
      marked[date] = {
        marked: true,
        dotColor: colors.secondary,
        customStyles: {
          container: {
            backgroundColor: colors.secondary,
            borderRadius: 16,
          },
          text: {
            color: colors.white,
            fontWeight: "bold",
          },
        },
      };
    });

    // Marcar fecha actual
    const today = new Date().toISOString().split("T")[0];
    marked[today] = {
      ...marked[today],
      selected: true,
      selectedColor: colors.primary,
    };

    setMarkedDates(marked);
  };

  const getEventsForDate = (date) => {
    return deliveryDates.filter((delivery) => delivery.date === date);
  };

  const getUpcomingDeliveries = () => {
    const today = new Date();
    return deliveryDates
      .filter((delivery) => new Date(delivery.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysUntilDelivery = (dateString) => {
    const deliveryDate = new Date(dateString);
    const today = new Date();
    const diffTime = deliveryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Title style={styles.title}>Calendario de Entregas</Title>
          <Paragraph style={styles.subtitle}>
            Mantén un control de cuándo debes ir por tus medicamentos
          </Paragraph>
        </View>

        {/* Calendario */}
        <Card style={styles.calendarCard}>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={markedDates}
            theme={{
              backgroundColor: colors.white,
              calendarBackground: colors.white,
              textSectionTitleColor: colors.black,
              selectedDayBackgroundColor: colors.primary,
              selectedDayTextColor: colors.black,
              todayTextColor: colors.secondary,
              dayTextColor: colors.black,
              textDisabledColor: colors.gray,
              dotColor: colors.secondary,
              selectedDotColor: colors.white,
              arrowColor: colors.primary,
              monthTextColor: colors.black,
              indicatorColor: colors.primary,
              textDayFontWeight: "400",
              textMonthFontWeight: "600",
              textDayHeaderFontWeight: "600",
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
            style={styles.calendar}
          />
        </Card>

        {/* Eventos del día seleccionado */}
        {getEventsForDate(selectedDate).length > 0 && (
          <Card style={styles.eventsCard}>
            <Card.Content>
              <Title style={styles.eventsTitle}>
                Eventos para {formatDate(selectedDate)}
              </Title>
              {getEventsForDate(selectedDate).map((event, index) => (
                <View key={index} style={styles.eventItem}>
                  <Icon
                    name="local-shipping"
                    size={20}
                    color={colors.secondary}
                  />
                  <View style={styles.eventContent}>
                    <Paragraph style={styles.eventTitle}>
                      {event.medication}
                    </Paragraph>
                    <Paragraph style={styles.eventTime}>{event.time}</Paragraph>
                  </View>
                  <Chip
                    style={[
                      styles.eventChip,
                      { backgroundColor: colors.secondary },
                    ]}
                    textStyle={styles.eventChipText}
                  >
                    Entrega
                  </Chip>
                </View>
              ))}
            </Card.Content>
          </Card>
        )}

        {/* Próximas entregas */}
        <Card style={styles.upcomingCard}>
          <Card.Content>
            <Title style={styles.upcomingTitle}>Próximas Entregas</Title>
            {getUpcomingDeliveries().length > 0 ? (
              getUpcomingDeliveries().map((delivery, index) => (
                <View key={index} style={styles.deliveryItem}>
                  <View style={styles.deliveryInfo}>
                    <Paragraph style={styles.deliveryMedication}>
                      {delivery.medication}
                    </Paragraph>
                    <Paragraph style={styles.deliveryDate}>
                      {formatDate(delivery.date)}
                    </Paragraph>
                  </View>
                  <View style={styles.deliveryBadge}>
                    <Chip
                      style={[
                        styles.deliveryChip,
                        {
                          backgroundColor:
                            getDaysUntilDelivery(delivery.date) <= 2
                              ? colors.danger
                              : colors.warning,
                        },
                      ]}
                      textStyle={styles.deliveryChipText}
                    >
                      {getDaysUntilDelivery(delivery.date) === 0
                        ? "Hoy"
                        : `${getDaysUntilDelivery(delivery.date)} días`}
                    </Chip>
                  </View>
                </View>
              ))
            ) : (
              <Paragraph style={styles.noDeliveries}>
                No tienes entregas programadas
              </Paragraph>
            )}
          </Card.Content>
        </Card>

        {/* Acciones rápidas */}
        <View style={styles.actionsContainer}>
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
            mode="outlined"
            onPress={() => navigation.navigate("AddDelivery")}
            style={styles.actionButton}
            icon="add"
          >
            Agregar Entrega
          </Button>
        </View>

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
  calendarCard: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  calendar: {
    borderRadius: 12,
  },
  eventsCard: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  eventsTitle: {
    ...typography.h4,
    color: colors.black,
    marginBottom: spacing.md,
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  eventContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  eventTitle: {
    ...typography.body,
    color: colors.black,
    fontWeight: "500",
  },
  eventTime: {
    ...typography.caption,
    color: colors.gray,
  },
  eventChip: {
    marginLeft: spacing.sm,
  },
  eventChipText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  upcomingCard: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  upcomingTitle: {
    ...typography.h4,
    color: colors.black,
    marginBottom: spacing.md,
  },
  deliveryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryMedication: {
    ...typography.body,
    color: colors.black,
    fontWeight: "500",
  },
  deliveryDate: {
    ...typography.caption,
    color: colors.gray,
  },
  deliveryBadge: {
    marginLeft: spacing.sm,
  },
  deliveryChip: {
    minWidth: 60,
  },
  deliveryChipText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  noDeliveries: {
    ...typography.body,
    color: colors.gray,
    textAlign: "center",
    fontStyle: "italic",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.lg,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});
