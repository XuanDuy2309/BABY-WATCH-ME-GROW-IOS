import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { GlobalContext } from "@/context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "@/components/Loader";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";

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
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 w-full h-full justify-start items-center">
        <TextInput
          onChangeText={(text) => handleInput("email_or_username", text)}
          placeholder="Email or Username"
          placeholderTextColor={"#ccc"}
          className="text-black text-lg border w-4/5 rounded-lg p-4 mt-4"
        />
        <TextInput
          onChangeText={(text) => handleInput("password", text)}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor={"#ccc"}
          className="text-black text-lg border w-4/5 rounded-lg p-4 mt-2"
        />
        <View className="mt-4 w-4/5 flex-row justify-between items-center">
          <View className="flex-row gap-2 items-center h-6">
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#4630EB" : undefined}
            />
            <Text>Remember to log in</Text>
          </View>
          <TouchableOpacity
            className="h-full"
            onPress={() => {
              router.push("/forgot");
            }}
          >
            <Text className="font-bold">Forgot password!</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => handleSignIn(formData)}
          className="w-4/5 h-11 bg-black rounded justify-center items-center my-3"
        >
          <Text className="text-xl text-white ">Sign in</Text>
        </TouchableOpacity>

        <View className="w-4/5 flex-row gap-1 items-center">
          <Text>Dont have account?</Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/sign-up");
            }}
          >
            <Text className="font-bold text-base">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Loader isLoading={isLoading} />
    </SafeAreaView>
  );
};

export default signIn;
