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

  // Sync query state when searchQuery from Redux changes
  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery, dispatch]);

  const handleSearch = () => {
    dispatch(setSearchTerm(query.trim())); // Dispatch search term on button press
    setQuery(searchQuery);
  };

  const handleClearSearch = () => {
    dispatch(setSearchTerm(""));
    dispatch(resetFilters())
  };

  return (
    <View
      className={`${
        theme === "light" ? "bg-[#e4e7eb]" : "bg-[#98A2B333]"
      } flex flex-row items-center justify-start space-x-4 w-full h-12 rounded-md px-4 py-0`}
    >
      <TouchableOpacity
        onPress={handleSearch}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <Feather
          name="search"
          size={24}
          color={theme === "light" ? "black" : "white"}
        />
      </TouchableOpacity>

      <TextInput
        className={`font-axiregular text-base font-light  ${
          theme === "light" ? "text-[#667085]" : "text-[#EAECF0]"
        } self-center flex-1 text-base`}
        value={query}
        placeholder="Search Country"
        placeholderTextColor={theme === "light" ? "#667085" : "#EAECF0"}
        onChangeText={setQuery} // Update Redux state directly
        autoCorrect={false}
      />
      {query && (
        <TouchableOpacity onPress={handleClearSearch} className={`p-4`}>
          <Text className={``}>clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBox;
