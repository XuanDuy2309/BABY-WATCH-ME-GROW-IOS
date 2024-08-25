import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonStart = ({onPress}:{onPress: () => void}) => {
    return (
        <>
            <TouchableOpacity className='w-full justify-center items-center mt-8' onPress={onPress}>
                <Text className='w-[140px] py-4 bg-[#FF7991] rounded-lg font-bold text-center text-white'>Start</Text>
            </TouchableOpacity>
        </>
    )
}

export default ButtonStart