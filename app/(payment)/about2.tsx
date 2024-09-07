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
                <Text className='text-3xl text-center w-full font-bold mt-4'>Time machine</Text>
                <View className='w-11/12 mx-auto mt-8 flex-1 relative'>
                    <Image source={images.timePay} resizeMode='contain'
                        className='absolute top-0 left-1/2' 
                        style={{transform: [{translateX: -w/2}]}}
                        onLayout={(e)=>{
                            // console.log(e.nativeEvent.layout);
                            setW(e.nativeEvent.layout.width);
                        }}  
                        />
                    <View className='absolute bottom-10 left-0 right-0 w-full flex-row justify-between items-end'>
                        <Image source={images.timePay} resizeMode='contain'
                            className='w-[145px] h-[222px]' />
                        <Image source={images.timePay2} resizeMode='cover'
                            className='w-[175px] h-[268px] rounded-lg border-[2px]' />
                    </View>
                </View>
                <TouchableOpacity className='w-[161px] rounded-2xl border bg-white mx-auto mt-8'>
                    <Text className='w-full text-center text-3xl font-medium py-2' onPress={() => router.push('/about3')}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default about1;
