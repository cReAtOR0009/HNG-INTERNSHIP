import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../redux/features/filterSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";

const Language = ({ value, name, native, addLanguage }) => {
  const selectedLanguage = useSelector((state) => state.filters.language);
  const isSelected = selectedLanguage.includes(value);
  const theme = useSelector((state) => state.theme.theme);

  const handlePress = () => {
    addLanguage(value);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="flex flex-row justify-between py-1 mb-">
        <Text
          className={`font-axiregular font-normal text-base ${
            theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
          } `}
        >
          {native}
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

const Languages = ({ isOpenLanguage, setIsOpenLanguage }) => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((state) => state.filters.language);
  const slideAnim = useRef(new Animated.Value(300)).current; // Initial value for slide-up animation

  const languages = [
    { name: "English", value: "en", native: "English" },
    { name: "Arabic", value: "ara", native: "العربية" },
    { name: "Breton", value: "bre", native: "Brezhoneg" },
    { name: "Czech", value: "ces", native: "Čeština" },
    { name: "German", value: "deu", native: "Deutsch" },
    { name: "Estonian", value: "est", native: "Eesti" },
    { name: "Finnish", value: "fin", native: "Suomi" },
    { name: "French", value: "fra", native: "Français" },
    { name: "Croatian", value: "hrv", native: "Hrvatski" },
    { name: "Hungarian", value: "hun", native: "Magyar" },
    { name: "Italian", value: "ita", native: "Italiano" },
    { name: "Japanese", value: "jpn", native: "日本語" },
    { name: "Korean", value: "kor", native: "한국어" },
    { name: "Persian", value: "per", native: "فارسی" },
    { name: "Polish", value: "pol", native: "Polski" },
    { name: "Portuguese", value: "por", native: "Português" },
    { name: "Russian", value: "rus", native: "Русский" },
    { name: "Slovak", value: "slk", native: "Slovenčina" },
    { name: "Spanish", value: "spa", native: "Español" },
    { name: "Serbian", value: "srp", native: "Српски" },
    { name: "Swedish", value: "swe", native: "Svenska" },
    { name: "Turkish", value: "tur", native: "Türkçe" },
    { name: "Urdu", value: "urd", native: "اردو" },
    { name: "Chinese", value: "zho", native: "中文" },
  ];

  // Add or remove language
  const addLanguage = (language) => {
    if (selectedLanguage !== language) {
      dispatch(setLanguage(language));
    }
  };

  // Slide-in animation when modal opens
  useEffect(() => {
    if (isOpenLanguage) {
      Animated.timing(slideAnim, {
        toValue: 0, // Slide up to 0
        duration: 300, // Animation duration
        useNativeDriver: true, // Use native driver for better performance
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300, // Slide down to 300
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpenLanguage]);

  return (
   
      <Modal
        visible={isOpenLanguage}
        transparent={true}
        animationType="none" // Disable default modal animation
        onRequestClose={() => setIsOpenLanguage(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <Animated.View
            style={{
              transform: [{ translateY: slideAnim }], // Apply slide animation
              maxHeight: "80%", // Ensure modal doesn't overflow the screen
            }}
            className={`h-full w-full bg-white rounded-t-2xl p-6 ${
              theme === "light" ? "bg-white" : "bg-[#000F24]"
            }`}
          >
            <View className="flex flex-row justify-between items-center mb-4 ">
              <Text
                className={`font-axiregular text-lg font-bold ${
                  theme === "light" ? "text-black" : "text-[#F2F4F7]"
                }`}
              >
                Languages
              </Text>
              <TouchableOpacity onPress={() => setIsOpenLanguage(false)}>
                <AntDesign
                  name={theme === "light" ? "closesquareo" : "closesquare"}
                  size={24}
                  color={theme === "light" ? "black" : "white"}
                />
              </TouchableOpacity>
            </View>

            <ScrollView className={``}>
              <FlatList
                data={languages}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <Language {...item} addLanguage={addLanguage} />
                )}
                scrollEnabled={false} // Disable scrolling to prevent conflicts with parent ScrollView
              />
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    
  );
};

export default Languages;
