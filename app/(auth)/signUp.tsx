import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useContext, useState } from "react";
import Loader from "@/components/Loader";
import { router } from "expo-router";
import { GlobalContext } from "@/context/GlobalProvider";
import CheckBox from "@/components/CheckBox";
import images from "@/assets/images";


const signUp = () => {
  const { handleSignUp, isLoading } = useContext(GlobalContext);
  const [isChecked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
    ip_register: "",
    device_register: "",
    link_avatar: "",
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
        <View className="flex-1 w-full h-full items-center mt-10">
          <TextInput
            onChangeText={(text) => handleInput("user_name", text)}
            placeholder="Username"
            placeholderTextColor={"#ccc"}
            className="text-black text-xl border rounded-lg mt-4 w-4/5 py-4 px-4 items-center md:text-3xl md:max-w-[768px] bg-white"

          />
          <TextInput
            onChangeText={(text) => handleInput("email", text)}
            placeholder="Email"
            placeholderTextColor={"#ccc"}
            className="text-black text-xl border rounded-lg mt-4 w-4/5 py-4 px-4 items-center md:text-3xl md:max-w-[768px] bg-white"

          />
          <TextInput
            onChangeText={(text) => handleInput("password", text)}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor={"#ccc"}
            className="text-black text-xl border rounded-lg mt-4 w-4/5 py-4 px-4 items-center md:text-3xl md:max-w-[768px] bg-white"

          />
          <TextInput
            onChangeText={(text) => handleInput("confirm_password", text)}
            placeholder="Confirm password"
            secureTextEntry={true}
            placeholderTextColor={"#ccc"}
            className="text-black text-xl border rounded-lg mt-4 w-4/5 py-4 px-4 items-center md:text-3xl md:max-w-[768px] bg-white"

          />
          <View className="flex-row items-center w-4/5 mt-4 md:max-w-[768px]">
            <CheckBox checked={isChecked} onChange={() => setChecked(!isChecked)} />
            <Text className="ml-2 md:text-xl">I agree to the terms & policy</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleSignUp(formData, isChecked)}
            className="w-4/5 py-4 bg-black rounded justify-center items-center my-3 md:max-w-[768px]"
          >
            <Text className="text-xl text-white md:text-4xl ">Sign up</Text>
          </TouchableOpacity>

          <View className="w-4/5 flex-row gap-1 items-center md:max-w-[768px]">
            <Text className="md:text-lg">Have account?</Text>
            <TouchableOpacity
              onPress={() => {
                router.navigate("/signIn");
              }}
            >
              <Text className="font-bold text-base md:text-xl">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Loader isLoading={isLoading} />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default signUp;
