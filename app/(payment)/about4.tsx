import images from '@/assets/images';
import videos from '@/assets/videos';
import { ResizeMode, Video } from 'expo-av';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Button, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { requestPurchase, getProducts, initConnection, endConnection } from 'react-native-iap';
import { SafeAreaView } from 'react-native-safe-area-context';

// const itemSkus = ['BABYWATCHMEGROWIOS.3usd', ''];

const about1 = () => {
    const [w, setW] = useState(0);
    const [h, setH] = useState(0);
    // const [products, setProducts] = useState<any>([]);

    // useEffect(() => {
    //   // Kết nối với store
    //   const initializeIAP = async () => {
    //     try {
    //       await initConnection();
    //       const availableProducts = await getProducts({skus: itemSkus});
    //       setProducts(availableProducts);
    //     } catch (err:any) {
    //       console.warn(err.code, err.message);
    //     }
    //   };

    //   initializeIAP();

    //   return () => {
    //     // Ngắt kết nối khi không dùng nữa
    //     endConnection();
    //   };
    // }, []);

    // const buyProduct = async (sku:any) => {
    //   try {
    //     await requestPurchase({ sku });
    //   } catch (err:any) {
    //     console.warn(err.code, err.message);
    //   }
    // };


    return (
        <ImageBackground source={images.bgPayment} className='w-full h-full'>
            <SafeAreaView className='w-full h-full'>
                <Text className='text-3xl text-center w-full font-bold mt-4'>Dad & Mom</Text>
                <View className='w-11/12 mx-auto mt-8 flex-1 relative justify-start items-center'>
                    <Video
                        source={videos.dadPay}
                        // useNativeControls
                        resizeMode={ResizeMode.COVER}
                        isLooping
                        shouldPlay
                        isMuted={true}
                        className="w-[329px] h-[478px] bg-black mt-2 rounded-lg"
                    />
                    <View className='flex-row justify-between w-full absolute bottom-0 left-0 right-0'>
                        <Image
                            source={images.dadPayment}
                            resizeMode='cover'
                            className='size-[173px] rounded-full'
                        />
                        <Image
                            source={images.momPayment}
                            resizeMode='cover'
                            className='size-[173px] rounded-full'
                        />
                    </View>
                </View>
                <TouchableOpacity className='w-[161px] rounded-2xl border bg-white mx-auto mt-8'>
                    <Text className='w-full text-center text-3xl font-medium py-2' onPress={() => router.push('/about5')}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default about1;
