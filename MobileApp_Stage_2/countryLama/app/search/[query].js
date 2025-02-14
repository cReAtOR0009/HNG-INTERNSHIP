import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountryDetails from '../../components/CountryDetails';
import EmptyList from '../../components/EmptyList';

const Query = () => {

  const { query } = useLocalSearchParams();
  const [selectedCountry, setSelectedCountry] = useState(null);

  const fetchIndividualCountry = async (name) => {
    try {
      const response = await axios.get(
        `https://restfulcountries.com/api/v1/countries/${query}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      setSelectedCountry(response.data?.data);
      // setModalVisible(true);
    } catch (error) {
       Alert.alert("Error", "Error fetching country details:")
    }
  };

  useEffect(() => {
    fetchIndividualCountry();
  }, [query]);

  return (
    <SafeAreaView>

      <FlatList 
        data={selectedCountry}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <CountryDetails selectedCountry={selectedCountry} />
        )}
        ListHeaderComponent={() => (
          <>
            {/* <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query} refetch={refetch} />
              </View>
            </View> */}
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyList />
        )}
      />

      <View>
        <Text>Query</Text>
      </View>
    </SafeAreaView>
    )
}

export default Query

const styles = StyleSheet.create({})