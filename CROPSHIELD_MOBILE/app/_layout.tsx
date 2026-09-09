import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../global.css";
import "../src/i18n/i18n"; // Initialize i18n
import { useFarmStore } from "../src/store/farmStore";

export default function RootLayout() {
  const { isInitialized } = useFarmStore();

  if (!isInitialized) {
    return null; // Wait for AsyncStorage
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
