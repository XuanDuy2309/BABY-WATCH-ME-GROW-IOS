import images from '@/assets/images';
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
                <Text className='text-3xl text-center w-full font-bold mt-4'>New Born</Text>
                <View className='flex-1 flex-col justify-between'>
                    <View className='w-11/12 mt-8 flex-row justify-between mx-auto'>
                        <Image source={images.dadPayment} resizeMode='cover' className='size-[173px] rounded-full border-[2px]' />
                        <Image source={images.momPayment} resizeMode='cover' className='size-[173px] rounded-full border-[2px]' />

                    </View>
                    <View className='w-11/12 mx-auto mt-8 flex-1 relative'>
                        <Image source={images.newPay1} resizeMode='contain'
                            className='w-[217px] h-[122px] absolute top-0 left-0'
                        />
                        <Image source={images.newPay2} resizeMode='contain'
                            className='w-[225px] h-[161px] absolute top-1/2 left-1/2'
                            style={{ transform: [{ translateX: -w / 2 }, { translateY: -h / 2 }] }}
                            onLayout={(event) => {
                                setW(event.nativeEvent.layout.width);
                                setH(event.nativeEvent.layout.height);
                            }}
                        />
                        <Image source={images.newPay3} resizeMode='contain'
                            className='w-[207px] h-[138px] absolute bottom-0 right-0'
                        />
                    </View>
                </View>
                <TouchableOpacity className='w-[161px] rounded-2xl border bg-white mx-auto mt-8'>
                    <Text className='w-full text-center text-3xl font-medium py-2' onPress={() => router.push('/about6')}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default about1;
