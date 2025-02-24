import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Suspense, useRef, useEffect, useState } from "react";
import { Asset } from "expo-asset";
import { Canvas } from "@react-three/fiber/native";
import {
  OrbitControls,
  useGLTF,
  useAnimations,
} from "@react-three/drei/native";
import * as THREE from "three";

import Model from "../components/Model3";

const Loader = () => (
  <View style={styles.loader}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text>Loading 3D Model...</Text>
  </View>
);

export default function App() {
  const [modelUrl, setModelUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      setLoading(true);
      try {
        const asset = await `${
          Asset.fromModule(require("../assets/67b3f8773e11eea19c744165.glb")).uri
        }`;
        setModelUrl(asset);
        setLoading(false);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    loadModel();
  }, []);

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Canvas>
          <OrbitControls enablePan={true} />
          <ambientLight />
          <Suspense fallback={<Loader />}>
            {modelUrl && <Model position={[-2, 0, 0]} modelUrl={modelUrl} />}
          </Suspense>
        </Canvas>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
