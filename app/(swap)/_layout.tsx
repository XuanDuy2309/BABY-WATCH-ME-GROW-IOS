import { View, Text, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { router, Stack } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
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
                <Stack.Screen
                    name="generator"
                    options={{
                        headerShown: true,
                        headerStyle: { backgroundColor: "transparent" },
                        headerTitleStyle: { fontSize: 30, fontWeight: 'bold' },
                        headerShadowVisible: false,
                        headerTitle: "Generator",
                        headerTitleAlign: "center",
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
                        headerStyle: { backgroundColor: "transparent" },
                        headerTitleStyle: { fontSize: 30, fontWeight: 'bold' },
                        headerShadowVisible: false,
                        headerTitle: "New Born",
                        headerTitleAlign: "center",                        headerLeft: () => (
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
                        headerStyle: { backgroundColor: "transparent" },
                        headerTitleStyle: { fontSize: 30, fontWeight: 'bold' },
                        headerShadowVisible: false,
                        headerTitle: "Time Machine",
                        headerTitleAlign: "center",
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
                        headerStyle: { backgroundColor: "transparent" },
                        headerTitleStyle: { fontSize: 30, fontWeight: 'bold' },
                        headerShadowVisible: false,
                        headerTitle: "Dad & Mom",
                        headerTitleAlign: "center",
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
                        headerStyle: { backgroundColor: "transparent" },
                        headerTitleStyle: { fontSize: 30, fontWeight: 'bold' },
                        headerShadowVisible: false,
                        headerTitle: "Kid & Mom",
                        headerTitleAlign: "center",
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
            {/* <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            /> */}

        </ImageBackground>
    )
}

export default _layout