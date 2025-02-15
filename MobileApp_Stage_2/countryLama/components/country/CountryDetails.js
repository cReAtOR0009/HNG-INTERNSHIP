
import { View, Image, ScrollView } from "react-native";
import CountryHeader from "./CountryHeader";
import CountryInfoRow from "./CountryInfoRow";
import { useSelector } from "react-redux";

const CountryDetails = ({ country, theme }) => {
    const currency = country?.currencies
      ? Object.values(country.currencies)[0]
      : null;
  
    return (
      <ScrollView className="p-4">
        {/* Header */}
        <CountryHeader country={country} theme={theme} />
  
        {/* Flag and Maps */}
        <View className="flex flex-row overflow-x-scroll mb-4">
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
  
        {/* Country Information */}
        <View className="mb-4">
          <CountryInfoRow
            label="Population"
            value={country?.population}
            theme={theme}
          />
          <CountryInfoRow
            label="Region"
            value={country?.continents?.[0]}
            theme={theme}
          />
          <CountryInfoRow
            label="Capital"
            value={country?.capital?.[0] || "N/A"}
            theme={theme}
          />
          <CountryInfoRow
            label="Motto"
            value={country?.motto || "N/A"}
            theme={theme}
          />
        </View>
  
        {/* Language and Ethnicity */}
        <View className="mb-4">
          <CountryInfoRow
            label="Official Language"
            value={
              country?.languages
                ? Object.values(country.languages)[0] || "N/A"
                : "N/A"
            }
            theme={theme}
          />
          <CountryInfoRow
            label="Ethnic Group"
            value={country?.group || "N/A"}
            theme={theme}
          />
          <CountryInfoRow
            label="Religion"
            value={country?.religion || "N/A"}
            theme={theme}
          />
          <CountryInfoRow
            label="Government"
            value={country?.government || "N/A"}
            theme={theme}
          />
        </View>
  
        {/* Economy */}
        <View className="mb-4">
          <CountryInfoRow
            label="Independence"
            value={country?.independence_date || "N/A"}
            theme={theme}
          />
          <CountryInfoRow
            label="Area"
            value={country?.area ? `${country.area}m²` : "N/A"}
            theme={theme}
          />
          <CountryInfoRow
            label="Currency"
            value={
              currency
                ? `${currency.name || "N/A"} ${currency.symbol || ""}`
                : "N/A"
            }
            theme={theme}
          />
          <CountryInfoRow
            label="GDP"
            value={country?.gdp || "N/A"}
            theme={theme}
          />
        </View>
  
        {/* Miscellaneous */}
        <View>
          <CountryInfoRow
            label="Date Format"
            value={country?.date_format || "N/A"}
            theme={theme}
          />
          <CountryInfoRow
            label="Time Zone"
            value={country?.timezones?.[0] || "N/A"}
            theme={theme}
          />
          <CountryInfoRow
            label="Dialing Code"
            value={
              country?.idd?.root && country?.idd?.suffixes?.[0]
                ? `${country.idd.root} ${country.idd.suffixes[0]}`
                : "N/A"
            }
            theme={theme}
          />
          <CountryInfoRow
            label="Driving Side"
            value={country?.car?.side || "N/A"}
            theme={theme}
          />
        </View>
      </ScrollView>
    );
  };

  export default CountryDetails
  