import {
    View,
    Text,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/assets/images";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Pagination from "@/components/Pagination";
import { getTemplImg, getTemplVid } from "@/service/image";
import Loader from "@/components/Loader";
import { ResizeMode, Video } from "expo-av";
import ReactPaginate from "react-paginate";
import { router, useLocalSearchParams } from "expo-router";
import { GlobalContext } from "@/context/GlobalProvider";
import CardTemplate from "@/components/CardTemplate";

const listTempl = [
    { id: "0", title: "Time Machine", url: "time_machine_temp" },
    { id: "1", title: "Dad & Mom", url: "all_video_baby_mom" },
    { id: "2", title: "Kid & Mom", url: "mom_baby_temp" },
];

const { width } = Dimensions.get('screen');


const Template = () => {
    const { handleShowAds } = useContext(GlobalContext);
    const { title } = useLocalSearchParams();
    const query = listTempl.find((item) => item.title === title);
    const [currentTempl, setCurrentTempl] = useState<any>(query);
    const [data, setData] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);



    const handleChangePage = (e: any) => {
        setCurrentPage(e);
    }

    

    const fetchData = async () => {
        if (currentTempl.title !== "Kid & Mom") {
            try {
                setLoading(true);
                const res = await getTemplVid(currentPage, currentTempl.url);
                if (res) {
                    setData(res.data.data);
                    // console.log(res.data.data);
                    setTotalPages(res.data.total_page);
                    // console.log(res.data.total_page);
                    setLoading(false);
                }
            } catch (err) {
                // console.log(err);
                setLoading(false);
            }
        } else {
            try {
                setLoading(true);
                const res = await getTemplImg(currentPage, currentTempl.url);
                if (res) {
                    setData(res.data.data);
                    // console.log(res.data.data);
                    setTotalPages(res.data.total_pages);
                    setLoading(false);
                }
            } catch (err) {
                // console.log(err);
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
                <SafeAreaView className="h-full w-full px-2">
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
                    <FlatList
                        className="w-full h-full mx-auto mt-2"
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        contentContainerStyle={{ gap: 8 }}
                        columnWrapperStyle={{ gap: 8 }}
                        renderItem={({ item }) => {
                            return (
                                <CardTemplate
                                    item={item}
                                    currentTempl={currentTempl}
                                />
                            );
                        }}
                    />
                    <Pagination totalPage={totalPages} onChangePage={(e) => handleChangePage(e)} />

                    {/* <Loader isLoading={loading} /> */}
                </SafeAreaView>
            </ImageBackground>
        )
    }

    return (
        <ImageBackground
            source={images.bgTalet}
            className="h-full w-full"
            resizeMode="cover"
        >
            <SafeAreaView className="h-full w-full px-2">
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
                                className="w-[134px] py-2 bg-[#D9D9D9] rounded-3xl"
                                onPress={() => {
                                    setCurrentTempl(item);
                                }}
                            >
                                <Text className="text-center">{item.title}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
                <FlatList
                    className="w-full h-full mx-auto mt-2"
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    contentContainerStyle={{ gap: 8 }}
                    columnWrapperStyle={{ gap: 8 }}
                    renderItem={({ item }) => {
                        return (
                            <CardTemplate
                                item={item}
                                currentTempl={currentTempl}
                            />
                        );
                    }}
                />
                <Pagination totalPage={totalPages} onChangePage={(e) => handleChangePage(e)} />

                {/* <Loader isLoading={loading} /> */}
            </SafeAreaView>
        </ImageBackground>
    );
};

export default Template;
