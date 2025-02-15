import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import { filterData } from "../../utils/filterUtils";
import CountryDetails from "../../components/country/CountryDetails";

const Country = () => {
  const { name } = useLocalSearchParams();
  const filters = useSelector((state) => state.filters);
  const list = useSelector((state) => state.countries.list);
  const theme = useSelector((state) => state.theme.theme);
  const filteredData = filterData(list, filters);

  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!filteredData || filteredData.length === 0 || !name) return;

    const foundCountry = filteredData.find((country) =>
      country.name.common.toLowerCase().includes(name.toLowerCase())
    );
    setCountry(foundCountry || null);
  }, [name, filteredData]);

  return (
    <View
      className={`${
        theme === "light" ? "" : "bg-[#000F24]"
      } h-full font-axiregular`}
    >
      {country ? (
        <CountryDetails country={country} theme={theme} />
      ) : (
        <Text className="text-red-500 mt-4 p-4">Country not found</Text>
      )}
    </View>
  );
};

export default Country;