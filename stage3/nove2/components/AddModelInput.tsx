import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useStore } from "../hooks/useStore";
import AntDesign from '@expo/vector-icons/AntDesign';

const AddModelInput = ({ display, setDisplay }) => {
  const [modelUrl, setModelUrl] = useState("");
  const [animationUrl, setAnimationUrl] = useState("");
  const addModel = useStore((state) => state.addModel);
  const models = useStore((state) => state.models);

  const handleAddModel = () => {
    if (!modelUrl) {
      alert("Model URL is required!");
      return;
    }

    // Generate a new ID for the model
    const newId = String(Object.keys(models).length + 1);

    // Create a new model object with default parameters
    const newModel = {
      id: newId,
      modelUrl,
      animationUrl: animationUrl || "", // Optional animation URL
      position: [1, 0, 0], // Default position
      rotation: [0, Math.PI / 2, 0], // Default rotation
      animations: [], // Default animations (will be populated later)
      currentAnimation: "", // Default current animation
    };


    // Add the new model to the Zustand store
    addModel(newModel);

    // Clear the input fields
    setModelUrl("");
    setAnimationUrl("");
    setDisplay(false)
  };

  // if (display == false) return <View></View>;

  return (
    display && (
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={() => setDisplay(false)}>
          <AntDesign style={styles.closeBtn} name="closecircleo" size={20} color="white" />
            {/* <Text style={styles.closeBtn}>X</Text> */}
          </TouchableOpacity>
        </View>
        <View style={styles.InputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Model URL"
          value={modelUrl}
          onChangeText={setModelUrl}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Animation URL (optional)"
          value={animationUrl}
          onChangeText={setAnimationUrl}
        />

        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddModel}>
          <Text style={styles.buttonText}>Add Model</Text>
        </TouchableOpacity>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute", // Ensures it does not take space in layout
    top: "20%", // Adjust position as needed
    left: "10%", // Keeps it centered horizontally
    right: "10%", // Ensures it does not take full width
    width: "80%", // Limits max width
    maxWidth: 400, // Ensures it doesn’t stretch too wide
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Adds shadow effect on Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  InputContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff", // Makes input fields more visible
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeBtn: {
    position: "absolute",
    top: -15,
    right: -15,
    backgroundColor: "#007bff",
    borderRadius: 15,
    padding: 5,
  },
});

export default AddModelInput;
