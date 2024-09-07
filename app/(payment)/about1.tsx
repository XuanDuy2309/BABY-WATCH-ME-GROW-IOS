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
        <Text className='text-3xl text-center w-full font-bold mt-4'>Generator</Text>
        <View className='flex-1 flex-col justify-between'>
          <View className='w-11/12 mt-8 flex-row justify-between mx-auto'>
            <View className='w-[176px] h-[208px] overflow-hidden rounded-lg border-[2px]'>
              <Image source={images.dadPayment} resizeMode='cover' className='w-full h-full' />
            </View>
            <View className='w-[176px] h-[208px] overflow-hidden rounded-lg border-[2px]'>
              <Image source={images.momPayment} resizeMode='cover' className='w-full h-full' />
            </View>
          </View>
          <View className='w-10/12 mx-auto mt-8 h-1/2'>
            <Image source={images.genPayment1} resizeMode='contain'
              className='w-[110px] h-[168px] z-10 absolute top-0 left-0' />
            <Image source={images.genPayment2} resizeMode='contain'
              className='w-[131px] h-[196px] absolute top-0 right-0 z-0' />
            <Image source={images.genPayment3} resizeMode='contain'
              className='w-[105px] h-[152px] absolute bottom-0 left-0 z-30' />
            <Image source={images.genPayment4} resizeMode='contain'
              className='w-[101] h-[152] absolute right-4 bottom-0 z-10' />
            <Image source={images.genPayment5} resizeMode='cover'
              className='w-1/2 h-1/2 absolute top-1/2 left-1/2 z-20 border-[2px] rounded-lg'
              style={{ transform: [{ translateX: -w / 2 }, { translateY: -h / 2 }] }}
              onLayout={(e) => { setW(e.nativeEvent.layout.width); setH(e.nativeEvent.layout.height) }}
            />
          </View>
        </View>
        <TouchableOpacity className='w-[161px] rounded-2xl border bg-white mx-auto mt-8'>
          <Text className='w-full text-center text-3xl font-medium py-2' onPress={() => router.push('/about2')}>
            Continue
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default about1;
