import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <>
    <Stack>
        <Stack.Screen name='about1' options={{headerShown: false}}/>
        <Stack.Screen name='about2' options={{headerShown: false}}/>
        <Stack.Screen name='about3' options={{headerShown: false}}/>
        <Stack.Screen name='about4' options={{headerShown: false}}/>
        <Stack.Screen name='about5' options={{headerShown: false}}/>
        <Stack.Screen name='about6' options={{headerShown: false}}/>
    </Stack>
    </>
  )
}

export default _layout