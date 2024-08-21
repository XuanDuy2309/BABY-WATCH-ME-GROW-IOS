import { View, Text } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";

const _layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="template/[template]"
          options={{
            headerShown: true,
            headerTitle: "All templates",
            headerTitleAlign: "center",
            headerTitleStyle: { fontSize: 30, fontWeight: 600 },
            headerLeft: () => (
              <AntDesign
                name="left"
                size={24}
                color="black"
                onPress={() => router.back()}
              />
            ),
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default _layout;
