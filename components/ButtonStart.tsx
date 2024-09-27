import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useContext } from 'react'
import { router } from 'expo-router'
import { GlobalContext } from '@/context/GlobalProvider';

const ButtonStart = ({onPress}:{onPress: () => void}) => {
    const {count,handleSetCount} = useContext(GlobalContext);
    return (
        <>
            <TouchableOpacity className='w-full justify-center items-center mt-8' onPress={()=>{
                // if (count >0 ){
                //     handleSetCount(count-1);
                //     onPress();
                //     console.log(count)
                //     return
                // }
                // Alert.alert("Oppp...!","You don't have enough coin to start",[
                //     {text:"OK",style:"cancel"},
                //     {
                //         text:"Take more coin",
                //         onPress: () => {router.navigate('/about1')},
                //     }
                // ])
                onPress();
            }}>
                <Text className='w-[140px] py-4 bg-[#FF7991] rounded-lg font-bold text-center text-white'>Start</Text>
            </TouchableOpacity>
        </>
    )
}

export default ButtonStart