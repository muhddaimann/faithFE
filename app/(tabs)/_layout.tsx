import React from "react";
import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";
import { Compass, PlayCircle, Map, Settings } from "lucide-react-native";

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outlineVariant,
        },
      }}
    >
      <Tabs.Screen
        name="a"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => (
            <Compass color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="b"
        options={{
          title: "Play",
          tabBarIcon: ({ color, size }) => (
            <PlayCircle color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="c"
        options={{
          title: "Journey",
          tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="d"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
