import { View, Text, ImageBackground, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import images from '@/assets/images'
import { ResizeMode, Video } from 'expo-av'
import videos from '@/assets/videos'
import AddAbouts from '@/assets/icons/addAbouts'
import PlayIcon from '@/assets/icons/playIcon'
import AntDesign from '@expo/vector-icons/AntDesign';

const aboutUs = () => {
  const [wImage, setWImage] = useState(0);
  const [wIcon, setWIcon] = useState(0);

  return (
    <ImageBackground
      source={images.bgTalet}
      className="h-full w-full"
      resizeMode="cover"
    >
      <ScrollView className='h-full w-full py-4'>
        <View
          className='w-11/12 mx-auto md:max-w-[700px]'
        >
          <Video
            source={videos.intro}
            isMuted
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            className="w-full h-[160px] md:h-[320px] bg-black mt-2 rounded-lg"
          />
          <Text
            className='font-normal text-base mt-4 md:text-3xl'
          >
            Watchmegrow software is a software created by ThinkAI company, our development team has built an AI system based on your face to generate future images of your children, and will also generate videos of your children's growth. We have very high security requirements and do not store your faces, nor share or sell that data to anyone, the product is great. Main features
          </Text>
          <View
            className='w-full md:flex-row mt-4'
          >
            <Text
              className='font-bold text-lg w-full text-[#F67F94] md:text-4xl flex-1'
            >
              Generate photos of your future children.
            </Text>
            <View
              className={`w-full flex-1`}
              style={{ height: wImage * 2 }}
            >
              <View
                className='flex-row w-full justify-center'
              >
                <Image
                  source={images.dad}
                  onLayout={(e) => {
                    setWImage(e.nativeEvent.layout.width);
                    // console.log(e.nativeEvent.layout.width);
                  }}
                  className={`w-half mt-4 border rounded-lg`}
                  style={{ height: wImage }}
                  resizeMode='cover'
                />
                <Image
                  source={images.mom}
                  className={`w-half h-[${wImage}] mt-4 border rounded-lg`}
                  onLayout={(e) => setWImage(e.nativeEvent.layout.width)}
                  style={{ height: wImage }}
                  resizeMode='cover'
                />
                <View
                  className='absolute top-1/2 left-1/2'
                  onLayout={(e) => setWIcon(e.nativeEvent.layout.width)}
                  style={{ transform: [{ translateX: -wIcon / 2 }, { translateY: -wIcon / 2 }] }}
                >
                  <AddAbouts />
                </View>
              </View>
              <Image
                source={images.bbGen1}
                className={`w-half h-[${wImage}] rounded-full absolute bottom-8 right-[49%]`}
                resizeMode='cover'
              />
              <Image
                source={images.bbGen2}
                className={`w-half h-[${wImage}] rounded-full absolute bottom-8 left-[49%]`}
                resizeMode='cover'
              />
            </View>
          </View>
          <View
            className='w-full h-fit'
          >
            <Text
              className='font-bold text-lg w-full mt-4 text-[#F67F94] md:text-4xl'

            >
              Generate videos of your children's growth.
            </Text>
            <Image
              source={images.timeAbout}
              className="w-full mt-2 rounded-lg md:h-[332px]"
              resizeMode="cover"
            />
          </View>
          <View className='w-full flex-row mt-4'>
            <Text
              className='font-bold text-lg w-full text-[#F67F94] flex-1 md:text-4xl'

            >
              Generate newborn photos of your children.
            </Text>
            <Image source={images.newbornAbout} className='flex-1 rounded-lg md:h-[340px]' resizeMode='cover' />
          </View>
          <View
            className='w-full flex-row-reverse mt-4'
          >
            <View
              className='w-1/3 justify-center items-center'
            >
              <Text
                className='font-bold text-lg text-[#F67F94] md:text-4xl'
              >{`Generate photos of your future family (collection).`}</Text>
            </View>
            <View
              className='w-2/3'
            >
              <Image
                source={images.familyAbout2}
                className='w-full'
                resizeMode='cover'
              />
              <Image
                source={images.familyAbout1}
                className='w-full md:h-[244px]'
                resizeMode='cover'
              />
            </View>

          </View>
          <View
            className='w-full mt-4'
          >
            <Text
              className='font-bold text-lg w-full text-[#F67F94] md:text-4xl'
            >
              Generate funny videos of your children in the future.
            </Text>
            <View
              className='w-full relative'
            >
              <Image
                source={images.vidAbout}
                className="w-full mt-2 rounded-lg md:h-[348px]"
                resizeMode="cover"
              />
              <View className='absolute top-1/2 left-1/2'
                style={{ transform: [{ translateX: -wIcon / 2 }, { translateY: -wIcon / 2 }] }}
              >
                <PlayIcon />
              </View>

            </View>
            <View
              className='w-full flex-row items-center justify-center gap-2 py-10'
            >
              <AntDesign name="mail" size={24} color="black" />
              <Text
                className='font-bold text-lg text-[#000] md:text-2xl'
              >nguyendinhthanhiospro@gmail.com</Text>
            </View>
          </View>
        </View>

      </ScrollView>

    </ImageBackground>
  )
}

export default aboutUs