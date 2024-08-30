import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import Loader from './Loader'

const DetailImg = ({img,onDetail,isDetail}:{img:string,onDetail:()=>void,isDetail:boolean}) => {
    const [loading,setLoading] = useState(false);
    const openPicker = () => {}

  if (!isDetail) {
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
                    {
                        img?<View><Image source={{uri:img}} resizeMode='contain' className='w-full h-full'/></View>: <View className='w-full h-[270px] justify-center items-center'>
                            <Text>No photo yet!</Text>
                            <Text>Pls add new face!</Text>
                        </View>
                    }

                </View>
                <Loader isLoading={loading} />
            </View>
  )
}

export default DetailImg