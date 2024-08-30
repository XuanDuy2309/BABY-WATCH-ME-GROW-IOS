import { View, Text, Pressable } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const CheckBox = ({ onChange, checked }:{onChange: () => void, checked: boolean}) => {
  return (
    <Pressable
    className={`w-4 h-4 flex-row justify-center items-center rounded-bottom border-[1px] bg-transparent ${checked && 'bg-blue-500'}`}
    onPress={onChange}>
    {checked && <FontAwesome name="check" size={12} color="white" />}
  </Pressable>
  )
}

export default CheckBox