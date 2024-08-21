import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardItem from "@/components/CardItem";
import images from "@/assets/images";
import { router } from "expo-router";
import { GlobalContext } from "@/context/GlobalProvider";

const index = () => {
  const { user } = useContext(GlobalContext);
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
                    className="flex-1 bg-black py-2 rounded-tl-lg rounded-tr-lg"
                    onPress={() => {
                      router.push("/sign-in");
                    }}
                  >
                    <Text className="text-white text-center font-normal text-lg">
                      Sign In
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-1 bg-black py-2 rounded-tl-lg rounded-tr-lg"
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
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default index;
