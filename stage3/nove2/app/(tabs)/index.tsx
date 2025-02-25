import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { Canvas, useThree } from "@react-three/fiber/native";
import useControls from "r3f-native-orbitcontrols";
import { Sky, Environment, Lightformer } from "@react-three/drei";
import { Color, GridHelper } from "three";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useStore } from "../../hooks/useStore";
import { Asset } from "expo-asset";
import Model from "../../components/Model";
import { styles } from "../../assets/styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import Controllers from "../../components/controllers/Controllers";
import AddModelInput from "../../components/AddModelInput";
import * as THREE from "three";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import EnvironmentPresetList from "../../components/controllers/EnvironmentPresetList";

// Grid Component
const Grid = () => {
  const { scene } = useThree();
  useEffect(() => {
    const grid = new GridHelper(
      10,
      10,
      new Color(0x444444),
      new Color(0x888888)
    );
    scene.add(grid);
    return () => scene.remove(grid);
  }, [scene]);
  return null;
};

// Loader Component
const Loader = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text>Loading 3D Model...</Text>
  </View>
);

export default function Index() {
  const models = useStore((state) => state.models);
  const [OrbitControls, events] = useControls();
  const activeModel = useStore((state) => state.activeModel);
  const setAnimations = useStore((state) => state.setAnimations);
  const setPosition = useStore((state) => state.setPosition);
  const setRotation = useStore((state) => state.setRotation);
  const [loading, setLoading] = useState(true);
  const addModelModal = useStore((state) => state.addModelModal);
  const controllerModal = useStore((state) => state.controllerModal);
  const setShowAddModel = useStore((state) => state.setShowAddModel);
  const setShowController = useStore((state) => state.setShowController);
  const [environment, setEnvironment] = useState("dawn")
  const [showEnvironments, setShowEnvironments] = useState(false)

  

  useEffect(() => {
    setLoading(false);
  }, [models]);

  // Handle movement with useCallback to avoid recreation
  const handleMove = useCallback(
    (id, direction) => {
      const speed = 0.1; // Movement speed
      const currentModel = models[id];
  
      // Create a new position vector based on the current position
      const newPosition = new THREE.Vector3(...currentModel.position);
  
      // Create a new rotation vector based on the current rotation
      const newRotation = new THREE.Euler(...currentModel.rotation);
  
      // Update position and rotation based on direction
      switch (direction) {
        case "up":
          newPosition.z -= speed; // Move forward on the Z-axis
          newRotation.y = 0; // Face forward
          break;
        case "down":
          newPosition.z += speed; // Move backward on the Z-axis
          newRotation.y = Math.PI; // Face backward
          break;
        case "left":
          newPosition.x -= speed; // Move left on the X-axis
          newRotation.y = Math.PI / 2; // Face left
          break;
        case "right":
          newPosition.x += speed; // Move right on the X-axis
          newRotation.y = -Math.PI / 2; // Face right
          break;
        default:
          break;
      }
  
      // Update the model's position and rotation
      setPosition(id, newPosition.toArray());
      setRotation(id, [newRotation.x, newRotation.y, newRotation.z]);
    },
    [models, setPosition, setRotation]
  );

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Canvas
          {...events}
          gl={{ physicallyCorrectLights: true }}
          camera={{ position: [0, 5, 15], fov: 50 }} // Adjusted camera position and FOV
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
          <OrbitControls
            makeDefault
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
          {/* Lighting */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          {/* Environment Lighting */}
          <Environment
            preset={environment} // Use a preset environment
            background // Set as scene background
            ground={{ height: 10, radius: 30, scale: 100 }} // Add ground for better positioning
          >
            <Lightformer
              form="rect"
              intensity={5} // Increased intensity
              position={[2, 5, 5]} // Adjusted position
              scale={[5, 5]} // Adjusted scale
            />
            <Lightformer
              form="rect"
              intensity={5} // Increased intensity
              position={[-2, 5, -5]} // Adjusted position
              scale={[5, 5]} // Adjusted scale
            />
          </Environment>

          {/* Add procedural sky */}
          <Sky
            distance={1000} // Reduced distance for better visibility
            sunPosition={[0, 1, 0]} // Position of the sun
            inclination={0} // Sun inclination
            azimuth={0.25} // Sun azimuth
          />

          {/* Models */}
          <Suspense fallback={null}>
            {Object.entries(models)
              .slice(0, 2) // Render the first 2 models 
              .map(([id, model]) => {
                return (
                  <Model
                    key={id}
                    id={id}
                    modelUrl={model.modelUrl} 
                    position={model.position}
                    animationUrl={model.animationUrl}
                    animationUrl2={model.animationUrl2}
                    animationUrl3={model.animationUrl3}
                    animationUrl4={model.animationUrl4}
                    rotation={model.rotation}
                    currentAnimation={model.currentAnimation}
                    setAnimations={setAnimations}
                    onMove={(newPosition) => setPosition(id, newPosition)}
                    onRotate={(newRotation) => setRotation(id, newRotation)}
                    otherModels={Object.values(models).filter(
                      (m) => m.id !== id
                    )}
                    activeModel={activeModel}
                  />
                );
              })}
            {Object.entries(models)
              .slice(2) // Render the remaining models directly from the models state
              .map(([id, model]) => {
                return (
                  <Model
                    key={id}
                    id={id}
                    modelUrl={model.modelUrl} // Directly access model.modelUrl
                    position={model.position}
                    animationUrl={model.animationUrl} // Directly access model.animationUrl
                    rotation={model.rotation}
                    currentAnimation={model.currentAnimation}
                    setAnimations={setAnimations}
                    onMove={(newPosition) => setPosition(id, newPosition)}
                    onRotate={(newRotation) => setRotation(id, newRotation)}
                    otherModels={Object.values(models).filter(
                      (m) => m.id !== id
                    )}
                    activeModel={activeModel}
                  />
                );
              })}
          </Suspense>
          {/* <Grid /> */}
        </Canvas>

        {/* Gaming Controls */}
        {/* {controllerModal ? ( */}
       
        <Controllers
          handleMove={handleMove}
          controllerModal={controllerModal}
          setShowController={setShowController}
        />
        <AddModelInput display={addModelModal} setDisplay={setShowAddModel} />

        {/* show open add model  */}
        <View style={styles.openAddModel}>
          <TouchableOpacity onPress={() => setShowAddModel(!addModelModal)}>
            <AntDesign name="pluscircleo" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.openController}>
          <TouchableOpacity onPress={() => setShowController(!controllerModal)}>
            <SimpleLineIcons name="game-controller" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.openSetEnvironment}>
          <TouchableOpacity onPress={() => setShowEnvironments(!showEnvironments)}>
            <SimpleLineIcons name="map" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <EnvironmentPresetList setEnvironment={setEnvironment} showEnvironments={showEnvironments} />
        {/* <AnimationButtons />
        <DirectionalButtons />
        <ModelButtons /> */}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
