import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import React, { useContext, useState } from "react";
import { GlobalContext } from "@/context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "@/components/Loader";
import { router } from "expo-router";
import { resetPassword } from "@/service/auth";
import images from "@/assets/images";

const signIn = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
  });

  const handleInput = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const handleForgotPass = async () => {
    if (data.email === "") {
      alert("Please enter your email");
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("ip_register", "");
      formData.append("device_register", "");
      formData.append(
        "link_avatar",
        `https://a0.anyrgb.com/pngimg/1236/14/no-facial-features-no-avatar-no-eyes-expressionless-avatar-icon-delayering-avatar-user-avatar-men-head-portrait-thumbnail.png?fbclid=IwAR3IUCAOlBSThvKijmWXmNuZk-6oEe1q6k-oGQXGr_zd1zWixMIUfAaAyfw`
      );
      await resetPassword(formData)
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          setLoading(false);
        })
        .catch((err) => {
          // console.log(err);
          alert(err);
          setLoading(false);
        });
    }
  };

  return (
    <ImageBackground
      source={images.bgTalet}
      className="h-full w-full"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 w-full h-full items-center mt-10">
          <TextInput
            onChangeText={(text) => handleInput("email", text)}
            placeholder="Email"
            placeholderTextColor={"#ccc"}
            className="text-black text-xl border rounded-lg mt-4 w-4/5 py-4 px-4 items-center md:text-3xl md:max-w-[700px] bg-white"

          />
          <TouchableOpacity
            onPress={handleForgotPass}
            className="w-4/5 py-4 bg-black rounded justify-center items-center my-3 md:max-w-[700px] mt-3"
          >
            <Text className="text-xl text-white md:text-3xl">Reset</Text>
          </TouchableOpacity>
        </View>

        <Loader isLoading={loading} />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default signIn;
