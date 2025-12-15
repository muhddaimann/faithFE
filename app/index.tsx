import React, { useEffect, useRef } from "react";
import { ScrollView, View, Animated, Easing } from "react-native";
import { Text, Button } from "react-native-paper";
import { LayoutGrid } from "lucide-react-native";
import { router } from "expo-router";
import { useAppTheme } from "../contexts/themeContext";
import { useDesign } from "../contexts/designContext";

export default function Land() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView
      bounces={false}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding: design.spacing.lg,
        paddingBottom: design.spacing["2xl"],
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={{
          alignItems: "center",
          gap: design.spacing.sm,
          opacity,
          transform: [{ translateY }, { scale }],
        }}
      >
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: theme.colors.primaryContainer,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: design.spacing.sm,
            shadowColor: theme.colors.primary,
            shadowOpacity: 0.25,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 8 },
            elevation: 8,
          }}
        >
          <LayoutGrid size={36} color={theme.colors.onPrimaryContainer} />
        </View>

        <Text
          variant="headlineLarge"
          style={{
            color: theme.colors.onBackground,
            textAlign: "center",
            fontWeight: "700",
            letterSpacing: -0.5,
          }}
        >
          Hello Rockstar
        </Text>

        <Text
          variant="titleMedium"
          style={{
            color: theme.colors.onSurfaceVariant,
            textAlign: "center",
            maxWidth: 280,
            marginTop: design.spacing.xs,
            marginBottom: design.spacing.xl,
          }}
        >
          Sign in to continue managing your work details.
        </Text>

        <View style={{ width: "100%", gap: design.spacing.md }}>
          <Button mode="contained" onPress={() => router.push("/signIn")}>
            Sign In
          </Button>

          <Text
            variant="bodyMedium"
            style={{
              color: theme.colors.onSurfaceVariant,
              textAlign: "center",
            }}
          >
            New here?{" "}
            <Text
              style={{ color: theme.colors.primary }}
              onPress={() => router.push("/signUp")}
            >
              Get started
            </Text>
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
}
