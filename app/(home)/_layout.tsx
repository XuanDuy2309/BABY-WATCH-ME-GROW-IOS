import { View, Text } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import AntDesign from '@expo/vector-icons/AntDesign';
import  { AdEventType, BannerAd, BannerAdSize, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';


const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-5372862349743986/1123321159';


const _layout = () => {
  return (
    <>
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen
          name="profile"
          options={{
            headerShown: true,
            headerTitle: "Profile",
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
    <StatusBar style="dark" />
    <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
    </>
  )
}

export default _layout