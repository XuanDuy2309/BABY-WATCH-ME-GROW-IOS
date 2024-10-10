import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router } from 'expo-router'
import { GlobalContext } from '@/context/GlobalProvider';
import { getCoinInApp, postCoinInApp } from '@/service/auth';
import { IUser } from '@/interface/IUser';

const ButtonStart = ({ onPress }: { onPress: () => void }) => {
    const { user,handleUpdateCoin } = useContext(GlobalContext);
    const [timeCoin, setTimeCoin] = useState(0);

    const getCoin = async (user: IUser) => {
        await getCoinInApp(user).then((res) => {
            if (res) {
                // console.log(res.data.coin_number);
                setTimeCoin(res.data.coin_number);
            }
        });
    }

    useEffect(() => {
        getCoin(user);
    }, [timeCoin]);

    return (
        <View className='w-full justify-center items-center mt-8'>
            <TouchableOpacity className='w-fit rounded overflow-hidden' onPress={() => {
                if (timeCoin > 0) {
                    // handleSetCount(count-1);
                    handleUpdateCoin(user, timeCoin - 1);
                    setTimeCoin((prev)=>prev-1);
                    onPress();
                    console.log(timeCoin)
                    return
                }
                Alert.alert("Oppp...!", "You don't have enough coin to start", [
                    { text: "OK", style: "cancel" },
                    {
                        text: "Take more coin",
                        
                        onPress: () => { router.navigate('/about1') },
                    }
                ])
                // onPress();
                // handleUpdateCoin(user, 10);
            }}>
                <Text className='w-[140px] py-4 bg-[#FF7991] rounded-full font-bold text-center text-white'>Start</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonStart