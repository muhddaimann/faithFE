import React, { useEffect, useRef } from "react";
import { ScrollView, Animated, Easing } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "../contexts/themeContext";
import { useDesign } from "../contexts/designContext";
import { router } from "expo-router";

export default function Goodbye() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.delay(800),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace("/");
    });
  }, []);

  return (
    <ScrollView
      bounces={false}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: design.spacing.lg,
        backgroundColor: theme.colors.background,
      }}
    >
      <Animated.View style={{ opacity }}>
        <Text
          variant="headlineMedium"
          style={{ color: theme.colors.onBackground, textAlign: "center" }}
        >
          Signed out
        </Text>

        <Text
          variant="bodyLarge"
          style={{
            marginTop: design.spacing.md,
            color: theme.colors.onSurfaceVariant,
            textAlign: "center",
          }}
        >
          See you next time.
        </Text>
      </Animated.View>
    </ScrollView>
  );
}
