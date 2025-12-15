import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from "react-native-paper";

const make = (
  family: string,
  weight: "400" | "500" | "600" | "700",
  fontSize: number,
  lineHeight: number,
  letterSpacing = 0
) => ({
  fontFamily: family,
  fontWeight: weight,
  fontSize,
  lineHeight,
  letterSpacing,
});

const tokenMap = {
  displayLarge: make("PlusJakartaSans_700Bold", "700", 60, 68),
  displayMedium: make("PlusJakartaSans_700Bold", "700", 48, 56),
  displaySmall: make("PlusJakartaSans_700Bold", "700", 38, 46),

  headlineLarge: make("PlusJakartaSans_700Bold", "700", 34, 42),
  headlineMedium: make("PlusJakartaSans_700Bold", "700", 30, 38),
  headlineSmall: make("PlusJakartaSans_600SemiBold", "600", 26, 34),

  titleLarge: make("PlusJakartaSans_600SemiBold", "600", 24, 30),
  titleMedium: make("PlusJakartaSans_600SemiBold", "600", 18, 26, 0.1),
  titleSmall: make("PlusJakartaSans_600SemiBold", "600", 16, 22, 0.1),

  labelLarge: make("Inter_600SemiBold", "600", 15, 20, 0.1),
  labelMedium: make("Inter_500Medium", "500", 13, 18, 0.5),
  labelSmall: make("Inter_400Regular", "400", 12, 16, 0.5),

  bodyLarge: make("Inter_400Regular", "400", 17, 26),
  bodyMedium: make("Inter_400Regular", "400", 15, 22),
  bodySmall: make("Inter_400Regular", "400", 13, 18),
} as const;

const fonts = tokenMap as unknown as MD3Theme["fonts"];

export const requiredFontNames = {
  jakartaSemiBold: "PlusJakartaSans_600SemiBold",
  jakartaBold: "PlusJakartaSans_700Bold",
  interRegular: "Inter_400Regular",
  interMedium: "Inter_500Medium",
  interSemiBold: "Inter_600SemiBold",
};

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 12,
  fonts,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#345995",
    onPrimary: "#F2F6FF",
    primaryContainer: "#C7D6F5",
    onPrimaryContainer: "#13294B",

    secondary: "#FFA24C",
    onSecondary: "#2A1400",
    secondaryContainer: "#FFE0BF",
    onSecondaryContainer: "#3A1E00",

    tertiary: "#2F9E62",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#CDEFD9",
    onTertiaryContainer: "#0F3D24",

    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",

    background: "#F7F8FB",
    onBackground: "#1A1B1E",
    surface: "#FFFFFF",
    onSurface: "#1A1B1E",

    surfaceVariant: "#E7E7EE",
    onSurfaceVariant: "#494A57",
    outline: "#7A7B8A",
    outlineVariant: "#C9CADA",

    inverseSurface: "#2F3036",
    inverseOnSurface: "#F2F2F4",
    inversePrimary: "#B5C7F3",

    shadow: "#000000",
    scrim: "#000000",
    surfaceDisabled: "rgba(26,27,30,0.12)",
    onSurfaceDisabled: "rgba(26,27,30,0.38)",
    backdrop: "rgba(26,27,30,0.4)",

    elevation: { ...MD3LightTheme.colors.elevation },
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  roundness: 12,
  fonts,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#AFC4FF",
    onPrimary: "#0A1C3A",
    primaryContainer: "#1F3B78",
    onPrimaryContainer: "#D9E3FF",

    secondary: "#FFC38A",
    onSecondary: "#3A1E00",
    secondaryContainer: "#663A00",
    onSecondaryContainer: "#FFD7A8",

    tertiary: "#79D39B",
    onTertiary: "#0B2A18",
    tertiaryContainer: "#1A5A37",
    onTertiaryContainer: "#BDECCF",

    error: "#FFB4AB",
    onError: "#690005",
    errorContainer: "#93000A",
    onErrorContainer: "#FFDAD6",

    background: "#0A0B10",
    onBackground: "#E3E3E8",
    surface: "#111318",
    onSurface: "#E3E3E8",

    surfaceVariant: "#444654",
    onSurfaceVariant: "#C9CAD7",
    outline: "#9293A1",
    outlineVariant: "#444654",

    inverseSurface: "#E3E3E8",
    inverseOnSurface: "#202126",
    inversePrimary: "#345995",

    shadow: "#000000",
    scrim: "#000000",
    surfaceDisabled: "rgba(227,227,232,0.12)",
    onSurfaceDisabled: "rgba(227,227,232,0.38)",
    backdrop: "rgba(0,0,0,0.4)",

    elevation: { ...MD3DarkTheme.colors.elevation },
  },
};

export default {
  lightTheme,
  darkTheme,
  fonts,
  requiredFontNames,
};
