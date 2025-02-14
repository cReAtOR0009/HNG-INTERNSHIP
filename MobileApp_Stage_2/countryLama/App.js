import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import DebugWrapper from "./components/DebugWrapper"; // Import DebugWrapper
import "./global.css";

export default function App() {
  return (
    <Provider store={store}>
      <DebugWrapper>
        <View style={styles.container}>
          <Text className="text-red-50 font-bold test">
            Open up App.js to start working on your app!
          </Text>
          <StatusBar style="auto" />
        </View>
      </DebugWrapper>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
