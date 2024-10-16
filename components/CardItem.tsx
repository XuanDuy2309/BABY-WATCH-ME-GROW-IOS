import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import images from "@/assets/images";
import { Link, router } from "expo-router";
import { GlobalContext } from "@/context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CardItem = ({ img, title }: { img: any; title: string }) => {
  const {user,handleShowAds} = useContext(GlobalContext);

  const storage = AsyncStorage.getItem("user");
  return (
    <TouchableOpacity
      onPress={() => {
        // router.navigate('/about1');
        if(!user){
          Alert.alert("Opp...!","Log in or register to explore unique features.",[
            {
              text: "Cancel",
              // onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => router.navigate("/signIn") },
          ]);
          return;
        }
        // if (!user){
        //   storage.then((data) => handleSetUser(data ? JSON.parse(data) : null));
        // }
        if (title != "Generator" && title != "Profile"&&title != "New Born") {
          router.navigate(`/template/${title}`);
          handleShowAds();
          return;
        } 
        if (title === "Generator"){
          handleShowAds();
          router.navigate('/generator');
          return;
        }
        if (title === "New Born"){
          router.navigate('/newborn');
          handleShowAds();
          return;
        }
        if (title === "Profile"){
          router.navigate('/profile');
          handleShowAds();
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
