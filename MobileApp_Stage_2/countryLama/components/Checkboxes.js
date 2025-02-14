import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters } from "../redux/features/filterSlice"; // Import resetFilters
import TimeZones from "./TimeZone";
import Continents from "./Continents";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";

const Checkboxes = ({
  checkLists,
  continents,
  isModalVisible,
  setIsModalVisible,
  onShowResults, // Callback for "Show Results" button
}) => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  // Memoized components to prevent unnecessary re-renders
  const TimeZonesComponent = useMemo(
    () => <TimeZones checkLists={checkLists} />,
    [checkLists]
  );
  const ContinentsComponent = useMemo(
    () => <Continents continents={continents} />,
    [continents]
  );

  // Handle reset button press
  const handleReset = () => {
    dispatch(resetFilters()); // Reset all filters
  };

  // Handle show results button press
  const handleShowResults = () => {
    setIsModalVisible(false); // Close the modal
    if (onShowResults) {
      onShowResults(); // Trigger the callback to show filtered results
    }
  };

  return (
    <SafeAreaView >
      <Modal
        visible={isModalVisible}
        animationType="slide" // Faster animation
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
        className={`${theme === "light" ? "bg-white" : "bg-[#000F24]"}`}
      >
                  <View
            className={`${
              theme === "light" ? "bg-white" : "bg-[#000F24]"
            } flex flex-row justify-between items-center pb-2 p-4`}
          >
            <Text
              className={`${
                theme === "light"
                  ? "text-[#1C1917] "
                  : "text-white "
              } font-bold text-xl`}
            >
              Filters
            </Text>
            {/* Close Modal Button */}
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <AntDesign
                name={theme === "light" ? "closesquareo" : "closesquare"}
                size={24}
                color={theme === "light" ? "black" : "white"}
              />
            </TouchableOpacity>
          </View>
        <View
          className={`${
            theme === "light" ? "bg-white" : "bg-[#000F24]"
          } flex-1  p-4 rounded-lg`}
        >
          {ContinentsComponent}
          {TimeZonesComponent}
          <View className="flex flex-row justify-between items-center ">
            {/* Reset Button */}
            <TouchableOpacity
              onPress={handleReset}
              className="flex flex-row justify-center p-[10px] rounded-md bg-white border border-black mr-6"
            >
              <Text className="text-base text-black ">Reset</Text>
            </TouchableOpacity>

            {/* Show Results Button */}
            <TouchableOpacity
              onPress={handleShowResults}
              className="flex-1 flex flex-row justify-center p-[10px] rounded-md bg-[#FF6C00]"
            >
              <Text className="text-base text-white border border-[#ff6C00]">
                Show Results
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Checkboxes;
