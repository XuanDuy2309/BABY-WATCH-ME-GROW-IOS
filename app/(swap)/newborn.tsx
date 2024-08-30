import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { GlobalContext } from '@/context/GlobalProvider';
import Add from '@/assets/icons/add';
import ButtonStart from '@/components/ButtonStart';
import Loader from '@/components/Loader';
import HisUpload from '@/components/HisUpload';
import images from '@/assets/images';
import DownLoad from '@/assets/icons/download';
import { handleNewBorn } from '@/service/image';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { withTiming, Easing, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import DetailProduct from '@/components/DetailProduct';
import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

const NewBorn = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [pic, setPic] = useState('img1');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [srcSwap, setSrcSwap] = useState({ img1: '', img2: '' });
  const [result, setResult] = useState([]);
  const [positions, setPositions] = useState(0);
  const [wid, setWid] = useState(0);
  const { user } = useContext(GlobalContext);



  const handleNext = () => {
    if (positions < result.length - 1) {
      setPositions(positions + 1);
    } else {
      setPositions(0);
    }
  }

  const handlePrev = () => {
    if (positions > 0) {
      setPositions(positions - 1);
    } else {
      setPositions(result.length - 1);
    }
  }

  const handleUploadFace = (img: any) => {
    const src = `${img.replace(
      "https://photo.gachmen.org/",
      "/var/www/build_futurelove/"
    )}`;
    const prevImg = `${img.replace(
      "/var/www/build_futurelove/",
      "https://photo.gachmen.org/"
    )}`;
    if (pic === 'img1') {
      setImg1(prevImg);
      // console.log(prevImg);
      setSrcSwap({ ...srcSwap, img1: src });
      return;
    }
    if (pic === 'img2') {
      setImg2(prevImg);
      // console.log(prevImg);
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
      setImg1('');
      setImg2('');
      return;
    }
    setLoading(true);
    try {
      const result = await handleNewBorn(user, srcSwap);
      setResult(result.data.link_anh_swap);

      setLoading(false);
    } catch (err) {
      alert(err);
      setLoading(false);
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

  const handleStartDownload = async (resultList: string[]) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'You need to grant media library permissions to save images.');
      return;
    }

    const promises = resultList.map(async (result: string) => {
      try {
        const fileExtension = '.jpg'; // Adjust this if your URLs are not JPEG images
        const fileUri = `${FileSystem.documentDirectory}me_${Math.floor(Date.now())}${fileExtension}`;
        const downloadResult = await FileSystem.downloadAsync(result, fileUri);

        const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
        await MediaLibrary.createAlbumAsync('MyImages', asset, false);

        console.log(`Image saved to Photos: ${asset.uri}`);
        return asset.uri;
      } catch (error: any) {
        console.error(`Failed to download ${result}:`, error.message);
        throw error;
      }
    });


    Alert.alert('Download', 'Do you want to download the image?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            const results = await Promise.all(promises);
            Alert.alert('Success', 'Images have been saved successfully to your Photos.');
            console.log('Saved images:', results);
          } catch (error: any) {
            Alert.alert('Error', `Something went wrong: ${error.message}`);
            console.log(error.message);
          }
        },
      },
    ])
  };
  const handleDown = () => {
    console.log("press");
    if (!result || !Array.isArray(result)) {
      Alert.alert('Error', 'Please wait for the result or ensure it is an array.');
      return;
    }
    handleStartDownload(result);
  };
  return (
    <SafeAreaView className='w-full h-full bg-white'>
      <ScrollView className='px-5'>
        <Text>Create a photo of a 0-3 month old baby from a photo of the parents</Text>
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
        <ButtonStart onPress={handleSwap} />
        <View className='mt-8 flex-col justify-start items-end'>
          <TouchableOpacity onPress={handleDown}>
            <DownLoad />
          </TouchableOpacity>
          <View className='w-full h-[220px] mt-4 bg-[#C3B9B9] overflow-hidden relative' onLayout={(e) => {
            const width = e.nativeEvent.layout.width;
            setWid(width);
          }}
          >
            {
              result.length > 0 ? (
                <>

                  <Animated.View
                    className={`w-full h-full flex-row flex-shrink-0 `}
                    style={animatedStyle}
                  >
                    {
                      result.map((item, index) => {
                        return (
                          <TouchableOpacity key={index} className='relative w-full h-full' onPress={() => { setIsDetail(true) }}>
                            <Image source={{ uri: item }} className='w-full h-full object-contain' />
                          </TouchableOpacity>
                        )
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
                </>
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
      <DetailProduct onDetail={() => setIsDetail(false)} img={result} isDetail={isDetail} />
    </SafeAreaView>
  )
}

export default NewBorn