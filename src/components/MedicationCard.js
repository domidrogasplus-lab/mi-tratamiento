import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Title, Paragraph, Button, Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors, spacing } from "../styles";

export default function MedicationCard({
  medication,
  onTakeMedication,
  onEdit,
  onDelete,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "taken":
        return colors.success;
      case "pending":
        return colors.warning;
      case "overdue":
        return colors.danger;
      default:
        return colors.gray;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "taken":
        return "Tomado";
      case "pending":
        return "Pendiente";
      case "overdue":
        return "Atrasado";
      default:
        return "Sin estado";
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Title style={styles.title}>{medication.name}</Title>
          <Chip
            style={[
              styles.statusChip,
              { backgroundColor: getStatusColor(medication.status) },
            ]}
            textStyle={styles.statusText}
          >
            {getStatusText(medication.status)}
          </Chip>
        </View>

        <Paragraph style={styles.dosage}>
          <Icon name="medication" size={16} color={colors.primary} /> Dosis:{" "}
          {medication.dosage}
        </Paragraph>

        <Paragraph style={styles.schedule}>
          <Icon name="schedule" size={16} color={colors.primary} /> Horario:{" "}
          {medication.schedule}
        </Paragraph>

        {medication.nextDelivery && (
          <Paragraph style={styles.delivery}>
            <Icon name="local-shipping" size={16} color={colors.secondary} />{" "}
            Próxima entrega: {medication.nextDelivery}
          </Paragraph>
        )}

        <View style={styles.actions}>
          {medication.status !== "taken" && (
            <Button
              mode="contained"
              onPress={() => onTakeMedication(medication.id)}
              style={styles.takeButton}
              buttonColor={colors.secondary}
            >
              <Icon name="check" size={16} color={colors.white} /> Marcar como
              tomado
            </Button>
          )}

          <Button
            mode="outlined"
            onPress={() => onEdit(medication.id)}
            style={styles.editButton}
          >
            <Icon name="edit" size={16} color={colors.primary} /> Editar
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
  },
  statusChip: {
    marginLeft: spacing.sm,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  dosage: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: spacing.xs,
  },
  schedule: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: spacing.xs,
  },
  delivery: {
    fontSize: 16,
    color: colors.secondary,
    marginBottom: spacing.sm,
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
  takeButton: {
    flex: 1,
    marginRight: spacing.xs,
  },
  editButton: {
    flex: 1,
    marginLeft: spacing.xs,
  },
});
