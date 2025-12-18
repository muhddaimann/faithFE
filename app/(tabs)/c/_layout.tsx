import { Stack } from "expo-router";

export default function JourneysLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="otForm" />
      <Stack.Screen name="workForm" />
      <Stack.Screen name="claimForm" />
    </Stack>
  );
}
