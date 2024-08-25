import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, Button } from 'react-native'
import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/assets/images';
import Add from '@/assets/icons/add';
import DownLoad from '@/assets/icons/download';
import ButtonStart from '@/components/ButtonStart';
import Loader from '@/components/Loader';
import { GlobalContext } from '@/context/GlobalProvider';
import HisUpload from '@/components/HisUpload';
import { handleGenerate } from '@/service/image';
import DetailImg from '@/components/DetailImg';

const Generator = () => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDetail, setIsDetail] = useState(false);
    const [pic, setPic] = useState('img1');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [srcSwap, setSrcSwap] = useState({ img1: '', img2: '' });
    const [result, setResult] = useState('');
    const { user } = useContext(GlobalContext);
    const handleUploadFace = (img: any) => {
        const src = `/var/www/build_futurelove/${img.replace(
            "https://photo.gachmen.org/",
            ""
        )}`;
        if (pic === 'img1') {
            setImg1(img);
            setSrcSwap({ ...srcSwap, img1: src });
            return;
        }
        if (pic === 'img2') {
            setImg2(img);
            setSrcSwap({ ...srcSwap, img2: src });
            return;
        }
    }
    const handleSwap = async () => {
        if (!srcSwap.img1 || !srcSwap.img2) {
            alert('Please upload two photos');
            return;
        }
        if (srcSwap.img1 === srcSwap.img2) {
            alert('Please upload two different photos');
            return;
        }
        setLoading(true);
        try {
            const result = await handleGenerate(user, srcSwap);
            // console.log(result.data.sukien_baby[0].link_da_swap);
            setResult(result.data.sukien_baby[0].link_da_swap);
            setLoading(false);
        } catch (err) {
            alert(err);
            setLoading(false);
        }
    }
    return (
        <SafeAreaView className='w-full h-full bg-white'>
            <ScrollView className='px-5'>
                <Text>Create photos of 7-15 year old children from parents photos</Text>
                <View className='flex-row w-full justify-between mt-8'>
                    {
                        img1 ? (
                            <View className='w-[180px] h-[270px]'>
                                <Image source={{ uri: img1 }} className='w-full h-full object-cover' />
                            </View>
                        ) : (
                            <TouchableOpacity className='relative w-[180px] h-[270px]' onPress={() => {
                                setIsOpen(true);
                                setPic('img1');
                            }}>
                                <Image source={images.father} className='w-full h-full object-cover' />
                                <View className='absolute right-0 bottom-0 top-0 left-0 w-full h-full justify-center items-center'>
                                    <Add />
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    {
                        img2 ? (
                            <View className='w-[180px] h-[270px]'>
                                <Image source={{ uri: img2 }} className='w-full h-full object-cover' />
                            </View>
                        ) : (
                            <TouchableOpacity className='relative w-[180px] h-[270px]' onPress={() => { setIsOpen(true); setPic('img2') }}>
                                <Image source={images.mother} className='w-full h-full object-cover' />
                                <View className='absolute right-0 bottom-0 top-0 left-0 w-full h-full justify-center items-center'>
                                    <Add />
                                </View>
                            </TouchableOpacity>
                        )
                    }
                </View>
                <ButtonStart onPress={handleSwap}  />
                <View className='mt-8 flex-col justify-start items-end'>
                    <DownLoad />
                    <View className='w-full h-[220px] mt-4'>
                        {
                            result ? (
                                <Image source={{ uri: result }} className='w-full h-full object-contain' resizeMode='contain'/>
                            ) : (
                                <View className='w-full h-full justify-center items-center bg-[#C3B9B9]'>
                                    <Loader isLoading={loading} />
                                </View>
                            )
                        }
                    </View>
                </View>
            </ScrollView>
            <HisUpload isOpen={isOpen} handleClose={() => setIsOpen(false)} handleUploadFace={handleUploadFace} />
                {/* <DetailImg onDetail={() => setIsDetail(false)} img={result}/> */}
        </SafeAreaView>
    )
}

export default Generator