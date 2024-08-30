import { View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import Loader from './Loader'
import { ResizeMode, Video } from 'expo-av'
import Animated, { withTiming, Easing, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';


const DetailProduct = ({ img, onDetail, isDetail }: { img: any[], onDetail: () => void, isDetail: boolean }) => {
    const [loading, setLoading] = useState(false);
    const [positions, setPositions] = useState(0);
    const [wid, setWid] = useState(0);

    const handleNext = () => {
        if (positions < img.length - 1) {
            setPositions(positions + 1);
        } else {
            setPositions(0);
        }
    }

    const handlePrev = () => {
        if (positions > 0) {
            setPositions(positions - 1);
        } else {
            setPositions(img.length - 1);
        }
    }



    const translateX = useSharedValue(0);


    translateX.value = withTiming(-wid * positions, {
        duration: 500,
        easing: Easing.linear,
    });


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    if (isDetail === false) {
        return null;
    }
    return (
        <View className='w-full h-full justify-center items-center  absolute top-0 left-0 right-0'>
            <View className='w-full h-full bg-white mt-6 p-4 border rounded-3xl'>
                <View className='flex-row justify-between'>
                    <Text className='text-2xl font-bold'>Detail Photo</Text>
                    <TouchableOpacity onPress={onDetail}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View className='w-full h-fit overflow-hidden relative' onLayout={(e) => {
                    const width = e.nativeEvent.layout.width;
                    setWid(width);
                }}>
                    <Animated.View className='flex-row' style={animatedStyle}>
                        {
                            img && img.length > 0 && img.map((item, index) => {
                                console.log(item);
                                if (item !== undefined) {
                                    const string = item.link_da_swap || item;
                                    const url = string.replace("futurelove.online", "photo.gachmen.org");
                                    return <View key={index} className='w-full h-fit'>
                                        <Image source={{ uri: url }} resizeMode='contain' className='w-full h-full' />
                                    </View>
                                }
                                return <></>
                            })
                        }
                    </Animated.View>
                    <View className='absolute top-1/2 -translate-x-1/2 flex-row justify-between w-full'>
                        <TouchableOpacity className='px-4 py-2 bg-[#C3B9B9] rounded' onPress={handlePrev}>
                            <Text className='text-white text-xl'>{"<"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='px-4 py-2 bg-[#C3B9B9] rounded' onPress={handleNext}>
                            <Text className='text-white text-xl'>{">"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <FlatList
                className='w-full h-ful bg-black'
                data={img}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    const string = item.link_da_swap;
                            const url = string.replace("futurelove.online", "photo.gachmen.org");
                            console.log(url);   
                    return (
                        <View className='w-full h-fit bg-white'>
                                <Image source={{ uri: url }} resizeMode='contain' className='w-full h-full' />
                            </View>
                    )
                }}
                /> */}


            </View>
            <Loader isLoading={loading} />
        </View>
    )
}

export default DetailProduct