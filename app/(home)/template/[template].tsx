import {
    View,
    Text,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import images from "@/assets/images";
  import FontAwesome from "@expo/vector-icons/FontAwesome";
  import Pagination from "@/components/Pagination";
  import { getTemplImg, getTemplVid } from "@/service/image";
  import Loader from "@/components/Loader";
  import { ResizeMode, Video } from "expo-av";
  import ReactPaginate from "react-paginate";
  
  const Template = () => {
    const [currentTempl, setCurrentTempl] = useState({
      id: "0",
      title: "Time Machine",
      url: "time_machine_temp",
    });
    const [data, setData] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
  
    const listTempl = [
      { id: "0", title: "Time Machine", url: "time_machine_temp" },
      { id: "1", title: "Dad & Mom", url: "all_video_baby_mom" },
      { id: "2", title: "Kid & Mom", url: "mom_baby_temp" },
    ];
  
    const handleChangePage = (e:any)=>{
      setCurrentPage(e);
    }
  
    const fetchData = async () => {
      if (currentTempl.title !== "Kid & Mom") {
        try {
          setLoading(true);
          const res = await getTemplVid(currentPage, currentTempl.url);
          if (res) {
            setData(res.data.data);
            console.log(res.data.data);
            setTotalPages(res.data.total_page);
            console.log(res.data.total_page);
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      } else {
        try {
          setLoading(true);
          const res = await getTemplImg(currentPage, currentTempl.url);
          if (res) {
            setData(res.data.data);
            console.log(res.data.data);
            setTotalPages(res.data.total_pages);
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [currentPage, currentTempl]);
  
    return (
      <SafeAreaView className="h-full w-full bg-white px-2">
        <FlatList
          className="mt-4 w-full pb-4"
          horizontal
          data={listTempl}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: 8,
            justifyContent: "space-around",
          }}
          renderItem={({ item }) => {
            if (item.title === currentTempl.title) {
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
        <FlatList
          className="w-full h-full mx-auto"
          data={data}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={{ gap: 8 }}
          columnWrapperStyle={{ gap: 8 }}
          renderItem={({ item }) => {
            if (currentTempl.title === "Kid & Mom") {
              return (
                <View className="flex-1 h-[279px] rounded overflow-hidden mt-4">
                  <Image
                    source={{ uri: item.image_sample }}
                    className="w-full h-full object-cover"
                  />
                </View>
              );
            }
            return (
              <View className="flex-1 h-[279px] rounded overflow-hidden mt-4 bg-black">
                <Video
                  source={{ uri: item.linkgoc }}
                  useNativeControls={true}
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  className="w-full h-full object-cover"
                />
              </View>
            );
          }}
        />
        <Pagination totalPage={totalPages} onChangePage={(e)=>handleChangePage(e)}/>
  
        <Loader isLoading={loading} />
      </SafeAreaView>
    );
  };
  
  export default Template;
  