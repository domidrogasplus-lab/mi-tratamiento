import React from "react";
import { Button } from "react-native-paper";
import { colors, spacing } from "../styles";

export default function CustomButton({
  title,
  onPress,
  mode = "contained",
  color = colors.primary,
  textColor = colors.black,
  style,
  disabled = false,
  loading = false,
  icon,
  ...props
}) {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      buttonColor={mode === "contained" ? color : "transparent"}
      textColor={mode === "contained" ? textColor : color}
      style={[
        {
          marginVertical: spacing.sm,
          paddingVertical: spacing.sm,
        },
        style,
      ]}
      contentStyle={{
        paddingVertical: spacing.sm,
        minHeight: 56, // Altura mínima para facilitar el toque
      }}
      labelStyle={{
        fontSize: 16,
        fontWeight: "600",
      }}
      disabled={disabled}
      loading={loading}
      icon={icon}
      {...props}
    >
      {title}
    </Button>
  );
}
