import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Title, Paragraph, Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors, spacing } from "../styles";

export default function BloodPressureCard({ measurement, onPress }) {
  const getPressureCategory = (systolic, diastolic) => {
    if (systolic < 120 && diastolic < 80) {
      return { category: "Normal", color: colors.pressure.normal };
    } else if (systolic < 140 && diastolic < 90) {
      return {
        category: "Prehipertensión",
        color: colors.pressure.prehypertension,
      };
    } else {
      return { category: "Hipertensión", color: colors.pressure.hypertension };
    }
  };

  const pressureInfo = getPressureCategory(
    measurement.systolic,
    measurement.diastolic
  );

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Title style={styles.title}>
            <Icon name="favorite" size={20} color={colors.tertiary} /> Presión
            Arterial
          </Title>
          <Chip
            style={[
              styles.categoryChip,
              { backgroundColor: pressureInfo.color },
            ]}
            textStyle={styles.categoryText}
          >
            {pressureInfo.category}
          </Chip>
        </View>

        <View style={styles.measurements}>
          <View style={styles.measurement}>
            <Paragraph style={styles.measurementLabel}>Sistólica</Paragraph>
            <Paragraph style={styles.measurementValue}>
              {measurement.systolic} mmHg
            </Paragraph>
          </View>

          <View style={styles.separator} />

          <View style={styles.measurement}>
            <Paragraph style={styles.measurementLabel}>Diastólica</Paragraph>
            <Paragraph style={styles.measurementValue}>
              {measurement.diastolic} mmHg
            </Paragraph>
          </View>
        </View>

        {measurement.pulse && (
          <Paragraph style={styles.pulse}>
            <Icon name="favorite" size={16} color={colors.tertiary} /> Pulso:{" "}
            {measurement.pulse} bpm
          </Paragraph>
        )}

        <Paragraph style={styles.date}>
          <Icon name="schedule" size={16} color={colors.gray} />{" "}
          {measurement.date}
        </Paragraph>
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
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
  },
  categoryChip: {
    marginLeft: spacing.sm,
  },
  categoryText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  measurements: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  measurement: {
    alignItems: "center",
    flex: 1,
  },
  measurementLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  measurementValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
  },
  separator: {
    width: 1,
    height: 40,
    backgroundColor: colors.lightGray,
    marginHorizontal: spacing.md,
  },
  pulse: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: 14,
    color: colors.gray,
  },
});
