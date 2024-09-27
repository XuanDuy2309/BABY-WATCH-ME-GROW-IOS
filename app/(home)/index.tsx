import { View, Text, FlatList, TouchableOpacity, Alert, Dimensions, ImageBackground } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardItem from "@/components/CardItem";
import images from "@/assets/images";
import { Link, router, useRouter } from "expo-router";
import { GlobalContext } from "@/context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResizeMode, Video } from "expo-av";
import videos from "@/assets/videos";
import * as ExpoTrackingTransparency from 'expo-tracking-transparency';

const { width } = Dimensions.get('screen');


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

  useEffect(() => {
    (async () => {
      const { status } = await ExpoTrackingTransparency.requestTrackingPermissionsAsync();
      if (status === 'granted') {
        console.log('Yay! I have user permission to track data');
      }
    })();
  }, []);
  return (
    <ImageBackground
      source={images.bgTalet}
      className="h-full w-full "
      resizeMode="cover"

    >
      <SafeAreaView
      >
        <View className="w-fit mx-auto">
          <FlatList
            className="w-fit h-full"
            data={data}
            keyExtractor={(item) => item.id}
            numColumns={(width >= 768) ? 3 : 2}
            contentContainerStyle={{ gap: 12 }}
            columnWrapperStyle={{ gap: 12 }}
            ListHeaderComponent={() => {
              return (
                <View className="py-6">
                  <Text className="font-bold text-5xl text-center">
                    Wacth me grow
                  </Text>
                  <Text className="text-2xl font-bold mt-6">
                    About us
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.navigate('/aboutUs');
                      // router.navigate('/_sitemap');
                    }}
                  >
                    <Video
                      source={videos.intro}
                      resizeMode={ResizeMode.COVER}
                      isLooping
                      shouldPlay
                      isMuted
                      className="w-full h-[160px] md:h-[320px] bg-black mt-2 rounded-lg"
                    />
                  </TouchableOpacity>
                  {!user ? (
                  <View className="py-2 md:py-6 flex-row justify-center gap-2 mt-3 md:mt-6">
                    <TouchableOpacity
                      // href={'/sign-in'}
                      className="flex-1 bg-black py-2 rounded-lg"
                      onPress={() => {
                        router.navigate('/signIn');
                      }}
                    >
                      <Text className="text-white text-center font-normal text-lg md:text-2xl">
                        Sign In
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="flex-1 bg-black py-2 md:py-4 rounded-lg"
                      onPress={() => {
                        router.navigate("/signUp");
                      }}
                    >
                      <Text className="text-white text-center font-normal text-lg md:text-2xl">
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>
                  ) : (
                    <>
                      <TouchableOpacity
                        className="flex-1 bg-black py-2 rounded-lg mt-6"
                        onPress={() => {
                          Alert.alert('Sign Out', 'Are you sure?', [
                            {
                              text: 'Cancel',
                              style: 'cancel',
                            },
                            { text: 'OK', onPress: handleSignOut },
                          ]);
                        }}
                      >
                        <Text className="text-white text-center font-normal text-lg md:text-2xl">
                          Sign Out
                        </Text>
                      </TouchableOpacity>
                    </>
                  )
                  }
                </View>
              );
            }}
            renderItem={({ item }) => (
              <CardItem img={item.img} title={item.title} />
            )}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default index;
