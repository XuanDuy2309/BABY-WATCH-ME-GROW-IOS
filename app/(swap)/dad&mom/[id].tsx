import { View, Text, ScrollView, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { GlobalContext } from '@/context/GlobalProvider';
import Add from '@/assets/icons/add';
import ButtonStart from '@/components/ButtonStart';
import Loader from '@/components/Loader';
import HisUpload from '@/components/HisUpload';
import DetailImg from '@/components/DetailImg';
import images from '@/assets/images';
import DownLoad from '@/assets/icons/download';
import { handleDadAndMom, handleNewBorn } from '@/service/image';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { withTiming, Easing, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { ResizeMode, Video } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import ProgressCircle from '@/components/ProgressCircle';

const DadAndMom = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [pic, setPic] = useState('img1');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [srcSwap, setSrcSwap] = useState({ img1: '', img2: '' });
  const [result, setResult] = useState('');
  const [srcDetail, setSrcDetail] = useState('');
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
    const randomKey = Math.random() < 0.5 ? 'img1' : 'img2';
    const randomLink = srcSwap[randomKey];
    // console.log(randomLink);
    setLoading(true);
    try {
      const res = await handleDadAndMom(user, randomLink, id);
      const str = res.data.sukien_video.link_vid_da_swap
      const url = str.replace('/var/www/build_futurelove/', "https://photo.gachmen.org/");
      setResult((prev) => prev = url);
      // console.log(res.data);

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
    <ImageBackground
      source={images.bgTalet}
      className="h-full w-full"
      resizeMode="cover"
    >
      <SafeAreaView className='w-full h-full'>
        <ScrollView className='px-5'>
          <Text className='md:w-full md:text-center md:text-xl md:font-normal'>Create a photo album for your baby from parents' photos</Text>
          <View className='flex-row w-full justify-between mt-8'>
            {
              img1 ? (
                <View className='w-[180px] h-[270px] md:w-[220px] md:h-[276px]'>
                  <Image source={{ uri: img1 }} className='w-full h-full object-cover' />
                </View>
              ) : (
                <TouchableOpacity className='relative w-[180px] h-[270px] md:w-[220px] md:h-[276px]' onPress={() => {
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
                <View className='w-[180px] h-[270px] md:w-[220px] md:h-[276px]'>
                  <Image source={{ uri: img2 }} className='w-full h-full object-cover' />
                </View>
              ) : (
                <TouchableOpacity className='relative w-[180px] h-[270px] md:w-[220px] md:h-[276px]' onPress={() => { setIsOpen(true); setPic('img2') }}>
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
              <DownLoad width={44} height={44}/>
            </TouchableOpacity>
            <View className='w-full h-[220px] md:h-[440px] rounded mt-4 bg-[#C3B9B9] overflow-hidden relative' onLayout={(e) => {
              const width = e.nativeEvent.layout.width;
              setWid(width);
            }} >
              {
                result !== '' ? (
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
                ) : (
                  <View className='w-full h-full justify-center items-center bg-[#C3B9B9]'>
                    <ProgressCircle loading={loading} />
                  </View>
                )
              }
            </View>
          </View>
        </ScrollView>
        <HisUpload isOpen={isOpen} handleClose={() => setIsOpen(false)} handleUploadFace={handleUploadFace} />
      </SafeAreaView>
    </ImageBackground>
  )
}

export default DadAndMom