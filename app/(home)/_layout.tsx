import { View, Text } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import AntDesign from '@expo/vector-icons/AntDesign'

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
    </>
  )
}

export default _layout