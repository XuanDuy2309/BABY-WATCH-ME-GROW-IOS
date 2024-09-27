import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import React, { useContext, useState } from "react";
import { GlobalContext } from "@/context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "@/components/Loader";
import { router } from "expo-router";
import CheckBox from "@/components/CheckBox";
import images from "@/assets/images";


const signIn = () => {
  const { handleSignIn, user, isLoading } = useContext(GlobalContext);
  const [isChecked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    email_or_username: "",
    password: "",
  });

  const handleInput = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  return (
    <ImageBackground
      source={images.bgTalet}
      className="h-full w-full"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 w-full h-full justify-start items-center mt-10">
          <TextInput
            onChangeText={(text) => handleInput("email_or_username", text)}
            placeholder="Email or Username"
            placeholderTextColor={"#ccc"}
            className="text-black text-xl border rounded-lg mt-4 w-4/5 py-4 px-4 items-center md:text-3xl md:max-w-[700px] bg-white"
          />
          <TextInput
            onChangeText={(text) => handleInput("password", text)}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor={"#ccc"}
            className="text-black text-xl border rounded-lg mt-4 w-4/5 py-4 px-4 items-center md:text-3xl md:max-w-[700px] bg-white"

          />
          <View className="mt-4 w-4/5 flex-row justify-between items-center md:max-w-[700px]">
            <View className="flex-row items-center h-6">
              <CheckBox onChange={() => setChecked(!isChecked)} checked={isChecked} />
              <Text className="ml-2 md:text-xl">Remember to log in</Text>
            </View>
            <TouchableOpacity
              className="h-full"
              onPress={() => {
                router.navigate("/forgot");
              }}
            >
              <Text className="font-bold md:text-xl">Forgot password!</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => handleSignIn(formData)}
            className="w-4/5 p-4 bg-black rounded justify-center items-center my-3 md:max-w-[700px]"
          >
            <Text className="text-xl text-white md:text-3xl">Sign in</Text>
          </TouchableOpacity>

          <View className="w-4/5 flex-row gap-1 items-center md:max-w-[700px]">
            <Text className="md:text-lg">Dont have account?</Text>
            <TouchableOpacity
              onPress={() => {
                router.navigate("/signUp");
              }}
            >
              <Text className="font-bold text-base md:text-xl">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Loader isLoading={isLoading} />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default signIn;
