import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { setTimeZone, removeTimeZone } from "../redux/features/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

const TimeZone = ({ value, isSelected, toggleTimeZone }) => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <TouchableOpacity onPress={() => toggleTimeZone(value)}>
      <View className="flex flex-row justify-between items-center py-2 mb-2 ml-">
        <Text
          className={`${theme === "light" ? "text-[#1C1917]" : "text-white"} font-bold text-sm` }
        >
          {value}
        </Text>
        <AntDesign
          name={`${isSelected ? "checkcircle" : "checkcircleo"}`}
          size={20}
          color={theme ==="light"?"black":"white"}
        />
      </View>
    </TouchableOpacity>
  );
};

const TimeZones = ({ checkLists }) => {
  const [isOpen, setIsOpen] = useState(false);
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
        onPress={() => setIsOpen(!isOpen)}
        className="flex flex-row justify-between items-center py-2"
      >
        <Text className={`${theme === "light" ? "text-[#1C1917]" : "text-white"} font-bold text-xl`}>Time Zone</Text>
        <Feather
          name={`${isOpen ? "chevron-up" : "chevron-down"}`}
          size={24}
          color={theme ==="light"?"black":"white"}
        />
      </TouchableOpacity>
      {isOpen && (
        <ScrollView className="max-h-[75vh]">
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
