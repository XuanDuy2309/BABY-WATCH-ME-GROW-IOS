import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { ResizeMode, Video } from 'expo-av'
import { GlobalContext } from '@/context/GlobalProvider';
import { router } from 'expo-router';

const CardProfile = ({ item, currentTempl }: { item: any, currentTempl: any }) => {
    const { handleShowAds } = useContext(GlobalContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const handleGoToDetail = (item: any) => {
        if (currentTempl.title === "Kid & Mom") {
            router.navigate(`/detail/kid&mom`);
            router.setParams({ id_sukien: item.id_saved });

            handleShowAds();
            return;
        }
        if (currentTempl.title === "Dad & Mom") {
            router.navigate(`/detail/dad&mom`);
            router.setParams({ id_sukien: item.id_saved });

            handleShowAds();

            return;
        }
        if (currentTempl.title === "Time Machine") {
            router.navigate(`/detail/timemachine`);
            router.setParams({ id_sukien: item.id_saved });

            handleShowAds();
            return;
        }
        if (currentTempl.title === "New Born") {
            router.navigate(`/detail/newborn`);
            router.setParams({ id_sukien: item.id_saved });

            handleShowAds();
            return;
        }
        if (currentTempl.title === "Generator") {
            router.navigate(`/detail/generator`);
            router.setParams({ id_sukien: item.id_saved });

            handleShowAds();
            return;
        }

    }

    if (currentTempl.title === "Kid & Mom" || currentTempl.title === "New Born" || currentTempl.title === "Generator") {
        // const str = item.link_da_swap;
        // const uri = str.replace("/var/www/build_futurelove", "https://photo.gachmen.org");
        // console.log(item);
        return (
            <TouchableOpacity className="flex-1 h-[279px] rounded overflow-hidden mt-4" onPress={() => handleGoToDetail(item)}>
                <Image
                    source={{ uri: item.link_da_swap }}
                    className="w-full h-full object-cover"
                />
            </TouchableOpacity>
        );
    }
    console.log(item);
    return (
        <View className="flex-1 h-fit rounded overflow-hidden mt-4">
            <Video
                source={{ uri: currentTempl.title === "Dad & Mom" ? item.link_video_da_swap : item.link_vid_da_swap }}
                isMuted={false}
                resizeMode={ResizeMode.COVER}
                useNativeControls
                isLooping
                style={{ width: "100%", height: 279 }}
            />
            <View className='mt-4 flex-row justify-center items-centers'>
                <TouchableOpacity className='w-1/2 h-fit py-2 px-4 bg-[#FF7991] rounded-lg' onPress={() => handleGoToDetail(item)}>
                    <Text className='font-bold text-white text-center'>Go to detail</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CardProfile