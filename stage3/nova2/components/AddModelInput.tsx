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
          <AntDesign style={styles.closeBtn} name="closecircleo" size={30} color="white" />
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
    display:"flex",
    flexDirection:"column",
    padding: 10,
    paddingBlock: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  InputContainer:{
    paddingBlock:30,
    marginTop:20
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
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
    color: "white",
    backgroundColor:"#007bff",
    borderRadius:10,
    padding:5,
    top: 0,
    right: 10,
    fontWeight:"bold",
    fontSize:20
  },
});

export default AddModelInput;
