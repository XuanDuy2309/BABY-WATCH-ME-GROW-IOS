import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import AntDesign from '@expo/vector-icons/AntDesign';
import  { AdEventType, BannerAd, BannerAdSize, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import images from '@/assets/images';


const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-5372862349743986/1123321159';


const _layout = () => {
  return (
    <ImageBackground
      source={images.bgTalet}
      className="h-full w-full"
      resizeMode="cover"
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="profile"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "transparent" },
            headerShadowVisible: false,

            headerTitle: "Profile",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold', // Use 'bold' instead of a numeric value like 600
            },
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
        <Stack.Screen
          name="aboutUs"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "transparent" },
            headerTitle: "About Us",
            headerTitleAlign: "center",
            headerShadowVisible: false,

            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold', // Use 'bold' instead of a numeric value like 600
            },
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
      <StatusBar style="dark" />
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </ImageBackground>
  );
}

export default _layout