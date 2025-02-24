import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Canvas, useThree } from "@react-three/fiber/native";
import { OrbitControls } from "@react-three/drei/native";
import { GridHelper } from "three";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useStore } from "../hooks/useStore";
import { Asset } from "expo-asset";
import Model from "@/components/Model";

// Grid Components
const Grid = () => {
  const { scene } = useThree();
  useEffect(() => {
    const grid = new GridHelper(10, 10);
    scene.add(grid);
    return () => scene.remove(grid);
  }, [scene]);
  return null;
};

const Loader = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    }}
  >
    <ActivityIndicator size="large" color="#0000ff" />
    <Text>Loading 3D Model...</Text>
  </View>
);

export default function Index() {
  const models = useStore((state) => state.models);
  console.log("models--------", models["1"].currentAnimation)
  const bearCount = useStore((state) => state.bears);
  const incrementBears = useStore((state) => state.incrementBears);
  const setCurrentAnimation = useStore((state) => state.setCurrentAnimation);
  // console.log("setCurrentAnimation------", setCurrentAnimation)
  const [modelAssets, setModelAssets] = useState({});
  const [loading, setLoading] = useState(true);
  const model1Ref = useRef(null);
  const model2Ref = useRef(null);

  const move = useStore((state) => state.setPosition);
  const rotate = useStore((state) => state.setRotation);
  const setAnimations = useStore((state) => state.setAnimations);

  useEffect(() => {
    const resolveAssets = async () => {
      setLoading(true);
      try {
        const resolvedAssets = {
          "1": {
            modelUrl: Asset.fromModule(
              require("@assets/67b3f8773e11eea19c744165.glb")
            ).uri,
            animationUrl: Asset.fromModule(
              require("@assets/animations/M_Dances_003.glb")
            ).uri,
            animationUrl2: Asset.fromModule(
              require("@assets/animations/M_Standing_Idle_001.glb")
            ).uri,
          },
          "2": {
            modelUrl: Asset.fromModule(require("@/assets/man.glb")).uri,
            animationUrl: Asset.fromModule(
              require("@assets/animations/M_Dances_003.glb")
            ).uri,
            animationUrl2: Asset.fromModule(
              require("@assets/animations/M_Standing_Idle_001.glb")
            ).uri,
          },
        };
        console.log("resolvedAssets----", resolvedAssets)
        setModelAssets(resolvedAssets);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load assets:", error);
      }
    };

    resolveAssets();
  }, []);

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Canvas
          gl={{ physicallyCorrectLights: true }}
          camera={{ position: [-6, 0, 16], fov: 36 }}
          onCreated={(state) => {
            const _gl = state.gl.getContext();
            const pixelStorei = _gl.pixelStorei.bind(_gl);
            _gl.pixelStorei = function (...args) {
              const [parameter] = args;
              switch (parameter) {
                case _gl.UNPACK_FLIP_Y_WEBGL:
                  return pixelStorei(...args);
                default:
                  return;
              }
            };
          }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 5, 5]} intensity={1} />
          <color args={["#d1e2ef"]} attach="background" />
          <Suspense fallback={null}>
            {Object.entries(models).map(([id, model]) => {
              console.log("modelAssets-----", modelAssets)
              return (
                <Model
                  key={id}
                  modelUrl={modelAssets[id]?.modelUrl}
                  position={model.position}
                  animationUrl={modelAssets[id]?.animationUrl}
                  animationUrl2={modelAssets[id]?.animationUrl2}
                  rotation={model.rotation}
                  currentAnimation={model.currentAnimation}
                />
              );
            })}
          </Suspense>
          <Grid />

          <OrbitControls />
        </Canvas>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonSubContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setCurrentAnimation("1", "M_Dances_003")}
              >
                <Text style={styles.buttonText}>dance</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => setCurrentAnimation("1", "M_Standing_Idle_001")}
              >
                <Text style={styles.buttonText}>stand</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setCurrentAnimation("1", "F_Jog_Jump_Small_001")}
              >
                <Text style={styles.buttonText}>jump</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setCurrentAnimation("2", "M_Dances_003")}
              >
                <Text style={styles.buttonText}>dance2</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => setCurrentAnimation("2", "M_Standing_Idle_001")}
              >
                <Text style={styles.buttonText}>stand2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setCurrentAnimation("2", "F_Jog_Jump_Small_001")}
              >
                <Text style={styles.buttonText}>jump2</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => move("1", 1, 0.5)}
              >
                <Text style={styles.buttonText}>+Z</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => move("1", 1, 0.5)}
              >
                <Text style={styles.buttonText}>-Z</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
        <Text>Bear Counter: {bearCount}</Text>
        <StatusBar style="auto" />
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  buttonsContainer: {
    position: "absolute",
    gap: 10,
    bottom: 20,
    right: 0,
    height: 300,
    width: 200,
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },

  buttonSubContainer: {},
  button: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
