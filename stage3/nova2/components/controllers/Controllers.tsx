import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { useStore } from "../../hooks/useStore";
import ModelButtons from "./ModelButtons";
import AnimationButtons from "./AnimationButtons";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const { width, height } = Dimensions.get("window");

// Reusable D-Pad Button Component
const DPadButton = ({ direction, onPress, style, styles }) => {
  const symbols = {
    up: "▲",
    down: "▼",
    left: "◀",
    right: "▶",
  };
  return (
    <TouchableOpacity
      style={[styles.dPadButton, styles[`dPad${direction}`], style]}
      onPress={onPress}
    >
      <Text style={styles.dPadText}>{symbols[direction]}</Text>
    </TouchableOpacity>
  );
};

export default function Controllers({
  handleMove,
  controllerModal,
  setShowController,
}) {
  const models = useStore((state) => state.models);
  const activeModel = useStore((state) => state.activeModel);
  const setCurrentAnimation = useStore((state) => state.setCurrentAnimation);
  const currentModel = models[activeModel];
  const walkAnimation = currentModel.animations?.find((animation) =>
    animation.toLowerCase().includes("walk")
  );

  const handleDirection = (direction) => {
    if (walkAnimation) {
      setCurrentAnimation(activeModel, walkAnimation); // Use the walk animation
    }
    handleMove(activeModel, direction); // Move in the specified direction
  };

  // Animation for modal visibility
  const modalTranslateY = new Animated.Value(height);
  useEffect(() => {
    Animated.timing(modalTranslateY, {
      toValue: controllerModal ? 0 : height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [controllerModal]);


  return (
    controllerModal && (
      <View
        style={[
          styles.controllersWrapper,
          // { transform: [{ translateY: modalTranslateY }] },
        ]}
      >
        <View style={styles.closeAddModel}>
          <TouchableOpacity onPress={() => setShowController(false)}>
            <AntDesign name="closecircleo" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.controllersContent}>
          <View style={styles.modelAnimationWrapper}>
            <ModelButtons />
            <AnimationButtons />
          </View>
          <View>
            <View style={styles.dPadWrapper}>
              <DPadButton
                direction="up"
                onPress={() => handleDirection("down")}
                styles={styles}
              />
              <DPadButton
                direction="down"
                onPress={() => handleDirection("up")}
                styles={styles}
              />
              <DPadButton
                direction="left"
                onPress={() => handleDirection("right")}
                styles={styles}
              />
              <DPadButton
                direction="right"
                onPress={() => handleDirection("left")}
                styles={styles}
              />
            </View>
          </View>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({

  closeAddModel: {
    position: "absolute",
    top: 5,
    right: 10,
    padding: 5,
    // backgroundColor: "#007bff",
    borderRadius: 10,
  },
  controllersWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: "rgba(255, 255, 255, 0.2)",
    // backgroundColor:"red",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 5,
  },
  controllersContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor:"blue",
    alignItems: "center",
  },
  modelAnimationWrapper: {
    flex: 1,
    // alignItems: "flex-start",
    // backgroundColor:"red",
    marginRight: 10,
  },
  dPadWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: width * 0.4,
  },
  dPadButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    margin: 5,
    width: width * 0.15, // Responsive width
    alignItems: "center",
  },
  dPadText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
