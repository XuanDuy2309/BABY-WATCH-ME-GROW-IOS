import { View, Text } from 'react-native'
import React from 'react'

const DetailImg = ({img,onDetail}:{img:string,onDetail:()=>void}) => {
  return (
    <View className='w-full h-full justify-center items-center  absolute top-0 left-0 right-0 '>
      <Text>DetailImg</Text>
    </View>
  )
}

export default DetailImg