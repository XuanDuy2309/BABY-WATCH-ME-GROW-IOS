import { Dimensions, Text, View, Image, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import images from "@/assets/images";
// import Item from "./item";
import { GlobalContext } from "@/context/GlobalProvider";
import { Redirect, router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import videos from "@/assets/videos";
// import { Analytics, PageHit } from 'react-native-googleanalytics';

// const analytics = new Analytics('UA-XXXXXX-Y');
// analytics.hit(new PageHit('Home'));

const { width } = Dimensions.get('screen');


const index = () => {
  const [w,setW] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useContext(GlobalContext);

  const data = ["item1", "item2", "item3", "item4", "item5"]

  if (user) {
    return <Redirect href="/(home)" />
  }


  return (
    <>
      <View className="flex-1 relative">
        <Video 
          source={width >= 768 ? videos.startAppTablet : videos.startAppMobile}
          shouldPlay
          className="w-full h-full"
          resizeMode={ResizeMode.COVER}
          isLooping
        />
        <TouchableOpacity
          className="absolute bottom-10 left-1/2 bg-[#FF7991] px-4 h-[42px] overflow-hidden rounded justify-center items-center"
          style={{ transform: [{ translateX: -w/2 }] }}
          onLayout={(e) => {
            setW(e.nativeEvent.layout.width);
          }}
          onPress={() => {
            router.replace("/about1")
          }}
        >
          <Text className="font-bold text-lg text-white">Get Started</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default index;
