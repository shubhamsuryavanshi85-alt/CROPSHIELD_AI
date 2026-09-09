import { Tabs } from "expo-router";
import { Leaf, Camera, LayoutDashboard } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";
import { changeAppLanguage } from "../../src/i18n/i18n";

export default function TabLayout() {
  const { t, i18n } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1C1A14', // soil-dark
        },
        headerTintColor: '#F5F0E8', // parchment
        tabBarStyle: {
          backgroundColor: '#1C1A14',
          borderTopColor: '#3A362B',
        },
        tabBarActiveTintColor: '#D4A017', // harvest-gold
        tabBarInactiveTintColor: '#F5F0E8',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('nav.dashboard') || 'Dashboard',
          tabBarIcon: ({ color }) => <LayoutDashboard color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="diagnose"
        options={{
          title: t('nav.diagnose') || 'Diagnose',
          tabBarIcon: ({ color }) => <Camera color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="advisory"
        options={{
          title: t('nav.advisory') || 'Advisory',
          tabBarIcon: ({ color }) => <Leaf color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
