import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardItem from "@/components/CardItem";
import images from "@/assets/images";
import { router } from "expo-router";
import { GlobalContext } from "@/context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResizeMode, Video } from "expo-av";
import videos from "@/assets/videos";

const index = () => {
  const { user, handleSignOut } = useContext(GlobalContext);
  const data = [
    { id: "0", img: images.cardItem1, title: "Generator" },
    { id: "1", img: images.cardItem2, title: "New Born" },
    { id: "2", img: images.cardItem3, title: "Time Machine" },
    { id: "3", img: images.cardItem4, title: "Profile" },
    { id: "4", img: images.cardItem5, title: "Dad & Mom" },
    { id: "5", img: images.cardItem6, title: "Kid & Mom" },
  ];
  return (
    <SafeAreaView>
      <View className="w-fit mx-auto">
        <FlatList
          className="w-fit h-full"
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ gap: 8 }}
          columnWrapperStyle={{ gap: 8 }}
          ListHeaderComponent={() => {
            return (
              <View className="py-6">
                <Text className="font-semibold text-3xl text-center">
                  Wacth me grow
                </Text>
                <Text className="text-2xl font-bold mt-3">
                  About us
                </Text>
                <Video 
                  source={ videos.intro}
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping
                  shouldPlay
                  isMuted={true}
                  className="w-full h-[180px] bg-black mt-2 rounded-lg"
                />
              </View>
            );
          }}
          renderItem={({ item }) => (
            <CardItem img={item.img} title={item.title} />
          )}
          ListFooterComponent={() => {
            if (!user) {
              return (
                <View className="py-6 flex-row justify-center gap-2">
                  <TouchableOpacity
                    className="flex-1 bg-black py-2 rounded-lg"
                    onPress={() => {
                      router.push("/sign-in");
                    }}
                  >
                    <Text className="text-white text-center font-normal text-lg">
                      Sign In
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-1 bg-black py-2 rounded-lg"
                    onPress={() => {
                      router.push("/sign-up");
                    }}
                  >
                    <Text className="text-white text-center font-normal text-lg">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }

            return (
              <>
                <TouchableOpacity
                  className="flex-1 bg-black py-2 rounded-lg mt-6"
                  onPress={()=>{
                    Alert.alert('Sign Out', 'Are you sure?', [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: handleSignOut},
                    ]);
                  }}
                >
                  <Text className="text-white text-center font-normal text-lg">Sign Out</Text>
                </TouchableOpacity>
              </>
            )

          }
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default index;
