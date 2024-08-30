import { Dimensions, Text, View, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import images from "@/assets/images";
import Item from "./item";


const index = () => {
  const width = Dimensions.get("window").width;
  const heigth = Dimensions.get("window").height;
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = ["item1", "item2", "item3", "item4", "item5"]


  return (
    <SafeAreaView>
      <View className="relative h-full w-full">
        <Carousel
          loop={false}
          width={width}
          height={heigth}
          autoPlay={false}
          data={data}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => {
            setCurrentIndex(index);
          }}
          renderItem={({ item }) => { return (<Item title={item} />) }}
        />
        <View
          className={`flex-row justify-center py-2 absolute bottom-0 w-full`}
        >
          {data.map((item, index) => {
            return (
              <View
                key={index}
                className={`w-2.5 h-2.5 rounded-full  mx-2 ${index === currentIndex ? "bg-black" : "bg-[#D9D9D9] border"
                  }`}
              />
            );
          })}
        </View>
      </View>


    </SafeAreaView>
  );
};

export default index;
