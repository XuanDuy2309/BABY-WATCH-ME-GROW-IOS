import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { router, Stack } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import  { AdEventType, BannerAd, BannerAdSize, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-5372862349743986/1123321159';

const _layout = () => {
    
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="generator"
                    options={{
                        headerShown: true,
                        headerTitle: "Generator",
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
                <Stack.Screen
                    name="newborn"
                    options={{
                        headerShown: true,
                        headerTitle: "New Born",
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
                <Stack.Screen
                    name="timemachine/[id]"
                    options={{
                        headerShown: true,
                        headerTitle: "Time Machine",
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
                <Stack.Screen
                    name="dad&mom/[id]"
                    options={{
                        headerShown: true,
                        headerTitle: "Dad & Mom",
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
                <Stack.Screen
                    name="kid&mom/[id]"
                    options={{
                        headerShown: true,
                        headerTitle: "Kid & Mom",
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