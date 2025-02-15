import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters } from "../redux/features/filterSlice"; // Import resetFilters
import TimeZones from "./TimeZone";
import Continents from "./Continents";
import AntDesign from "@expo/vector-icons/AntDesign";

const Checkboxes = ({
  checkLists,
  continents,
  isModalVisible,
  setIsModalVisible,
  onShowResults, // Callback for "Show Results" button
}) => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const [modalHeight, setModalHeight] = useState(new Animated.Value(400)); // Initial height of the modal
  const [isTimeZoneOpen, setIsTimeZoneOpen] = useState(false);
  const [isContinentOpen, setIsContinentOpen] = useState(false);

  // Memoized components to prevent unnecessary re-renders
  const TimeZonesComponent = useMemo(
    () => (
      <TimeZones
        checkLists={checkLists}
        isOpen={isTimeZoneOpen}
        onToggle={() => {
          setIsTimeZoneOpen(!isTimeZoneOpen);
          setIsContinentOpen(false); // Close Continent when TimeZone is opened
        }}
      />
    ),
    [checkLists, isTimeZoneOpen]
  );

  const ContinentsComponent = useMemo(
    () => (
      <Continents
        continents={continents}
        isOpen={isContinentOpen}
        onToggle={() => {
          setIsContinentOpen(!isContinentOpen);
          setIsTimeZoneOpen(false); // Close TimeZone when Continent is opened
        }}
      />
    ),
    [continents, isContinentOpen]
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
    <SafeAreaView>
      <Modal
        visible={isModalVisible}
        animationType="slide" // Faster animation
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <Animated.View
            className={`rounded-t-2xl p-6 ${
              theme === "light" ? "bg-white" : "bg-[#000F24]"
            }`}
            style={{ height: modalHeight }}
          >
            {/* Modal Header */}
            <View className="flex-row justify-between items-center pb-4">
              <Text
                className={`font-bold text-xl ${
                  theme === "light" ? "text-[#1C1917]" : "text-[#EAECF0]"
                }`}
              >
                Filters
              </Text>
              {/* Close Modal Button */}
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <AntDesign
                  name={theme === "light" ? "closesquareo" : "closesquare"}
                  size={24}
                  color={theme === "light" ? "#667085" : "#667085"}
                />
              </TouchableOpacity>
            </View>

            {/* Scrollable Content */}
            <ScrollView className="flex-">
              {/* Continents and TimeZones Components */}
              {ContinentsComponent}
              {TimeZonesComponent}
            </ScrollView>

            {/* Reset and Show Results Buttons */}
            <View className="flex-row justify-betwee mt-6">
              {/* Reset Button */}
              <TouchableOpacity
                onPress={handleReset}
                className="flex- justify-center items-center p-3 min-w-[90px]  bg-white border border-black rounded-lg mr-4"
              >
                <Text className="text-black">Reset</Text>
              </TouchableOpacity>

              {/* Show Results Button */}
              <TouchableOpacity
                onPress={handleShowResults}
                className="flex-1 justify-center items-center p-3 bg-[#FF6C00] rounded-lg"
              >
                <Text className="text-white">Show Results</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Checkboxes;