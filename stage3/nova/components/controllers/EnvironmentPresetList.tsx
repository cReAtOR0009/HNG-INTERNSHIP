import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Updated icon library

const environmentIcons = {
  apartment: "home-city",
  city: "city-variant",
  dawn: "weather-sunset-up",
  forest: "pine-tree",
  lobby: "office-building",
  night: "weather-night",
  park: "tree",
  studio: "broadcast",
  sunset: "weather-sunset",
};

const EnvironmentList = ({
  environmentPresets = [
    "apartment",
    "city",
    "dawn",
    "forest",
    "lobby",
    "night",
    "park",
    "studio",
    "sunset",
  ],
  setEnvironment, showEnvironments
}) => {
  const [activeEnv, setActiveEnv] = useState(null);

  const handleOnPress = (preset) => {
    setActiveEnv(preset);
    setEnvironment(preset);
  };

  return (
    showEnvironments && <View style={styles.container}>
      {environmentPresets.map((preset, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.listItem,
            activeEnv === preset ? styles.activeItem : null,
          ]}
          onPress={() => handleOnPress(preset)}
        >
          <MaterialCommunityIcons
            name={environmentIcons[preset]}
            size={activeEnv === preset ? 20 : 15}
            color="white"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 10,
    top: 60,
    width: 50,
    borderRadius: 8,
    padding: 10,
  },
  listItem: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#007bff",
    borderRadius: 8,
    marginBottom: 8,
  },
  activeItem: {
    backgroundColor: "#0056b3",
  },
});

export default EnvironmentList;
