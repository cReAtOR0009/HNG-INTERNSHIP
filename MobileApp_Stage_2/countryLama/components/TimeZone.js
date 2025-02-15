import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { setTimeZone, removeTimeZone } from "../redux/features/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

const TimeZone = ({ value, isSelected, toggleTimeZone }) => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <TouchableOpacity onPress={() => toggleTimeZone(value)}>
      <View className="flex flex-row justify-between items-center pb-4">
        <Text
          className={`font-axiregular font-normal text-base ${
            theme === "light" ? "text-[#667085]" : "text-[#667085]"
          } `}
        >
          {value}
        </Text>
        <AntDesign
          name={`${isSelected ? "checkcircle" : "checkcircleo"}`}
          size={20}
          color={theme === "light" ? "#667085" : "#667085"}
        />
      </View>
    </TouchableOpacity>
  );
};

const TimeZones = ({ checkLists, isOpen, onToggle }) => {
  const dispatch = useDispatch();
  const selectedTimeZones = useSelector((state) => state.filters.timeZone);
  const theme = useSelector((state) => state.theme.theme);

  // Toggle time zone selection
  const toggleTimeZone = (timeZone) => {
    if (selectedTimeZones.includes(timeZone)) {
      // If already selected, remove it
      dispatch(removeTimeZone(timeZone));
    } else {
      // If not selected, add it
      dispatch(setTimeZone(timeZone));
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={onToggle}
        className="flex flex-row justify-between items-center py-2"
      >
        <Text
          className={`font-axiregular text-base font-bold ${
            theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
          } font-bold text-xl`}
        >
          Time Zone
        </Text>
        <Feather
          name={`${isOpen ? "chevron-up" : "chevron-down"}`}
          size={24}
          color={theme === "light" ? "black" : "white"}
        />
      </TouchableOpacity>
      {isOpen && (
        <ScrollView className="">
          <FlatList
            data={checkLists}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TimeZone
                key={item.value}
                value={item.value}
                isSelected={selectedTimeZones.includes(item.value)}
                toggleTimeZone={toggleTimeZone}
              />
            )}
            scrollEnabled={false} // Prevents double scrolling issue
          />
        </ScrollView>
      )}
    </View>
  );
};

export default TimeZones;