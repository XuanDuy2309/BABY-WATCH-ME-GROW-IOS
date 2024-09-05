import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { View, Text } from "react-native";
import GlobalProvider from "@/context/GlobalProvider";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";


// Prevent the splash screen from auto-hiding before asset loading is cromplete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(swap)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="template/[title]" options={{
          headerShown: true,
          headerTitle: "All Templates",
          headerTitleStyle: { fontSize: 30, fontWeight: 600 },
          headerTitleAlign: "center",
          headerLeft: () => (
            <AntDesign
              name="left"
              size={24}
              color="black"
              onPress={() => router.back()}
            />)

        }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#161622" style="dark" />
    </GlobalProvider>
  );
}
