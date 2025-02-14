import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../assets";
import { setLanguage } from "../redux/features/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

const Language = ({ value, name,  addLanguage }) => {
  const selectedLanguage = useSelector((state) => state.filters.language);
  const isSelected = selectedLanguage.includes(value);


  const handlePress = () => {
    addLanguage(value);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className={`flex flex-row justify-between py-1 mb-2`}>
        <Text>{name}</Text>
        <AntDesign
          name={`${isSelected ? "checkcircle" : "checkcircleo"}`}
          size={20}
          color="black"
        />
      </View>
    </TouchableOpacity>
  );
};

const Languages = ({isOpenLanguage, setIsOpenLanguage}) => {
  const theme = useSelector((state) => state.theme.theme);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((state) => state.filters.language);

  const addLanguage = (language) => {
    if (selectedLanguage !== language) {
      dispatch(setLanguage(language));
    }


  };
  const languages = [
    { name: "English", value: "en" },
    { name: "Arabic", value: "ara" },
    { name: "Breton", value: "bre" },
    { name: "Czech", value: "ces" },
    { name: "German", value: "deu" },
    { name: "Estonian", value: "est" },
    { name: "Finnish", value: "fin" },
    { name: "French", value: "fra" },
    { name: "Croatian", value: "hrv" },
    { name: "Hungarian", value: "hun" },
    { name: "Italian", value: "ita" },
    { name: "Japanese", value: "jpn" },
    { name: "Korean", value: "kor" },
    { name: "Persian", value: "per" },
    { name: "Polish", value: "pol" },
    { name: "Portuguese", value: "por" },
    { name: "Russian", value: "rus" },
    { name: "Slovak", value: "slk" },
    { name: "Spanish", value: "spa" },
    { name: "Serbian", value: "srp" },
    { name: "Swedish", value: "swe" },
    { name: "Turkish", value: "tur" },
    { name: "Urdu", value: "urd" },
    { name: "Chinese", value: "zho" },
  ];
  

  return (
    <Modal
      visible={isOpenLanguage}
      animationType="fade"
      transparent={false}
      onRequestClose={() => setIsOpenLanguage(false)}
    >
      {isOpenLanguage && (
        <ScrollView className={`max-h-[75vh]- px-4`}>
          <FlatList
            data={languages}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Language {...item} addLanguage={addLanguage} key={item.value} />
            )}
            ListHeaderComponent={() => (
              <View className={`flex flex-row justify-between my-4`}>
                <Text
                  className={`${
                    theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                  } text-lg font-bold`}
                >
                  Languages
                </Text>

                <TouchableOpacity onPress={() => setIsOpenLanguage(false)}>
                  <AntDesign
                    name={`${theme ? "closesquareo" : "closesquare"}`}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            )}
            scrollEnabled={false}
          />

          {/* <View className={`flex flex-row justify-between mb-4`}>
            <Text
              className={`${
                theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
              } text-lg font-bold`}
            >
              Languages
            </Text>

            <TouchableOpacity onPress={() => setIsOpenLanguage(false)}>
              <AntDesign
                name={`${theme ? "closesquareo" : "closesquare"}`}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          {isOpen && (
            <View>
              {languages.map((language) => (
                <Language {...language} addLanguage={addLanguage} />
              ))}
            </View>
          )} */}
        </ScrollView>
      )}
    </Modal>
  );
};

export default Languages;
