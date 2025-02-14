import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContinent, removeContinent } from "../redux/features/filterSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from '@expo/vector-icons/Feather';

const Continent = ({ value, isSelected, toggleContinent }) => {
  const theme = useSelector((state) => state.theme.theme)
  return (
    <TouchableOpacity onPress={() => toggleContinent(value)}>
      <View className="flex flex-row justify-between items-center pb-2">
        <Text className={`${theme === "light" ? "text-[#1C1917]" : "text-white"} text-base `}>{value}</Text>
        <AntDesign
          name={`${isSelected ? "checkcircle" : "checkcircleo"}`}
          size={20}
          color={theme ==="light"?"black":"white"}
        />
      </View>
    </TouchableOpacity>
  );
};

const Continents = ({ continents }) => {
  const [isOpen, setIsOpen] = useState(false);
    const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const selectedContinents = useSelector((state) => state.filters.continents);
  

  // Toggle continent selection
  const toggleContinent = (continent) => {
    if (selectedContinents.includes(continent)) {
      // If already selected, remove it
      dispatch(removeContinent(continent));
    } else {
      // If not selected, add it
      dispatch(setContinent(continent));
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className={`flex flex-row justify-between items-center py-2`}
      >
        <Text className={`${theme === "light" ? "text-[#1C1917]" : "text-white"} font-bold text-xl`}>Continents</Text>
        <Feather
          name={`${isOpen ? "chevron-up" : "chevron-down"}`}
          size={24}
          color= {theme ==="light"?"black":"white"}
        />
      </TouchableOpacity>
      {isOpen && (
        <View>
          {continents.map((continent, index) => (
            <Continent
              key={continent.value}
              value={continent.value}
              isSelected={selectedContinents.includes(continent.value)}
              toggleContinent={toggleContinent}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default Continents;