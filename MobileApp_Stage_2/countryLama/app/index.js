import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { timezones, continents } from "../assets";
import { fetchCountries } from "../redux/features/countrySlice";
import { setTheme } from "../redux/features/themeSlice";
import { Link } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import SearchBox from "../components/SearchBox";
import Country from "../components/Country";
import Language from "../components/Languages";
import Checkboxes from "../components/Checkboxes";
import EmptyList from "../components/EmptyList";
import { filterData } from "../utils/filterUtils";
import { groupCountries } from "../utils/groupCountries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { resetFilters } from "../redux/features/filterSlice";

export default function Home() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const toggleTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem("theme");
      const newTheme = storedTheme === "light" ? "dark" : "light";
      dispatch(setTheme(newTheme));
    } catch (error) {
      Alert.alert("Error", "error setting theme");
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);

  // Redux state
  const { list, status, error } = useSelector((state) => state.countries);
  const filters = useSelector((state) => state.filters);

  // Memoized filtered data
  const filteredCountries = useMemo(
    () => filterData(list, filters),
    [list, filters]
  );
  const groupedCountries = useMemo(
    () => groupCountries(filteredCountries),
    [filteredCountries, filters]
  );

  // Fetch countries on mount
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  // Handle refresh
  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(fetchCountries());
    dispatch(resetFilters());
    setRefreshing(false);
  };

  // Handle show results from modal
  const handleShowResults = () => {
    setIsModalVisible(false);
  };

  // Render loading state
  if (status === "loading") {
    return (
      <View className="flex-1 flex items-center justify-center bg-white dark:bg-[#000F24]">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-xl font-semibold mt-4 text-gray-700 dark:text-gray-300">
          Loading countries...
        </Text>
      </View>
    );
  }

  // Render error state
  if (status === "failed") {
    return (
      <View className="flex-1 flex items-center justify-center bg-white dark:bg-[#000F24] p-4">
        <Text className="text-xl font-semibold text-red-500">
          Error loading countries...
        </Text>
        <Text className="text-gray-700 dark:text-gray-300 mt-2">{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      className={`h-full ${theme === "light" ? "bg-white" : "bg-[#000F24]"}`}
    >
      <FlatList
        data={groupedCountries}
        keyExtractor={(country) => country.letter}
        renderItem={({ item }) => (
          <View className={`ml-4 mt-4`}>
            {/* Header for the letter */}
            <Text className={`${theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"} flex-1 text-base`}>{item.letter}</Text>
            {/* List of countries for the letter */}
            {item.data.map((country) => (
              <View key={country.name.common} className={`mt-4 w-full`}>
                <Link href={`country/${country.name.common}`}>
                  <Country
                    name={country.name.common}
                    thumbnail={country.flags.png}
                    capital={country.capital?.[0] || "Unknown"} // Handle missing capital
                  />
                </Link>
              </View>
            ))}
          </View>
        )}
        // <Link href={`country/${item.name.common}`}>
        //   <Country
        //     name={item.name.common}
        //     thumbnail={item.flags.png}
        //     capital={item.capital}
        //   />
        // </Link>
        // )}
        ListHeaderComponent={
          <Header
            theme={theme}
            toggleTheme={toggleTheme}
            setIsOpenLanguage={setIsOpenLanguage}
            setIsModalVisible={setIsModalVisible}
            isSelectedLanguage={filters.language.toUpperCase()}
          />
        }
        stickyHeaderIndices={[0]}
        ListEmptyComponent={<EmptyList />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#007bff"]}
          />
        }
        initialNumToRender={10} // Render only 10 items initially
        maxToRenderPerBatch={10} // Render 10 items per batch
        windowSize={21} // Render 21 items in memory (10 above + 10 below + 1 visible)
        removeClippedSubviews={true}
      />

      {/* Language Dropdown */}
      {isOpenLanguage && (
        <Language
          isOpenLanguage={isOpenLanguage}
          setIsOpenLanguage={setIsOpenLanguage}
        />
      )}

      {/* Filter Modal */}
      {isModalVisible && (
        <Checkboxes
          checkLists={timezones}
          continents={continents}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onShowResults={handleShowResults}
        />
      )}
    </SafeAreaView>
  );
}

// Header Component
const Header = ({
  theme,
  toggleTheme,
  setIsOpenLanguage,
  setIsModalVisible,
  isSelectedLanguage,
}) => (
  <View
    className={`${
      theme === "light" ? "bg-white" : "bg-[#000F24]"
    } mb-4 px-4 space-y-6`}
  >
    <View className="flex justify-between items-center flex-row py-8">
      <Text
        className={`text-3xl font-bold ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        Explore
      </Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Feather
          name="sun"
          size={24}
          color={theme === "light" ? "black" : "white"}
        />
      </TouchableOpacity>
    </View>

    <SearchBox />

    <View className="flex-row justify-between items-center pb-2">
      <TouchableOpacity
        onPress={() => setIsOpenLanguage(true)}
        className="flex-row items-center p-2 border border-[#A9B8D4]"
      >
        <Feather
          name="globe"
          size={24}
          color={theme === "light" ? "black" : "white"}
        />
        <Text
          className={`ml-2 ${
            theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
          }`}
        >
          {isSelectedLanguage}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="flex-row items-center p-2 border border-[#A9B8D4]"
      >
        <Feather
          name="filter"
          size={24}
          color={theme === "light" ? "black" : "white"}
        />
        <Text
          className={`ml-2 ${
            theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
          }`}
        >
          Filter
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

// const ContryList =  groupedData.map((groupedCountries) => {
//   return (
//     <>
//     <>{groupCountries.letter}
//       {groupCountries.data.map((countryListByAlpabet) => {
//         return <>{countryListByAlpabet.capital}</>;
//       })}
//     </>
//     </>
//   );
// });
