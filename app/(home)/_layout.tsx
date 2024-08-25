import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const _layout = () => {
  return (
    <>
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
    </Stack>
    <StatusBar style="dark" />
    </>
  )
}

export default _layout