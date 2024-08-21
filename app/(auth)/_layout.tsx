import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Redirect, router, Stack } from "expo-router";
import { GlobalContext } from "@/context/GlobalProvider";
import Loader from "@/components/Loader";
import { StatusBar } from "expo-status-bar";
import AntDesign from '@expo/vector-icons/AntDesign';

const _layout = () => {
  const {user, isLoading } = useContext(GlobalContext);
  if (!isLoading && user) return <Redirect href="/(home)" />;
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: true,
            headerTitle: "Sign In",
            headerTitleStyle: {fontSize: 30, fontWeight: 600},
            headerTitleAlign: "center",
            headerLeft: () => (
              <AntDesign
                name="left"
                size={24}
                color="black"
                onPress={() => router.back()}
              />
            ),
            headerShadowVisible: false,

          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: true,
            headerTitle: "Sign Up",
            headerTitleStyle: {fontSize: 30, fontWeight: 600},
            headerTitleAlign: "center",
            headerLeft: () => (
              <AntDesign
                name="left"
                size={24}
                color="black"
                onPress={() => router.back()}
              />
            ),
            headerShadowVisible: false,

          }}
        />
        <Stack.Screen
          name="forgot"
          options={{
            headerShown: true,
            headerTitle: "Forgot password",
            headerTitleStyle: {fontSize: 30, fontWeight: 600},
            headerTitleAlign: "center",
            headerLeft: () => (
              <AntDesign
                name="left"
                size={24}
                color="black"
                onPress={() => router.back()}
              />
            ),
            headerShadowVisible: false,

          }}
        />
      </Stack>
      <Loader isLoading={isLoading} />
      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default _layout;
