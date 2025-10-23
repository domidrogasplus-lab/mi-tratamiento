import React from "react";
import { Card } from "react-native-paper";
import { colors, spacing } from "../styles";

export default function CustomCard({
  children,
  style,
  onPress,
  elevation = 2,
  ...props
}) {
  return (
    <Card
      style={[
        {
          margin: spacing.sm,
          backgroundColor: colors.white,
          borderRadius: 12,
        },
        style,
      ]}
      elevation={elevation}
      onPress={onPress}
      {...props}
    >
      <Card.Content style={{ padding: spacing.md }}>{children}</Card.Content>
    </Card>
  );
}
