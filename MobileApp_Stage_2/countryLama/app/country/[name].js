import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFilteredData } from "../../redux/features/countrySlice";
import { Link, useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { filterData } from "../../utils/filterUtils"; // Ensure this path is correct

const Country = () => {
  const { name } = useLocalSearchParams();
  const filters = useSelector((state) => state.filters);
  const list = useSelector((state) => state.countries.list);
  const theme = useSelector((state) => state.theme.theme);
  const filteredData = filterData(list, filters);

  const [country, setCountry] = useState(null);
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    if (!filteredData || filteredData.length === 0 || !name) return;

    const foundCountry = filteredData.find((country) =>
      country.name.common.toLowerCase().includes(name.toLowerCase())
    );
    setCountry(foundCountry || null);

    if (foundCountry?.currencies) {
      const currencyKey = Object.keys(foundCountry.currencies)[0];
      setCurrency(foundCountry.currencies[currencyKey]);
    }

    // console.log("foundCountry", foundCountry);
  }, [name, filteredData]);

  return (
    <View
      className={`${
        theme === "light" ? "" : "bg-[#000F24]"
      } p-4 h-full font-axiregular`}
    >
      <TouchableOpacity
        onPress={() => null}
        className="flex flex-row items-center py-4 "
      >
        <Link href={"/"} className="">
          <Text className="">
            {theme === "light" ? (
              <Feather name="arrow-left" size={24} color="black" />
            ) : (
              <Feather name="arrow-left" size={24} color="white" />
            )}
          </Text>
        </Link>
        {country && (
          <Text
            className={`${
              theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
            } text-2xl font-bold ml-[20vw]`}
          >
            {country.name.common}
          </Text>
        )}
      </TouchableOpacity>

      {country ? (
        <View>
          <View className={"flex flex-row overflow-x-scroll mb-4"}>
            <Image
              source={{ uri: country?.flags?.png }}
              resizeMethod="contain"
              className="w-full h-[200px] rounded-lg"
            />
            <Image
              source={{ uri: country?.maps?.googleMaps }}
              className="w-24 h-16"
            />
            <Image
              source={{ uri: country?.maps?.openStreetMaps }}
              className="w-24 h-16"
            />
          </View>

          <View className={`mb-4`}>
            {/* Population */}
            <View className={`flex flex-row items-center`}>
              <Text
                className={`${
                  theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                } text-lg font-semibold pr-2`}
              >
                Population:
              </Text>
              <Text
                className={`${
                  theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
                } text-sm`}
              >
                {country.population}
              </Text>
            </View>

            {/* Region */}
            <View className={`flex flex-row items-center`}>
              <Text
                className={`${
                  theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                } text-lg font-semibold pr-2 `}
              >
                Region:
              </Text>
              <Text
                className={`${
                  theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
                } text-sm`}
              >
                {country.continents[0]}
              </Text>
            </View>

            {/* Capital */}
            <View className={`flex flex-row items-center`}>
              <Text
                className={`${
                  theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                } text-lg font-semibold pr-2`}
              >
                Capital:
              </Text>
              <Text
                className={`${
                  theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
                } text-sm`}
              >
                {country.capital[0]}
              </Text>
            </View>

            {/* Motto */}
            <View className={`flex flex-row items-center`}>
              <Text
                className={`${
                  theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                } text-lg font-semibold pr-2`}
              >
                Motto:
              </Text>
              <Text
                className={`${
                  theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
                } text-sm`}
              >
                {country.motto || "No motto found"}
              </Text>
            </View>
          </View>

          <View className={`mb-4`}>
            {/* Official Language */}
            <View className={`flex flex-row items-center`}>
              <Text
                className={`${
                  theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                } text-lg font-semibold pr-2`}
              >
                Official language:
              </Text>
              <Text
                className={`${
                  theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
                } text-sm`}
              >
                {Object.values(country.languages)[0] || "N/A"}
                {/* Object.values(country.languages)[0] */}
              </Text>
            </View>

            {/* Ethnic Group */}
            <View className={`flex flex-row items-center`}>
              <Text
                className={`${
                  theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                } text-lg font-semibold pr-2`}
              >
                Ethnic group:
              </Text>
              <Text
                className={`${
                  theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
                } text-sm`}
              >
                {country.group || "N/A"}
              </Text>
            </View>

            {/* Religion */}
            <View className={`flex flex-row items-center`}>
              <Text
                className={`${
                  theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                } text-lg font-semibold pr-2`}
              >
                Religion:
              </Text>
              <Text
                className={`${
                  theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
                } text-sm`}
              >
                {country.religion || "N/A"}
              </Text>
            </View>

            {/* Government */}
            <View className={`flex flex-row items-center`}>
              <Text
                className={`${
                  theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                } text-lg font-semibold pr-2`}
              >
                Government:
              </Text>
              <Text
                className={`${
                  theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
                } text-sm`}
              >
                {country.government || "N/A"}
              </Text>
            </View>
          </View>

          <View className={`mb-4`}>
            {/* Independence */}
            <View className={`flex flex-row items-center`}>
              <Text
                className={`${
                  theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                } text-lg font-semibold pr-2`}
              >
                Independence:
              </Text>
              <Text
                className={`${
                  theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
                } text-sm`}
              >
                {country.independence_date || "N/A"}
              </Text>
            </View>

            {/* Area */}
            <View className={`flex flex-row items-center`}>
              <Text
                className={`${
                  theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                } text-lg font-semibold pr-2`}
              >
                Area:
              </Text>
              <Text
                className={`${
                  theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
                } text-sm`}
              >
                {`${country.area}m²` || "N/A"}
              </Text>
            </View>

            {/* Currency */}
            <View className={`flex flex-row items-center`}>
              <Text
                className={`${
                  theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                } text-lg font-semibold pr-2`}
              >
                Currency:
              </Text>
              <Text
                className={`${
                  theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
                } text-sm`}
              >
                {currency ? `${currency.name} ${currency.symbol}` : "N/A"}
              </Text>
            </View>

            {/* GDP */}
            <View className={`flex flex-row items-center`}>
              <Text
                className={`${
                  theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                } text-lg font-semibold pr-2`}
              >
                GDP:
              </Text>
              <Text
                className={`${
                  theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
                } text-sm`}
              >
                {country.gdp || "N/A"}
              </Text>
            </View>
          </View>

          <View>
            {/* Date Format */}
            <View className={`flex flex-row items-center`}>
              <Text
                className={`${
                  theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                } text-lg font-semibold pr-2`}
              >
                Date format:
              </Text>
              <Text
                className={`${
                  theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
                } text-sm`}
              >
                {country.date_format || "N/A"}
              </Text>
            </View>

            {/* Time Zone */}
            <View className={`flex flex-row items-center`}>
              <Text
                className={`${
                  theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                } text-lg font-semibold pr-2`}
              >
                Time Zone:
              </Text>
              <Text
                className={`${
                  theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
                } text-sm`}
              >
                {country.timezones[0] || "N/A"}
              </Text>
            </View>

            {/* Dialing Code */}
            <View className={`flex flex-row items-center`}>
              <Text
                className={`${
                  theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                } text-lg font-semibold pr-2`}
              >
                Dialing code:
              </Text>
              <Text
                className={`${
                  theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
                } text-sm`}
              >
                {country.idd
                  ? `${country.idd.root} ${country.idd.suffixes[0]}`
                  : "N/A"}
              </Text>
            </View>

            {/* Driving Side */}
            <View className={`flex flex-row items-center`}>
              <Text
                className={`${
                  theme === "light" ? "text-[#1C1917]" : "text-[#F2F4F7]"
                } text-lg font-semibold pr-2`}
              >
                Driving side:
              </Text>
              <Text
                className={`${
                  theme === "light" ? "text-[#667085]" : "text-[#F2F4F7]"
                } text-sm`}
              >
                {country.car.side || "N/A"}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Text className="text-red-500 mt-4">Country not found</Text>
      )}
    </View>
  );
};

export default Country;
