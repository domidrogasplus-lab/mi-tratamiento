import React from "react";
import { View, StyleSheet } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "expo-ads-admob";
import { colors, spacing } from "../styles";

export default function AdBanner({
  adUnitId = TestIds.BANNER,
  size = BannerAdSize.BANNER,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={adUnitId}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log("Banner ad loaded");
        }}
        onAdFailedToLoad={(error) => {
          console.log("Banner ad failed to load:", error);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGray,
    marginVertical: spacing.sm,
    borderRadius: 8,
    overflow: "hidden",
  },
});
