import { View, Text, ScrollView, TouchableOpacity, Image, Alert, ImageBackground, Dimensions } from 'react-native'
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
import ProgressCircle from '@/components/ProgressCircle';
import { router } from 'expo-router';

const { width } = Dimensions.get('screen');

const NewBorn = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [idSukien, setIdSukien] = useState();
  const [pic, setPic] = useState('img1');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [srcSwap, setSrcSwap] = useState({ img1: '', img2: '' });
  const [result, setResult] = useState([]);
  const [positions, setPositions] = useState(0);
  const [wid, setWid] = useState(0);
  const [isDetail, setIsDetail] = useState(false);
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
      const {data} = await handleNewBorn(user, srcSwap);
      setResult(data.link_anh_swap);
      setIdSukien(data.sukien_2_image.id_saved);
      console.log(data.sukien_2_image);

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

    Alert.alert('Download', 'Do you want to download the images?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            const promises = resultList.map(async (result: string) => {
              const fileExtension = '.jpg'; // Adjust this if your URLs are not JPEG images
              const fileUri = `${FileSystem.documentDirectory}me_${Math.floor(Date.now())}${fileExtension}`;
              const downloadResult = await FileSystem.downloadAsync(result, fileUri);

              const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
              await MediaLibrary.createAlbumAsync('MyImages', asset, false);

              // console.log(`Image saved to Photos: ${asset.uri}`);
              return asset.uri;
            });

            const results = await Promise.all(promises);
            Alert.alert('Success', 'Images have been saved successfully to your Photos.');
            console.log('Saved images:', results);
          } catch (error: any) {
            Alert.alert('Error', `Something went wrong: ${error.message}`);
            console.error(error.message);
          }
        },
      },
    ]);
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
    <ImageBackground
      source={images.bgTalet}
      resizeMode="cover"
      className='h-full w-full'
    >
      <SafeAreaView className='w-full h-full'>
        <ScrollView className='px-5'>
          <Text className='md:w-full md:text-center md:text-xl md:font-normal'>Create a photo of a 0-3 month old baby from a photo of the parents</Text>
          <View className='flex-row w-full justify-center space-x-5 md:space-x-8 mt-8'>
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
              <DownLoad width={44} height={44} />
            </TouchableOpacity>
            <View className='w-full h-[220px] md:h-[440px] rounded mt-4 bg-[#C3B9B9] overflow-hidden relative' onLayout={(e) => {
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
                        result.map((item: any, index) => {
                          const str = item;
                          const url = str.replace('/var/www/build_futurelove/', "https://photo.gachmen.org/");
                          return (
                            <TouchableOpacity key={index} className='relative w-full h-full' onPress={() => { 
                              router.navigate('/detail/newborn')
                              router.setParams({id_sukien: idSukien})
                              // setIsDetail(true);

                             }}>
                              <Image source={{ uri: url }} className='w-full h-full object-contain' />
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
                    <ProgressCircle loading={loading} width={width>=768? 768*0.9 : width*0.9}/>
                  </View>
                )
              }
            </View>
          </View>
        </ScrollView>
        <HisUpload isOpen={isOpen} handleClose={() => setIsOpen(false)} handleUploadFace={handleUploadFace} />
        {/* <DetailProduct onDetail={() => setIsDetail(false)} img={result} isDetail={isDetail} /> */}
      </SafeAreaView>
    </ImageBackground>
  )
}

export default NewBorn