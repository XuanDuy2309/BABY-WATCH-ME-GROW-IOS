import images from '@/assets/images';
import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { View, Button, Text, ImageBackground, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { requestPurchase, getProducts, initConnection, endConnection } from 'react-native-iap';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import CheckBox from '@/components/CheckBox';
import { GlobalContext } from '@/context/GlobalProvider';

const itemSkus = ['BABYWATCHMEGROWIOS.3usd', ''];

const about1 = () => {
    const {handleSetCount} = useContext(GlobalContext);
    const [w, setW] = useState(0);
    const [h, setH] = useState(0);
    const [autoPay, setAutoPay] = useState(false);
    const [isPay, setIsPay] = useState(false);
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
      // Kết nối với store
      const initializeIAP = async () => {
        try {
          await initConnection();
          const availableProducts = await getProducts({skus: itemSkus});
          setProducts(availableProducts);
        } catch (err:any) {
          console.warn(err.code, err.message);
        }
      };

      initializeIAP();

      return () => {
        // Ngắt kết nối khi không dùng nữa
        endConnection();
      };
    }, []);

    const buyProduct = async (sku:any) => {
      try {
        await requestPurchase({ sku }).catch((err:any) => {
            Alert.alert('Something went wrong', err.message);
            return;

        });

        handleSetCount(10);
        router.push('/(home)');
      } catch (err:any) {
        console.warn(err.code, err.message);
      }
    };

    return (
        <>
            <View className="w-full h-full flex-1 bg-white relative">
                <Image
                    source={images.bgPayment2}
                    resizeMode='contain'
                    className='w-full'
                />
                <View className='absolute bottom-0 left-0 right-0 w-full h-[70%] bg-black rounded-tl-[50px] rounded-tr-[50px] pt-8 px-4'>
                    <Text className='text-[#FC24B4] text-3xl font-bold text-center uppercase'>
                        For VIP member
                    </Text>
                    <View className='flex-row items-center mt-10 space-x-2'>
                        <AntDesign name="checkcircle" size={24} color="#00ba00" />
                        <Text className='text-white text-lg font-semibold'>Delete all advertising content</Text>
                    </View>
                    <View className='flex-row items-center mt-4 space-x-2'>
                        <AntDesign name="checkcircle" size={24} color="#00ba00" />
                        <Text className='text-white text-lg font-semibold'>$3 for 10 time machine uses and 20 image swaps</Text>
                    </View>
                    <View className='flex-row items-center mt-4 space-x-2'>
                        <AntDesign name="checkcircle" size={24} color="#00ba00" />
                        <Text className='text-white text-lg font-semibold'>Priority to use products of the ThinkAI ecosystem (creating wedding photos, reading comics, samnotes)</Text>
                    </View>
                    <View className='flex-row items-center mt-4 space-x-2'>
                        <AntDesign name="checkcircle" size={24} color="#00ba00" />
                        <Text className='text-white text-lg font-semibold'>Smart AI features help users develop long-term products</Text>
                    </View>

                    <TouchableOpacity
                        className='flex-row items-center mt-10 w-[288px] h-[50px] mx-auto border border-[#FC24B4] rounded-xl px-2 relative'
                        onPress={() => setIsPay(!isPay)}
                    >
                        <View
                            className={`w-[24px] h-[24px] rounded-full ${isPay ? 'bg-[#00ba00]' : ''} border-[2px] border-white absolute top-1/2 left-4`}
                            style={{ transform: [{ translateY: -12 }] }}
                        ></View>
                        <Text className='font-bold text-lg text-white flex-1 text-center'>Payment: $3</Text>
                    </TouchableOpacity>
                    <View className='flex-row items-center space-x-2 justify-center mt-2'>
                        <CheckBox
                            checked={autoPay}
                            onChange={() => setAutoPay(!autoPay)}
                        />
                        <Text className='font-bold text-xl text-white'>Automatic payments</Text>
                    </View>
                    <TouchableOpacity 
                    className='w-[161px] rounded-2xl bg-[#FC24B4] mx-auto mt-8'
                    onPress={() => {
                        if (isPay||autoPay) {
                            buyProduct(products[0].productId);
                        } else {
                            Alert.alert('Oppp....!','Please select payment method',[
                                {text:'Ok',onPress:()=>{setIsPay(true)}},
                                {
                                    text:'Cancel',
                                    style:'cancel'
                                }
                            ])
                        }
                    }}>
                        <Text className='w-full text-center text-3xl font-medium py-2 text-white'>
                            Continue
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='absolute bottom-10 right-10' onPress={()=>router.push('/(home)')}>
                        <Text className='text-white font-bold text-base underline'>
                            Skip
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default about1;
