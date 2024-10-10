import { View, Text, ScrollView, Image, FlatList, TouchableOpacity, Alert, Dimensions, ImageBackground } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlobalContext } from '@/context/GlobalProvider'
import images from '@/assets/images'
import AntDesign from '@expo/vector-icons/AntDesign';
import { getAllDad, getAllGen, getAllKid, getAllNew, getAllTime, getHisBaby, getHisGen, getHisNew, getHisVid, getTemplImg, getTemplVid } from '@/service/image'
import { ResizeMode, Video } from 'expo-av'
import EditForm from '@/components/EditForm'
import { changeAvatar } from '@/service/auth'
import DetailProduct from '@/components/DetailProduct'
import Foundation from '@expo/vector-icons/Foundation';
import { router, useLocalSearchParams } from 'expo-router'
import Generator from '../(swap)/generator'
import CardTemplate from '@/components/CardTemplate'
import Pagination from '@/components/Pagination'
import CardProfile from '@/components/CardProfile'

const { width } = Dimensions.get('screen');

const listTempl = [
  { id: "0", title: "Generator", url: "mom_baby_temp" },
  { id: "1", title: "New Born", url: "mom_baby_temp" },
  { id: "2", title: "Time Machine", url: "time_machine_temp" },
  { id: "3", title: "Dad & Mom", url: "all_video_baby_mom" },
  { id: "4", title: "Kid & Mom", url: "mom_baby_temp" },
];

const profile = () => {
  const { user, handleSignOut } = useContext(GlobalContext);
  const [avatar, setAvatar] = useState(user?.link_avatar);
  // const [loading, setLoading] = useState(false);
  const [src_img, setSrc_img] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [hBtn, setHBtn] = useState(0);
  // const { handleShowAds } = useContext(GlobalContext);
  const query = listTempl.find((item) => item.title === "Generator");
  const [currentTempl, setCurrentTempl] = useState<any>(query);
  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);


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


  const handleChangePage = (e: any) => {
    setCurrentPage(e);
  }



  const fetchData = async () => {
    if (currentTempl.title === "Generator") {
      try{
        console.log(currentPage,user.token);
        const {data}=await getAllGen(user,currentPage);
        console.log(data.list_data);
        setData(data.list_data);
      } catch(err){
        console.log(err);
      } finally{
        return;
      }
    }
    if (currentTempl.title === "New Born") {
      try{
        console.log(currentPage,user.token);
        const {data}=await getAllNew(user,currentPage);
        // console.log("nb",data);
        setData(data.list_data);
        setTotalPages(data.total_page);
      } catch(err){
        console.log(err);
      } finally{
        return;
      }
    }
    if (currentTempl.title === "Time Machine") {
      try{
        console.log(currentPage,user.token);
        const {data}=await getAllTime(user,currentPage);
        // console.log(data.total_page);
        setData(data.list_data);
        setTotalPages(data.total_page);
      } catch(err){
        console.log(err);
      } finally{
        return;
      }
    }
    if (currentTempl.title === "Dad & Mom") {
      try{
        console.log(currentPage,user.token);
        const {data}=await getAllDad(user,currentPage);
        console.log("d&m",data.list_data);
        setData(data.list_data);
        setTotalPages(data.total_page);
      } catch(err){
        console.log(err);
      } finally{
        return;
      }
    }
    if (currentTempl.title === "Kid & Mom") {
      try{
        console.log(currentPage,user.token);
        const {data}=await getAllKid(user,currentPage);
        console.log(data.list_data);
        setData(data.list_data);
        setTotalPages(data.total_page);
      } catch(err){
        console.log(err);
      } finally{
        return;
      }
    }
  };

  useEffect(() => {
    fetchData();
    // console.log(title);
    return () => { };
  }, [currentPage, currentTempl]);


  if (width >= 768) {
    return (
      <ImageBackground
        source={images.bgTalet}
        className="h-full w-full"
        resizeMode="cover"
      >
        <View className='h-full w-full pt-4 '>

          <FlatList
            className="w-full h-full mx-auto mt-2"
            data={data}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={{ gap: 8 }}
            columnWrapperStyle={{ gap: 8 }}
            ListHeaderComponent={() => (
              <>
                <View className='w-11/12 flex-row items-center mx-auto relative'>
                  <View className='h-[62px] w-[62px] rounded-full overflow-hidden bg-black'>
                    <Image source={{ uri: avatar }} resizeMode='cover' className='w-full h-full object-cover' />
                  </View>
                  <Text className='ml-4 text-2xl'>{user?.user_name}</Text>
                  <TouchableOpacity onPress={() => setIsOpen(true)}>
                    <AntDesign name="edit" size={16} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
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
                <FlatList
                  className="mt-4 w-full pb-4 h-[60px]"
                  horizontal
                  data={listTempl}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={{
                    gap: 8,
                    justifyContent: "space-around",
                  }}
                  renderItem={({ item }) => {
                    if (currentTempl && item.title === currentTempl.title) {
                      return (
                        <TouchableOpacity
                          className="w-[134px] h-[36px] flex justify-center items-center bg-[#FF7991] rounded-3xl"
                          onPress={() => {
                            setCurrentTempl(item);
                          }}
                        >
                          <Text className="text-white">{item.title}</Text>
                        </TouchableOpacity>
                      );
                    }
                    return (
                      <TouchableOpacity
                        className="w-[134px] h-[36px] flex justify-center items-center bg-[#D9D9D9] rounded-3xl"
                        onPress={() => {
                          setCurrentTempl(item);
                        }}
                      >
                        <Text>{item.title}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </>
            )}
            renderItem={({ item }) => {
              return (
                <CardProfile
                  item={item}
                  currentTempl={currentTempl}
                />
              );
            }}
          />
          <Pagination totalPage={totalPages} onChangePage={(e) => handleChangePage(e)} />

        </View>
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
      <View className='h-full w-full pt-4 '>


        <FlatList
          className="w-full h-full mx-auto mt-2"
          data={data}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={{ gap: 8 }}
          columnWrapperStyle={{ gap: 8 }}
          ListHeaderComponent={() =>
          (
            <>
              <View className='w-11/12 flex-row items-center mx-4 relative'>
                <View className='h-[62px] w-[62px] rounded-full overflow-hidden bg-black'>
                  <Image source={{ uri: avatar }} resizeMode='cover' className='w-full h-full object-cover' />
                </View>
                <Text className='ml-4 text-2xl'>{user?.user_name}</Text>
                <TouchableOpacity onPress={() => setIsOpen(true)}>
                  <AntDesign name="edit" size={16} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
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
              <FlatList
                className="mt-4 w-full h-[60px] pb-4 "
                horizontal
                data={listTempl}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                  gap: 8,
                }}
                renderItem={({ item }) => {
                  if (currentTempl && item.title === currentTempl.title) {
                    return (
                      <TouchableOpacity
                        className="w-[134px] flex justify-center items-center bg-[#FF7991] rounded-3xl"
                        onPress={() => {
                          setCurrentTempl(item);
                        }}
                      >
                        <Text className="text-white">{item.title}</Text>
                      </TouchableOpacity>
                    );
                  }
                  return (
                    <TouchableOpacity
                      className="w-[134px] flex justify-center items-center bg-[#D9D9D9] rounded-3xl"
                      onPress={() => {
                        setCurrentTempl(item);
                      }}
                    >
                      <Text className="text-center">{item.title}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </>
          )}
          renderItem={({ item }) => {
            return (
              <CardProfile
                item={item}
                currentTempl={currentTempl}
              />
            );
          }}

        />
        <Pagination totalPage={totalPages} onChangePage={(e) => handleChangePage(e)} />


      </View>
      <EditForm isOpen={isOpen} handleClose={handleClose} handleUploadFace={handleChangeAvatar} />
      {/* <DetailProduct isDetail={isOpenDetail} onDetail={() => setIsOpenDetail(false)} img={src_img} /> */}

    </ImageBackground>
  )
}

export default profile