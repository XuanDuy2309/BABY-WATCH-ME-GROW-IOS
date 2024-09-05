import { View, Text, Image } from "react-native";
import React, { useContext } from "react";
import images from "@/assets/images";
import { Link, router } from "expo-router";
import { GlobalContext } from "@/context/GlobalProvider";
import { TouchableOpacity } from "react-native-gesture-handler";

const item1 = ({ title }: { title: any }) => {
  const {handleShowAds} = useContext(GlobalContext);
  if (title == "item1") {
    return (
      <View className="flex-1 relative w-full h-full">
        <Image source={images.intro1} className="w-full h-full object-cover" />
        <Text className="absolute right-0 top-44 px-4 py-3 bg-white font-bold text-3xl">
          Create baby photos
        </Text>
      </View>
    );
  }
  if (title == "item2") {
    return (
      <View className="flex-1 relative w-full h-full">
        <Image source={images.intro2} className="w-full h-full object-cover" />
        <Text className="absolute right-0 top-16 px-4 py-3 bg-white font-bold text-3xl w-[172px]">
          Create photos of your baby's growth process
        </Text>
      </View>
    );
  }
  if (title == "item3") {
    return (
      <View className="flex-1 relative w-full h-full">
        <Image source={images.intro3} className="w-full h-full object-cover" />
        <Text className="absolute right-0 top-0 px-4 py-3 bg-white font-bold text-3xl w-[286px]">
          Create a photo of the husband and pregnant wife
        </Text>
      </View>
    );
  }
  if (title == "item4") {
    return (
      <View className="flex-1 relative w-full h-full">
        <Image source={images.intro4} className="w-full h-full object-cover" />
        <Text className="absolute right-0 bottom-40 px-4 py-3 bg-white font-bold text-3xl ">
          create couple photos
        </Text>
      </View>
    );
  }
  if (title == "item5") {
    return (
      <View className="flex-1 relative w-full h-full">
        <Image source={images.intro5} className="w-full h-full object-cover" />
        <Text className="absolute right-0 top-16 px-4 py-3 bg-white font-bold text-3xl">
          create family photos
        </Text>
        <View className="absolute w-full bottom-24">
          <TouchableOpacity
            onPress={()=>{
              router.push('/(home)')
              handleShowAds();
            }}
            className="px-7 py-3 rounded-lg opacity-50 bg-black  mx-auto"
          >
            <Text className="text-white font-bold text-xl">Get start</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default item1;
