import { Stack } from "expo-router";

export default function AnnouncementLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="announcement" />
    </Stack>
  );
}
