import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useStore } from "../../hooks/useStore";

const AnimationButtons = () => {
  const models = useStore((state) => state.models);
  const activeModel = useStore((state) => state.activeModel);
  const setCurrentAnimation = useStore((state) => state.setCurrentAnimation);
  const currentModel = models[activeModel];
  const currentAnimation = currentModel.currentAnimation;
  const animations = currentModel?.animations || [];

  return (
    <View style={styles.Animationscontainer}>
      {animations.map((animation, index) => (
        <TouchableOpacity
          key={index}
          style={styles.Animationsbutton}
          onPress={() => setCurrentAnimation(activeModel, animation)}
        >
          <Text style={styles.AnimationsbuttonText}>
            {animation.slice(0, 3)}..
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  Animationscontainer: {
    flexDirection: "row",
    flexWrap:"wrap",
    // backgroundColor:"red",
    justifyContent: "center",
    marginVertical: 10,
  },
  Animationsbutton: {
    backgroundColor: "#007bff",
    padding: 5,
    textAlign:"center",
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 5, // Added vertical margin for better spacing
  },
  AnimationsbuttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AnimationButtons;
