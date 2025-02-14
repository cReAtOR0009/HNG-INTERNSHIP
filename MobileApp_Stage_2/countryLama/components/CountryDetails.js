import { View, Text } from 'react-native'
import React from 'react'

const CountryDetails = ({selectedCountry}) => {
  return (
    <View className="p-4">
             {/* <TouchableOpacity onPress={() => }>
               <Text className="text-blue-500">Back</Text>
             </TouchableOpacity> */}
             {selectedCountry && (
               <View>
                 <Text className="text-2xl font-bold">{selectedCountry.name}</Text>
                 <Text className="text-lg">
                   Capital: {selectedCountry.capital}
                 </Text>
                 <Text className="text-lg">
                   Population: {selectedCountry.population}
                 </Text>
                 <Text className="text-lg">
                   Continent: {selectedCountry.continent}
                 </Text>
                 <Text className="text-lg">
                   Currency: {selectedCountry.currency}
                 </Text>
                 <Image
                   source={{ uri: selectedCountry.href.flag }}
                   className="w-24 h-16"
                 />
               </View>
             )}
           </View>
  )
}

export default CountryDetails