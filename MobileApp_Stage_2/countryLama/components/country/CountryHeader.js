import { View, Text, TouchableOpacity } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { useSelector } from "react-redux";

const CountryHeader = ({ country, theme }) => {
  return (
    <TouchableOpacity className="flex flex-row items-center py-4">
      <Link href={"/"} className="pr-4 py-4">
        <Text>
          {theme === "light" ? (
            <Feather name="arrow-left" size={24} color="black" />
          ) : (
            <Feather name="arrow-left" size={24} color="white" />
          )}
        </Text>
      </Link>
      {country && (
        <Text
          className={`font-axiregular text-2xl font-bold ml-[20vw] ${
            theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
          }`}
        >
          {country.name.common}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CountryHeader;