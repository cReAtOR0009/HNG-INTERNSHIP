import { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, TextInput, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, resetFilters } from "../redux/features/filterSlice";
import Feather from "@expo/vector-icons/Feather";
import { filterData } from "../utils/filterUtils";

const SearchBox = () => {
  const theme = useSelector((state) => state.theme.theme);
  const searchQuery = useSelector((state) => state.filters.searchTerm);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const renderCount = useRef(0);
  renderCount.current += 1;

  useEffect(() => {
    console.log(`Component has re-rendered ${renderCount.current} times`);
  }, []);

  // Sync query state when searchQuery from Redux changes
  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery, dispatch]);

  const handleSearch = () => {
    dispatch(setSearchTerm(query.trim())); // Dispatch search term on button press
    setQuery(searchQuery);

    console.log('handleSearch clicked---')
  };

  const handleClearSearch = () => {
    dispatch(setSearchTerm("")); // Clear search term in Redux
  };

  return (
    <View
      className={`${
        theme === "light" ? "bg-[#e4e7eb]" : "bg-[#98A2B333]"
      } flex flex-row items-center justify-start space-x-4 w-full h-12 rounded-md px-4 py-0`}
    >
      <TouchableOpacity onPress={handleSearch}>
        <Feather
          name="search"
          size={24}
          color={theme === "light" ? "black" : "white"}
        />
      </TouchableOpacity>

      <TextInput
        className={`${
          theme === "light" ? "text-[#667085]" : "text-[#EAECF0]"
        } self-center flex-1 text-base`}
        value={query}
        placeholder="Search Country"
        placeholderTextColor={theme === "light" ? "#667085" : "#EAECF0"}
        onChangeText={setQuery} // Update Redux state directly
        autoCorrect={false}
      />
      {query && (

        <TouchableOpacity onPress={handleClearSearch}>
          <Text>clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBox;
