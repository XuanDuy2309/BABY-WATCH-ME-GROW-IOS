import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { ResizeMode, Video } from 'expo-av'
import { GlobalContext } from '@/context/GlobalProvider';
import { router } from 'expo-router';

const CardTemplate = ({ item, currentTempl }: { item: any, currentTempl: any }) => {
    const { handleShowAds } = useContext(GlobalContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const handleGoToSwap = (item: any) => {
        if (currentTempl.title === "Kid & Mom") {
            router.navigate(`/kid&mom/${item.folder_name}`);
            handleShowAds();
            return;
        }
        if (currentTempl.title === "Dad & Mom") {
            router.navigate(`/dad&mom/${item.id}`);
            handleShowAds();

            return;
        }
        router.navigate(`/timemachine/${item.id}`);
        handleShowAds();

    }

    if (currentTempl.title === "Kid & Mom") {
        return (
            <TouchableOpacity className="flex-1 h-[279px] rounded overflow-hidden mt-4" onPress={() => handleGoToSwap(item)}>
                <Image
                    source={{ uri: item.image_sample }}
                    className="w-full h-full object-cover"
                />
            </TouchableOpacity>
        );
    }
    // console.log(item.linkgoc);
    return (
        <View className="flex-1 h-fit rounded overflow-hidden mt-4">
            <Video
                source={{ uri: item.linkgoc }}
                isMuted={false}
                resizeMode={ResizeMode.COVER}
                useNativeControls
                isLooping
                style={{ width: "100%", height: 279 }}
            />
            <View className='mt-4 flex-row justify-center items-centers'>
                <TouchableOpacity className='w-1/2 h-fit py-2 px-4 bg-[#FF7991] rounded-lg' onPress={() => handleGoToSwap(item)}>
                    <Text className='font-bold text-white text-center'>Start</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CardTemplate