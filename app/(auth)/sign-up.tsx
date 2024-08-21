import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import Loader from "@/components/Loader";
import { router } from "expo-router";
import { GlobalContext } from "@/context/GlobalProvider";
import Checkbox from "expo-checkbox";

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
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 w-full h-full items-center mt-10">
        <TextInput
          onChangeText={(text) => handleInput("user_name", text)}
          placeholder="Username"
          placeholderTextColor={"#ccc"}
          className="text-black text-lg border w-4/5 rounded-lg p-4 mt-4"
        />
        <TextInput
          onChangeText={(text) => handleInput("email", text)}
          placeholder="Email"
          placeholderTextColor={"#ccc"}
          className="text-black text-lg border w-4/5 rounded-lg p-4 mt-2"
        />
        <TextInput
          onChangeText={(text) => handleInput("password", text)}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor={"#ccc"}
          className="text-black text-lg border w-4/5 rounded-lg p-4 mt-2"
        />
        <TextInput
          onChangeText={(text) => handleInput("confirm_password", text)}
          placeholder="Confirm password"
          secureTextEntry={true}
          placeholderTextColor={"#ccc"}
          className="text-black text-lg border w-4/5 rounded-lg p-4 mt-2"
        />
        <View className="flex-row gap-2 items-center w-4/5 mt-4">
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#4630EB" : undefined}
          />
          <Text>I agree to the terms & policy</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleSignUp(formData)}
          className="w-4/5 h-11 bg-black rounded justify-center items-center my-3"
        >
          <Text className="text-xl text-white ">Sign up</Text>
        </TouchableOpacity>

        <View className="w-4/5 flex-row gap-1 items-center">
          <Text>Have account?</Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/sign-in");
            }}
          >
            <Text className="font-bold text-base">Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Loader isLoading={isLoading} />
    </SafeAreaView>
  );
};

export default signUp;
