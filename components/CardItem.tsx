import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useContext } from "react";
import images from "@/assets/images";
import { Link, router } from "expo-router";
import { GlobalContext } from "@/context/GlobalProvider";

const CardItem = ({ img, title }: { img: any; title: string }) => {
  const {user} = useContext(GlobalContext);
  return (
    <TouchableOpacity
      onPress={() => {
        if(!user){
          Alert.alert("Opp...!","Log in or register to explore unique features.");
          return;
        }
        if (title != "Generator" && title != "Profile"&&title != "New Born") {
          router.push(`/template/${title}`);
          return;
        } 
        if (title === "Generator"){
          router.push('/generator');
          return;
        }
        if (title === "New Born"){
          router.push('/newborn');
          return;
        }
        if (title === "Profile"){
          router.push('/profile');
          return;
        }

      }}
      className="w-[186px] h-[186px]"
    >
      <View className="relative w-full h-full rounded-lg overflow-hidden">
        <Image source={img} className="w-full h-full object-cover" />
        <View className="absolute bottom-0 w-full py-2 bg-[#FF7991] rounded-tl rounded-tr">
          <Text className="w-full text-center font-normal text-lg text-white">
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;
