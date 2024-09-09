import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { GlobalContext } from '@/context/GlobalProvider';
import Add from '@/assets/icons/add';
import ButtonStart from '@/components/ButtonStart';
import Loader from '@/components/Loader';
import HisUpload from '@/components/HisUpload';
import DetailImg from '@/components/DetailImg';
import images from '@/assets/images';
import DownLoad from '@/assets/icons/download';
import { handleDadAndMom, handleNewBorn, handleTimeMachine } from '@/service/image';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { withTiming, Easing, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { ResizeMode, Video } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const TimeMachine = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pic, setPic] = useState('img1');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [srcSwap, setSrcSwap] = useState({ img1: '', img2: '' });
  const [result, setResult] = useState<string>('');
  const [wid, setWid] = useState(0);
  const { user } = useContext(GlobalContext);


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
      console.log(prevImg);
      setSrcSwap({ ...srcSwap, img1: src });
      return;
    }
    if (pic === 'img2') {
      setImg2(prevImg);
      console.log(prevImg);
      setSrcSwap({ ...srcSwap, img2: src });
      return;
    }
  }
  const handleSwap = async () => {
    // if (!srcSwap.img1 || !srcSwap.img2) {
    //   alert('Please upload two photos');
    //   return;
    // }
    // if (srcSwap.img1 === srcSwap.img2) {
    //   alert('Please upload two different photos');
    //   setImg1('');
    //   setImg2('');
    //   return;
    // }
    setLoading(true);
    try {
      const res = await handleTimeMachine(user, srcSwap, id);
      const str = res.data.sukien_video.link_vid_da_swap;
      const url = str.replace('/var/www/build_futurelove/', "https://photo.gachmen.org/");
      setResult((prev) => prev = url);
      console.log(res.data.sukien_video.link_vid_da_swap);

      setLoading(false);
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  }

  const handleStartDownload = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'You need to grant media library permissions to save images.');
      return;
    }
    Alert.alert('Download', 'Do you want to download the video?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            const fileExtension = '.mp4'; // Adjust this if your URLs are not JPEG images
            const fileUri = `${FileSystem.documentDirectory}me_${Math.floor(Date.now())}${fileExtension}`;
            const downloadResult = await FileSystem.downloadAsync(result, fileUri);

            const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
            await MediaLibrary.createAlbumAsync('MyVideos', asset, false);

            console.log(`Video saved to Photos: ${asset.uri}`);
            Alert.alert('Success', 'Video has been saved successfully to your Photos.');
            return asset.uri;
          } catch (error: any) {
            console.error(`Failed to download ${result}:`, error.message);
            throw error;
          }
        },
      },
    ])
  };

  const handleDown = () => {
    console.log("press")
    if (!result) {
      alert('Please wait for the result');
      return;
    }
    handleStartDownload();

  }

  return (
    <SafeAreaView className='w-full h-full bg-white'>
      <ScrollView className='px-5'>
        <Text>Create a video of your baby's growing process</Text>
        <View className='flex-row w-full justify-center mt-8'>
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
                <Image source={images.baby} className='w-full h-full object-cover' />
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
          }} >
            {
              result !== '' ?
                (
                  <>
                    <View className='w-full h-full justify-center items-center bg-[#C3B9B9]'>
                      <Video
                        source={{ uri: result }}
                        useNativeControls={true}
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        className="w-full h-full"
                      />
                    </View>
                  </>
                )
                : (
                  <View className='w-full h-full justify-center items-center bg-[#C3B9B9]'>
                    <Loader isLoading={loading} />
                  </View>
                )
            }
          </View>
        </View>
      </ScrollView>
      <HisUpload isOpen={isOpen} handleClose={() => setIsOpen(false)} handleUploadFace={handleUploadFace} />
    </SafeAreaView>
  )
}

export default TimeMachine