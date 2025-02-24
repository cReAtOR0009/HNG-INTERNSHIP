import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useStore } from "../../hooks/useStore";
// import { styles } from "@/assets/styles";

const DirectionalButtons = () => {
  const models = useStore((state) => state.models);
  const activeModel = useStore((state) => state.activeModel);
  const setCurrentAnimation = useStore((state) => state.setCurrentAnimation);
  const handleMove = useStore((state) => state.handleMove);

  const currentModel = models[activeModel];
  const hasWalkAnimation = currentModel?.animations?.some((animation) =>
    animation.toLowerCase().includes("walk")
  );

  const handleDirection = (direction) => {
    if (hasWalkAnimation) {
      setCurrentAnimation(activeModel, "Walk"); // Use walk animation
    }
    handleMove(activeModel, direction); // Move in the specified direction
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.upButton]}
        onPress={() => handleDirection("up")}
      >
        <Text style={styles.buttonText}>▲</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.downButton]}
        onPress={() => handleDirection("down")}
      >
        <Text style={styles.buttonText}>▼</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.leftButton]}
        onPress={() => handleDirection("left")}
      >
        <Text style={styles.buttonText}>◀</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.rightButton]}
        onPress={() => handleDirection("right")}
      >
        <Text style={styles.buttonText}>▶</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DirectionalButtons;
