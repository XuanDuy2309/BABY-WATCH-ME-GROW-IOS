import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import images from '@/assets/images';
// import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';
import { GlobalContext } from '@/context/GlobalProvider';
import { getHisUpload, uploadImage } from '@/service/image';
import Loader from './Loader';
import * as FileSystem from 'expo-file-system';
import { ImagePickerOptions } from 'expo-image-picker';



const HisUpload = ({ isOpen, handleClose, handleUploadFace }: { isOpen: boolean, handleClose: () => void, handleUploadFace: (img: any) => void }) => {
    const { user } = useContext(GlobalContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const openPicker = async () => {
        const result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
          });

        if (!result.canceled) {
            setLoading(true);
            console.log(result.assets[0].type);
            const formData = new FormData();

            formData.append('src_img', {
                uri: result.assets[0].uri,
                type: result.assets[0].mediaTypes || result.assets[0].type,
                name: 'image.jpg',
            } as any);
            console.log("formData", formData);
            try {
                const result = await uploadImage(formData, user);
                if(result.data.message) {
                    alert(result.data.message);
                    setLoading(false);
                    handleClose();
                    return;
                }
                handleUploadFace(result.data);
                handleClose();
                setLoading(false);

            } catch (err) {
                alert(err);
                console.log(err);
                setLoading(false);
            }


        } else {
            setTimeout(() => {
                Alert.alert("Document picked", JSON.stringify(result, null, 2));
            }, 100);
        }
    };


    const fetchData = async () => {
        if (user) {
            try {
                setLoading(true);
                const res = await getHisUpload(user.id_user);
                setData(res.data.image_links_video);
                // console.log(res.data.image_links_video);
                setLoading(false);
            } catch (err) {
                alert(err);
                setLoading(false);
            }
        }
    }
    useEffect(() => {
        fetchData()
    }, []);
    if (isOpen) {
        return (
            <View className='w-full h-full justify-center items-center  absolute top-0 left-0 right-0'>
                <View className='w-full h-fit bg-white mt-6 p-4 border rounded-3xl'>
                    <View className='flex-row justify-between'>
                        <Text className='text-2xl font-bold'>Upload your photos</Text>
                        <TouchableOpacity onPress={handleClose}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    {
                        data.length > 0 ? <ScrollView horizontal className='mt-4'>
                            {data.map((item, index) => {
                                return (
                                    <TouchableOpacity className='w-[180px] h-[270px] mr-4 rounded-lg overflow-hidden'
                                        key={index}
                                        onPress={() => {
                                            handleUploadFace(item);
                                            handleClose();
                                            console.log(item);  
                                        }}>
                                        <Image source={{ uri: item }} className='w-full h-full object-cover' />
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView> : <View className='w-full h-[270px] justify-center items-center'>
                            <Text>No photo yet!</Text>
                            <Text>Pls add new face!</Text>
                        </View>
                    }


                    <TouchableOpacity className='w-full justify-center items-center mt-4 p-4 bg-[#FF7991] rounded-xl' 
                    onPress={openPicker}
                    >
                        <Text className='text-lg text-white font-bold'>Upload new face</Text>
                    </TouchableOpacity>

                </View>
                <Loader isLoading={loading} />
            </View>

        )
    }
    return <></>
}

export default HisUpload