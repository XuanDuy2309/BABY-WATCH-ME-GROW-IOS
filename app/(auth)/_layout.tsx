import { View, Text, ImageBackground } from "react-native";
import React, { useContext } from "react";
import { Redirect, router, Stack } from "expo-router";
import { GlobalContext } from "@/context/GlobalProvider";
import Loader from "@/components/Loader";
import { StatusBar } from "expo-status-bar";
import AntDesign from '@expo/vector-icons/AntDesign';
import  { AdEventType, BannerAd, BannerAdSize, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import images from "@/assets/images";


const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-5372862349743986/1123321159';


const _layout = () => {
  const { user, isLoading } = useContext(GlobalContext);
  if (!isLoading && user) return <Redirect href="/(home)" />;
  return (
    <ImageBackground
      source={images.bgTalet}
      className="h-full w-full"
      resizeMode="cover"
    >
      <Stack>
        <Stack.Screen
          name="signIn"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "transparent" },
            headerTitle: "Sign In",
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold', // Use 'bold' instead of a numeric value like 600
            },
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
          name="signUp"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "transparent" },
            headerTitle: "Sign Up",
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold', // Use 'bold' instead of a numeric value like 600
            },
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
            headerStyle: { backgroundColor: "transparent" },
            headerTitle: "Forgot password",
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold', // Use 'bold' instead of a numeric value like 600
            },
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
      <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
    </ImageBackground>
  );
};

export default _layout;
