import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useSelector } from "react-redux";

const Country = ({ name, capital, thumbnail }) => {
const theme = useSelector((state) => state.theme.theme)
  return (
    <View className="flex flex-row  items-stretch mt-4- font-axiregular">
      {/* <Link href={`${name}`}> */}
        {/* <View className=""> */}
          <Image
            source={{ uri: thumbnail }}
            className="w-10 h-10 rounded-md mr-4"
            resizeMode="cover"
          />
        {/* </View> */}
        <View className="flex justify-between text-sm ">
          <Text className={`font-axiregular flex-1 text-sm font-normal ${theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"} `}>{name}</Text>
          <Text className={`font-axiregular text-sm font-normal flex-1 ${theme === "light" ? "text-[#667085]" : "text-[#98A2B3]"}`} >{capital}</Text>
        </View>
      {/* </Link> */}
    </View>
  );
};

export default Country;

