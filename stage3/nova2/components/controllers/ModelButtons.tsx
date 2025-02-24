import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useStore } from "../../hooks/useStore";

const { width } = Dimensions.get("window");

const ModelButtons = () => {
  const models = useStore((state) => state.models);
  const setActiveModel = useStore((state) => state.setActiveModel);
  const activeModel = useStore((state) => state.activeModel);


  return (
    <View style={styles.modelButtonsWrapper}>
      {Object.values(models).map((model) => (
        <TouchableOpacity
          key={model.id}
          style={[
            styles.modelButton,
            activeModel === model.id && styles.activeModelButton,
          ]}
          onPress={() => setActiveModel(model.id)}
        >
          <Text style={styles.modelButtonText}>M{model.id}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  modelButtonsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  modelButton: {
    backgroundColor: "#007bff",
    paddingBlock: 5,
    borderRadius: 20,
    margin: 2,
    width: width * 0.15, // Responsive width
    alignItems: "center",
  },
  activeModelButton: {
    backgroundColor: "#0056b3",
  },
  modelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default ModelButtons;
