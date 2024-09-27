import { View, Text, ScrollView, Image, FlatList, TouchableOpacity, Alert, Dimensions, ImageBackground } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlobalContext } from '@/context/GlobalProvider'
import images from '@/assets/images'
import AntDesign from '@expo/vector-icons/AntDesign';
import { getHisBaby, getHisGen, getHisNew, getHisVid } from '@/service/image'
import { ResizeMode, Video } from 'expo-av'
import EditForm from '@/components/EditForm'
import { changeAvatar } from '@/service/auth'
import DetailProduct from '@/components/DetailProduct'
import Foundation from '@expo/vector-icons/Foundation';
import { router } from 'expo-router'

const { width } = Dimensions.get('screen');

const profile = () => {
  const { user, handleSignOut } = useContext(GlobalContext);
  const [vid, setVid] = useState<any[]>([]);
  const [gen, setGen] = useState<any[]>([]);
  const [newborn, setNewborn] = useState<any[]>([]);
  const [baby, setBaby] = useState<any[]>([]);
  const [avatar, setAvatar] = useState(user?.link_avatar);
  // const [loading, setLoading] = useState(false);
  const [src_img, setSrc_img] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [hBtn, setHBtn] = useState(0);


  const handleClose = () => {
    setIsOpen(false);
  }

  const handleChangeAvatar = async (img: any) => {
    // console.log(img);
    // setLoading(true);
    const src = `${img.replace(
      "https://photo.gachmen.org/",
      "/var/www/build_futurelove/"
    )}`;
    // console.log(src);
    const prevImg = `${img.replace(
      "/var/www/build_futurelove/",
      "https://photo.gachmen.org/"
    )}`;
    setAvatar(prevImg);
    try {
      const formData = new FormData();
      formData.append("link_img", src);
      formData.append("check_img", "upload");
      const { data } = await changeAvatar(formData, user);
      // console.log(data);
    } catch (err) {
      console.error(err)
    }
    // setLoading(false);

  }


  const fetchVid = async () => {
    try {
      const { data } = await getHisVid(user);
      // console.log(data.list_sukien_video);
      setVid(data.list_sukien_video)
    } catch (err) {
      console.error(err)
    }

  }

  const fetchGen = async () => {
    try {
      const { data } = await getHisGen(user);
      // console.log(data);
      setGen(data);
    } catch (err) {
      console.error(err)
    }

  }
  const fetchNew = async () => {
    try {
      const { data } = await getHisNew(user);
      // console.log(data);
      setNewborn(data);
    } catch (err) {
      console.error(err)
    }

  }
  const fetchBaby = async () => {
    try {
      const { data } = await getHisBaby(user);
      // console.log(data);
      setBaby(data);
    } catch (err) {
      console.error(err)
    }

  }
  useEffect(() => {
    fetchVid();
    // setVid(["https://github.com/Tozivn/futurelove/raw/main/VD_Age/video_age3/Snaptik.app_7302674851234319621.mp4"]);
    fetchGen();
    fetchNew();
    fetchBaby();
  }, []);

  if (width >= 768) {
    return (
      <ImageBackground
        source={images.bgTalet}
        className="h-full w-full"
        resizeMode="cover"
      >
        <ScrollView className='h-full w-full pt-4 '>
          <View className='w-11/12 flex-row items-center mx-auto relative'>
            <View className='h-[62px] w-[62px] rounded-full overflow-hidden bg-black'>
              <Image source={{ uri: avatar }} resizeMode='cover' className='w-full h-full object-cover' />
            </View>
            <Text className='ml-4 text-2xl'>{user?.user_name}</Text>
            <TouchableOpacity onPress={() => setIsOpen(true)}>
              <AntDesign name="edit" size={16} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{
                router.navigate('/aboutUs');
              }}
              className='flex-row justify-center items-center bg-black px-2 py-1 space-x-1 rounded absolute right-0 top-1/2'
              onLayout={(e) => setHBtn(e.nativeEvent.layout.height)}
              style={{ transform: [{ translateY: -hBtn / 2 }] }}
            >
            <Text
            className='text-white text-xl'
            >About us</Text>
            <Foundation name="info" size={24} color="white" />
          </TouchableOpacity>
          </View>
          <View className=" mt-8 w-fit h-fit pl-4">
            <View className="py-6">
              <Text className="font-semibold text-3xl">
                Event
              </Text>
            </View>
            <FlatList

              data={vid}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ gap: 8 }}
              horizontal
              renderItem={({ item }) => {
                const str = item.link_video_da_swap;
                // console.log(str);
                const url = str.replace("futurelove.online", "photo.gachmen.org");
                console.log(url);

                return (
                  <>
                    <TouchableOpacity className='w-[300px] h-[200px] rounded'>
                      <Video source={{ uri: url }}
                        useNativeControls={true}
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        className="w-full h-full" />
                    </TouchableOpacity>
                  </>
                )

              }}
              ListEmptyComponent={() => <>
                <View className='w-full flex-col items-center justify-center gap-4'>
                  <Text className='text-xl font-bold'>Opp!</Text>
                  <Text className='text-base'>Nothing here. Please create your video and image.</Text>
                </View>
              </>}

            />
          </View>

          <View className=" mt-4 w-fit h-fit pl-4">
            <View className="py-6">
              <Text className="font-semibold text-3xl">
                Generator
              </Text>
            </View>
            <FlatList

              data={gen}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ gap: 8 }}
              horizontal
              renderItem={({ item }) => {
                const str = item.link_da_swap;
                const url = str.replace("futurelove.online", "photo.gachmen.org");
                return (
                  <>
                    <TouchableOpacity className='w-[107px] h-[152px] rounded' onPress={() => {
                      setIsOpenDetail(true);
                      setSrc_img(gen);
                    }}>
                      <Image source={{ uri: url }} resizeMode='cover' className='w-full h-full object-cover' />
                    </TouchableOpacity>
                  </>
                )
              }}

              ListEmptyComponent={() => <>
                <View className='w-full flex-col items-center justify-center gap-4'>
                  <Text className='text-xl font-bold'>Opp!</Text>
                  <Text className='text-base'>Nothing here. Please create your video and image.</Text>
                </View>
              </>}
            />
          </View>

          <View className=" mt-4 w-fit h-fit pl-4">
            <View className="py-6">
              <Text className="font-semibold text-3xl">
                New Born
              </Text>
            </View>
            <FlatList

              data={newborn}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ gap: 8 }}
              horizontal
              renderItem={({ item }) => {
                const str = item.link_da_swap;
                const url = str.replace("futurelove.online", "photo.gachmen.org");
                return (
                  <>
                    <TouchableOpacity className='w-[107px] h-[152px] rounded' onPress={() => {
                      setIsOpenDetail(true);
                      setSrc_img(newborn);
                    }}>
                      <Image source={{ uri: url }} resizeMode='cover' className='w-full h-full object-cover' />
                    </TouchableOpacity>
                  </>
                )
              }}

              ListEmptyComponent={() => <>
                <View className='w-full flex-col items-center justify-center gap-4'>
                  <Text className='text-xl font-bold'>Opp!</Text>
                  <Text className='text-base'>Nothing here. Please create your video and image.</Text>
                </View>
              </>}
            />
          </View>

          <View className=" mt-4 w-fit h-fit pl-4">
            <View className="py-6">
              <Text className="font-semibold text-3xl">
                Kid & Mom
              </Text>
            </View>
            <FlatList

              data={baby}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ gap: 8 }}
              horizontal
              renderItem={({ item }) => {
                const str = item.link_da_swap;
                const url = str.replace("futurelove.online", "photo.gachmen.org");
                // console.log(url);
                return (
                  <>
                    <TouchableOpacity className='w-[107px] h-[152px] rounded' onPress={() => {
                      setIsOpenDetail(true);
                      setSrc_img(baby);
                    }}>
                      <Image source={{ uri: url }} resizeMode='cover' className='w-full h-full object-cover' />
                    </TouchableOpacity>
                  </>
                )
              }}


            />
          </View>
          <TouchableOpacity
            className="flex-1 bg-red-600 py-2 rounded-lg mt-20 px-4 mx-2"
            onPress={() => {
              Alert.alert('Delete Account', 'Are you sure?', [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'OK', onPress: () => {
                    setIsOpen(true);
                  }
                },
              ]);
            }}
          >
            <Text className="text-white text-center font-normal text-lg">Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-black py-2 rounded-lg mt-2 mb-20 px-4 mx-2"
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
            <Text className="text-white text-center font-normal text-lg">Sign Out</Text>
          </TouchableOpacity>

        </ScrollView>
        <EditForm isOpen={isOpen} handleClose={handleClose} handleUploadFace={handleChangeAvatar} />
        <DetailProduct isDetail={isOpenDetail} onDetail={() => setIsOpenDetail(false)} img={src_img} />

      </ImageBackground>
    )
  }

  return (
    <ImageBackground
      source={images.bgTalet}
      className="h-full w-full"
      resizeMode="cover"
    >
      <ScrollView className='h-full w-full pt-4 '>
        <View className='w-11/12 flex-row items-center mx-4 relative'>
          <View className='h-[62px] w-[62px] rounded-full overflow-hidden bg-black'>
            <Image source={{ uri: avatar }} resizeMode='cover' className='w-full h-full object-cover' />
          </View>
          <Text className='ml-4 text-2xl'>{user?.user_name}</Text>
          <TouchableOpacity onPress={() => setIsOpen(true)}>
            <AntDesign name="edit" size={16} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
              onPress={()=>{
                router.navigate('/aboutUs');
              }}
              className='flex-row justify-center items-center bg-black px-2 py-1 space-x-1 rounded absolute right-0 top-1/2'
              onLayout={(e) => setHBtn(e.nativeEvent.layout.height)}
              style={{ transform: [{ translateY: -hBtn / 2 }] }}
            >
            <Text
            className='text-white text-xl'
            >About us</Text>
            <Foundation name="info" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View className=" mt-8 w-fit h-fit pl-4">
          <View className="py-6">
            <Text className="font-semibold text-3xl">
              Event
            </Text>
          </View>
          <FlatList

            data={vid}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 8 }}
            horizontal
            renderItem={({ item }) => {
              const str = item.link_video_da_swap;
              // console.log(str);
              const url = str.replace("futurelove.online", "photo.gachmen.org");
              console.log(url);

              return (
                <>
                  <TouchableOpacity className='w-[300px] h-[200px] rounded'>
                    <Video source={{ uri: url }}
                      useNativeControls={true}
                      resizeMode={ResizeMode.CONTAIN}
                      isLooping
                      className="w-full h-full" />
                  </TouchableOpacity>
                </>
              )

            }}
            ListEmptyComponent={() => <>
              <View className='w-full flex-col items-center justify-center gap-4'>
                <Text className='text-xl font-bold'>Opp!</Text>
                <Text className='text-base'>Nothing here. Please create your video and image.</Text>
              </View>
            </>}

          />
        </View>

        <View className=" mt-4 w-fit h-fit pl-4">
          <View className="py-6">
            <Text className="font-semibold text-3xl">
              Generator
            </Text>
          </View>
          <FlatList

            data={gen}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 8 }}
            horizontal
            renderItem={({ item }) => {
              const str = item.link_da_swap;
              const url = str.replace("futurelove.online", "photo.gachmen.org");
              return (
                <>
                  <TouchableOpacity className='w-[107px] h-[152px] rounded' onPress={() => {
                    setIsOpenDetail(true);
                    setSrc_img(gen);
                  }}>
                    <Image source={{ uri: url }} resizeMode='cover' className='w-full h-full object-cover' />
                  </TouchableOpacity>
                </>
              )
            }}

            ListEmptyComponent={() => <>
              <View className='w-full flex-col items-center justify-center gap-4'>
                <Text className='text-xl font-bold'>Opp!</Text>
                <Text className='text-base'>Nothing here. Please create your video and image.</Text>
              </View>
            </>}
          />
        </View>

        <View className=" mt-4 w-fit h-fit pl-4">
          <View className="py-6">
            <Text className="font-semibold text-3xl">
              New Born
            </Text>
          </View>
          <FlatList

            data={newborn}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 8 }}
            horizontal
            renderItem={({ item }) => {
              const str = item.link_da_swap;
              const url = str.replace("futurelove.online", "photo.gachmen.org");
              return (
                <>
                  <TouchableOpacity className='w-[107px] h-[152px] rounded' onPress={() => {
                    setIsOpenDetail(true);
                    setSrc_img(newborn);
                  }}>
                    <Image source={{ uri: url }} resizeMode='cover' className='w-full h-full object-cover' />
                  </TouchableOpacity>
                </>
              )
            }}

            ListEmptyComponent={() => <>
              <View className='w-full flex-col items-center justify-center gap-4'>
                <Text className='text-xl font-bold'>Opp!</Text>
                <Text className='text-base'>Nothing here. Please create your video and image.</Text>
              </View>
            </>}
          />
        </View>

        <View className=" mt-4 w-fit h-fit pl-4">
          <View className="py-6">
            <Text className="font-semibold text-3xl">
              Kid & Mom
            </Text>
          </View>
          <FlatList

            data={baby}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 8 }}
            horizontal
            renderItem={({ item }) => {
              const str = item.link_da_swap;
              const url = str.replace("futurelove.online", "photo.gachmen.org");
              // console.log(url);
              return (
                <>
                  <TouchableOpacity className='w-[107px] h-[152px] rounded' onPress={() => {
                    setIsOpenDetail(true);
                    setSrc_img(baby);
                  }}>
                    <Image source={{ uri: url }} resizeMode='cover' className='w-full h-full object-cover' />
                  </TouchableOpacity>
                </>
              )
            }}


          />
        </View>
        <TouchableOpacity
          className="flex-1 bg-red-600 py-2 rounded-lg mt-20 px-4 mx-2"
          onPress={() => {
            Alert.alert('Delete Account', 'Are you sure?', [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK', onPress: () => {
                  setIsOpen(true);
                }
              },
            ]);
          }}
        >
          <Text className="text-white text-center font-normal text-lg">Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-black py-2 rounded-lg mt-2 mb-20 px-4 mx-2"
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
          <Text className="text-white text-center font-normal text-lg">Sign Out</Text>
        </TouchableOpacity>

      </ScrollView>
      <EditForm isOpen={isOpen} handleClose={handleClose} handleUploadFace={handleChangeAvatar} />
      <DetailProduct isDetail={isOpenDetail} onDetail={() => setIsOpenDetail(false)} img={src_img} />

    </ImageBackground>
  )
}

export default profile