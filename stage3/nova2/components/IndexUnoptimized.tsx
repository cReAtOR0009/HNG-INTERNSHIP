import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Canvas, useThree } from "@react-three/fiber/native";
import useControls from "r3f-native-orbitcontrols";
// import orbita
import { GridHelper } from "three";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useStore } from "../../hooks/useStore";
import { Asset } from "expo-asset";
import Model from "../../components/Model";
import { styles } from "../../assets/styles";
import Controllers from "../../components/Controllers";

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

export default function IndexUnoptimized() {
  const models = useStore((state) => state.models);
  const [OrbitControls, events] = useControls();
  const activeModel = useStore((state) => state.activeModel);
  const setActiveModel = useStore((state) => state.setActiveModel);
  const setCurrentAnimation = useStore((state) => state.setCurrentAnimation);
  const setPosition = useStore((state) => state.setPosition);
  const setRotation = useStore((state) => state.setRotation);
  const [modelAssets, setModelAssets] = useState({});
  const [loading, setLoading] = useState(true);


  const handleMove = (id, direction) => {
    const speed = 0.1; // Movement speed
    const currentModel = models[id];
    const newPosition = [...currentModel.position];
    let newRotation = [...currentModel.rotation];

    switch (direction) {
      case "down":
        newPosition[2] -= speed; // Move forward on the Z-axis
        newRotation[1] = 0; // Face forward
        break;
      case "up":
        newPosition[2] += speed; // Move backward on the Z-axis
        newRotation[1] = Math.PI; // Face backward
        break;
      case "right":
        newPosition[0] -= speed; // Move left on the X-axis
        newRotation[1] = Math.PI / 2; // Face left
        break;
      case "left":
        newPosition[0] += speed; // Move right on the X-axis
        newRotation[1] = -Math.PI / 2; // Face right
        break;
      default:
        break;
    }

    // Check for collisions with other models
    // const collision = Object.values(models).some((model) => {
    //   if (model.id === id) return false; // Skip the current model
    //   const distance = Math.sqrt(
    //     Math.pow(newPosition[0] - model.position[0], 2) +
    //       Math.pow(newPosition[2] - model.position[2], 2)
    //   );
    //   return distance < 1; // Collision radius
    // });

    // if (!collision) {
    setRotation(id, newRotation); // Update rotation
    setPosition(id, newPosition); // Update position
    // }
  };

  useEffect(() => {
    const resolveAssets = async () => {
      setLoading(true);
      try {
        const resolvedAssets = {
          "1": {
            modelUrl: `${
              Asset.fromModule(
                require("../../assets/67b9f1c5a6521e586b0d86f0.glb")
              ).uri
            }`,
            animationUrl: `${
              Asset.fromModule(
                require("../../assets/animations/F_Dances_001.glb")
              ).uri
            }`,
            animationUrl2: `${
              Asset.fromModule(
                require("../../assets/animations/F_Walk_002.glb")
              ).uri
            }`,
            animationUrl3: `${
              Asset.fromModule(
                require("../../assets/animations/F_Standing_Idle_001.glb")
              ).uri
            }`,
          },
          "2": {
            modelUrl: `${
              Asset.fromModule(require("../../assets/man.glb")).uri
            }`,
            animationUrl: `${
              Asset.fromModule(
                require("../../assets/animations/M_Dances_007.glb")
              ).uri
            }`,
            animationUrl2: `${
              Asset.fromModule(
                require("../../assets/animations/M_Walk_001.glb")
              ).uri
            }`,
            animationUrl3: `${
              Asset.fromModule(
                require("../../assets/animations/M_Standing_Idle_001.glb")
              ).uri
            }`,
          },
        };
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
          camera={{ position: [-6, 10, 16], fov: 36 }}
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
              return (
                <Model
                  key={id}
                  modelUrl={modelAssets[id]?.modelUrl}
                  position={model.position}
                  animationUrl={modelAssets[id]?.animationUrl}
                  animationUrl2={modelAssets[id]?.animationUrl2}
                  animationUrl3={modelAssets[id]?.animationUrl3}
                  rotation={model.rotation}
                  currentAnimation={model.currentAnimation}
                  onMove={(newPosition) => setPosition(id, newPosition)} // Pass onMove prop
                  onRotate={(newRotation) => setRotation(id, newRotation)} // Pass onRotate prop
                  otherModels={Object.values(models).filter((m) => m.id !== id)}
                  activeModel={activeModel}
                />
              );
            })}
          </Suspense>
          <Grid />

          <OrbitControls />
        </Canvas>

        {/* Gaming Controls */}
        <Controllers
          setCurrentAnimation={setCurrentAnimation}
          handleMove={handleMove}
          styles={styles}
          activeModel={activeModel}
          setActiveModel={setActiveModel}
        />
      </View>
      {/* Status Bar */}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
