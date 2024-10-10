import { View, Text, ImageBackground, ScrollView, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import images from '@/assets/images';
import { Video } from 'expo-av';
import videos from '@/assets/videos';
import { getDetailDad, getDetailGen, getDetailNew, getDetailTime } from '@/service/image';
import Download from '@/assets/icons/download';

const { width } = Dimensions.get('screen');

const Detail = () => {
  const { title } = useLocalSearchParams();
  const { id_sukien } = useLocalSearchParams();
  console.log(id_sukien);
  const [data, setData] = useState<any>();
  const [listData, setListData] = useState<any[]>([]);

  const getData = async () => {
    if (title == 'generator') {
      try {
        const { data } = await getDetailGen(id_sukien);
        console.log(data.list_data[0].link_da_swap);
        setData({ linkNam: data.list_data[0].linkNam, linkNu: data.list_data[0].linkNu, linkChuaSwap: data.list_data[0].link_baby_goc, linkDaSwap: data.list_data[0].link_da_swap });
      } catch (err) {
        console.log(err);
      }
      return;
    }
    if (title == 'newborn') {
      try {
        const { data } = await getDetailNew(id_sukien);
        console.log(data.list_detail[0]);
        setData({});
        // setData({ linkNam: data.list_data[0].link_nam_goc, linkNu: data.list_data[0].link_nu_goc, linkChuaSwap: data.list_data[0].link_baby_goc, linkDaSwap: data.list_data[0].link_da_swap });
      } catch (err) {
        console.log(err);
      }
      return;
    }
    if (title == 'kid&mom') {
      try {
        const { data } = await getDetailGen(id_sukien);
        console.log(data.list_data[0].link_da_swap);
        setData({ linkNam: data.list_data[0].link_nam_goc, linkNu: data.list_data[0].link_nu_goc, linkChuaSwap: data.list_data[0].link_baby_goc, linkDaSwap: data.list_data[0].link_da_swap });
      } catch (err) {
        console.log(err);
      }
      return;
    }
    if (title == 'timemachine') {
      try {
        const { data } = await getDetailTime(id_sukien);
        console.log("tm",data.list_detail[0]);
        setData({ linkNam: data.list_detail[0].link_image, linkChuaSwap: data.list_detail[0].link_video_goc, linkDaSwap: data.list_detail[0].link_vid_da_swap });
      } catch (err) {
        console.log(err);
      }
      return;
    }
    if (title == 'dad&mom') {
      try {
        const { data } = await getDetailDad(id_sukien);
        console.log(data.list_data[0].link_da_swap);
        setData({ linkNam: data.list_data[0].link_nam_goc, linkNu: data.list_data[0].link_nu_goc, linkChuaSwap: data.list_data[0].link_baby_goc, linkDaSwap: data.list_data[0].link_da_swap });
      } catch (err) {
        console.log(err);
      }
      return;
    }

  }
  console.log(data);

  useEffect(() => {
    getData();
  }, [])
  if (title == 'timemachine' || title == 'dad&mom') {
    // const str = data.linkNam;
    // const url = str.replace('/var/www/build_futurelove/', "https://photo.gachmen.org/");
    return (
      <ImageBackground
        source={images.bgTalet}
        className='h-full w-full'
        resizeMode='cover'
      >
        <ScrollView
          className='h-full py-4 w-11/12 mx-auto md:max-w-[768px]'
        >
          <Text className='font-bold text-lg mt-4 md:text-3xl'>Amazing Video</Text>
          <View
            className={`w-full flex-row mt-4 justify-center`}
          >
            <Image
              source={images.bbGen1}
              className='w-1/2 h-[200px] mt-4 rounded-lg md:h-[280px]'
              resizeMode='cover'
            />

          </View>
          <View>
            <Text
              className='font-bold text-lg mt-4 md:text-3xl'
            >Before</Text>
            <Video
              source={{ uri: data.linkChuaSwap }}
              useNativeControls
              isLooping
              className="w-full h-[200px] md:h-[400px] bg-black mt-4 rounded-lg"
            />
            <Text
              className='font-bold text-lg mt-4 md:text-3xl'
            >After</Text>
            <Video
              source={{ uri: data.linkDaSwap }}
              useNativeControls
              isLooping
              className="w-full h-[200px] md:h-[400px] bg-black mt-4 rounded-lg"
            />
          </View>

        </ScrollView>
      </ImageBackground>
    )
  }
  if (title == 'kid&mom' || title == 'newborn') {
    return (
      <ImageBackground
        source={images.bgTalet}
        className='h-full w-full'
        resizeMode='cover'
      >
        <View
          className='h-full py-4 w-11/12 mx-auto md:max-w-[768px]'
        >


          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={{ gap: width >= 768 ? (768 * 2) / 100 : (width * 22) / 1200 }}
            columnWrapperStyle={{ gap: width >= 768 ? (768 * 2) / 100 : (width * 22) / 1200 }}
            ListHeaderComponent={() => {
              return (
                <View
                  className={`flex-1`}
                >
                  <Text className='font-bold text-lg mt-4 md:text-3xl'>Amazing Image</Text>
                  <View
                    className={`w-full flex-row mt-4 ${title == 'newborn' ? 'justify-between' : 'justify-center'}`}
                  >
                    <Image
                      source={images.bbGen1}
                      className='w-[49%] h-[200px] mt-4 rounded-lg md:h-[280px]'
                      resizeMode='cover'
                    />

                    {title == 'newborn' && <Image
                      source={images.bbGen2}
                      className='w-[49%] h-[200px] mt-4 rounded-lg md:h-[280px]'
                      resizeMode='cover'
                    />}

                  </View>
                  {title == 'kid&mom' && <>
                    <Text
                      className='font-bold text-lg mt-4 md:text-3xl'
                    >Before</Text>
                    <FlatList
                      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal
                      contentContainerStyle={{ gap: 10 }}
                      renderItem={(item) => (
                        <Image
                          source={images.bbGen2}
                          className='w-[180px] h-[200px] md:h-[300px] rounded-lg border bg-white'
                          resizeMode='cover'
                        />
                      )}
                    />
                  </>}
                  <View
                    className={`w-full flex-row mt-4 justify-between items-center`}
                  >
                    <Text
                      className='font-bold text-lg mt-4 md:text-3xl'
                    >{title == 'kid&mom' ? 'After' : 'Your baby looks like. They are so cute!'}</Text>
                    <TouchableOpacity>
                      <Download/>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }}
            renderItem={() => {
              return (

                <Image
                  source={images.bbGen1}
                  className='w-[49%] h-[200px] mt-4 rounded-lg md:h-[280px] border bg-white'
                  resizeMode='contain'
                />
              )
            }}
          />

        </View>
      </ImageBackground>
    )
  }
  return (
    <ImageBackground
      source={images.bgTalet}
      className='h-full w-full'
      resizeMode='cover'
    >
      <ScrollView
        className='h-full py-4 w-11/12 mx-auto md:max-w-[768px]'
      >
        <Text className='font-bold text-lg mt-4 md:text-3xl'>Amazing Image</Text>
        <View
          className={`w-full flex-row mt-4 justify-between`}
        >
          <Image
            source={{ uri: data?.linkNam }}
            className={`w-[49%] h-[200px] mt-4 rounded-lg md:h-[280px]`}
            resizeMode='cover'
          />


          <Image
            source={{ uri: data?.linkNu }}
            className={`w-[49%] h-[200px] mt-4 rounded-lg md:h-[280px]`}
            resizeMode='cover'
          />


        </View>
        <View>
          <View
            className='w-full flex-row mt-4 justify-between items-center'
          >
            <Text
              className='font-bold text-lg mt-4 md:text-3xl'
            >Your child is so beautiful!</Text>
            <TouchableOpacity>
              <Download />
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: data?.linkDaSwap }}
            className="w-full h-[400px] md:h-[600px] bg-black mt-4 rounded-lg"
            resizeMode='contain'
          />
        </View>

      </ScrollView>
    </ImageBackground>
  )
}

export default Detail