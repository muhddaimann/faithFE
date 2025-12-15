import React, { useEffect, useRef } from "react";
import { ScrollView, View, Animated, Easing } from "react-native";
import { Text, Button } from "react-native-paper";
import { router } from "expo-router";
import { Compass, Music, MapPin, Headphones } from "lucide-react-native";
import { useAppTheme } from "../contexts/themeContext";
import { useDesign } from "../contexts/designContext";

export default function Onboarding() {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const heroScale = useRef(new Animated.Value(0.9)).current;
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const listTranslate = useRef(new Animated.Value(24)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heroOpacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(heroScale, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(listOpacity, {
        toValue: 1,
        duration: 700,
        delay: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(listTranslate, {
        toValue: 0,
        duration: 700,
        delay: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const features = [
    {
      key: "discover",
      icon: Music,
      title: "Discover by Mood",
      description: "Music that matches how you move and feel.",
    },
    {
      key: "location",
      icon: MapPin,
      title: "Location Aware",
      description: "Soundtracks inspired by where you are.",
    },
    {
      key: "journey",
      icon: Compass,
      title: "Plan Journeys",
      description: "Turn trips into musical stories.",
    },
    {
      key: "play",
      icon: Headphones,
      title: "Effortless Playback",
      description: "Press play and stay in the moment.",
    },
  ];

  return (
    <ScrollView
      bounces={false}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding: design.spacing.lg,
        paddingBottom: design.spacing["2xl"],
      }}
    >
      <Animated.View
        style={{
          alignItems: "center",
          marginBottom: design.spacing.xl,
          gap: design.spacing.sm,
          opacity: heroOpacity,
          transform: [{ scale: heroScale }],
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
            shadowColor: theme.colors.primary,
            shadowOpacity: 0.25,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 8 },
            elevation: 8,
          }}
        >
          <Compass size={30} color={theme.colors.onPrimaryContainer} />
        </View>

        <Text
          variant="headlineLarge"
          style={{ color: theme.colors.onBackground }}
        >
          TravelTune
        </Text>

        <Text
          variant="bodyLarge"
          style={{
            color: theme.colors.onSurfaceVariant,
            textAlign: "center",
            maxWidth: 300,
          }}
        >
          Travel deeper. Feel every place through music.
        </Text>
      </Animated.View>

      <Animated.View
        style={{
          gap: design.spacing.md,
          opacity: listOpacity,
          transform: [{ translateY: listTranslate }],
        }}
      >
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <View
              key={f.key}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: design.spacing.md,
                backgroundColor: theme.colors.surface,
                padding: design.spacing.md,
                borderRadius: design.radii.lg,
                shadowColor: theme.colors.shadow,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 4,
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: theme.colors.secondaryContainer,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={22} color={theme.colors.onSecondaryContainer} />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  variant="titleMedium"
                  style={{ color: theme.colors.onSurface }}
                >
                  {f.title}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {f.description}
                </Text>
              </View>
            </View>
          );
        })}
      </Animated.View>

      <Animated.View
        style={{
          marginTop: design.spacing.xl,
          opacity: listOpacity,
          transform: [{ translateY: listTranslate }],
        }}
      >
        <Button mode="contained" onPress={() => router.replace("/land")}>
          Get Started
        </Button>
      </Animated.View>
    </ScrollView>
  );
}
