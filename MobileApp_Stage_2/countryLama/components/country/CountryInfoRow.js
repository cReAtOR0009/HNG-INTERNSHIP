import { View, Text } from "react-native";

const CountryInfoRow = ({ label, value, theme }) => {
  return (
    <View className="flex flex-row items-center">
      <Text
        className={`${
          theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
        } font-axiregular text-base font-semibold pr-2`}
      >
        {label}:
      </Text>
      <Text
        className={`${
          theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
        } text-base font-light`}
      >
        {value || "N/A"}
      </Text>
    </View>
  );
};

export default CountryInfoRow;