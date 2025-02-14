import { StyleSheet, Text, View } from "react-native";
import React from "react";

const EmptyList = () => {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-lg font-semibold text-gray-600 dark:text-gray-300">
        No countries found.
      </Text>
      <Text className="text-gray-500 dark:text-gray-400 text-center mt-2">
        Try adjusting your filters or searching for a different country.
      </Text>
    </View>
  );
};

export default EmptyList;
