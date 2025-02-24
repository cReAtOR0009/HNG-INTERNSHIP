import { useRef, useEffect } from "react";
import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import * as THREE from "three";
// import animationUrl from animationUrl

const Model = ({ modelUrl, position, currentAnimation, animationUrl, animationUrl2, rotation }) => {
  const modelRef = useRef();

  // Debugging logs
  console.log("modelUrl-----", modelUrl);
  console.log("animationUrl-----", animationUrl);
  console.log("animationUrl2-----", animationUrl2);
  console.log("position-----", position);
  console.log("currentAnimation-----", currentAnimation);
  // console.log("animationUrl-----", animationUrl);
  console.log("rotation-----", rotation);

  // Load the 3D model
  const { scene, animations: modelAnimations } = useGLTF(modelUrl);

  // Load animation data based on file extension
  let animationData = [];
  try {
    if (animationUrl.endsWith(".fbx") ) {
      const fbx = useFBX(animationUrl);
      const fbx2 = useFBX(animationUrl2);
      animationData = [...fbx.animations, ...fbx2.animations];
      console.log("fbx.animations-----", fbx.animations);
    } else if (animationUrl.endsWith(".glb") || animationUrl.endsWith(".gltf")) {
      const glb = useGLTF(animationUrl);
      const glb2 = useGLTF(animationUrl2);
      animationData = [...glb.animations, ...glb2.animations];

      console.log("animationData-----",animationData);
    } else {
      console.error("Unsupported animation file format:", animationUrl);
    }
  } catch (error) {
    console.error("Failed to load animation:", error);
  }

  // Combine model animations and loaded animations
  const allAnimations = [...modelAnimations, ...animationData];
  const { actions } = useAnimations(allAnimations, modelRef);

  // Play the selected animation
  useEffect(() => {
    if (!actions || !actions[currentAnimation]) return;

    // Stop all animations before playing the new one
    Object.values(actions).forEach((action) => action.stop());

    // Play the selected animation
    actions[currentAnimation]
      .reset()
      .setLoop(THREE.LoopRepeat, Infinity)
      .play();
  }, [currentAnimation, actions]);

  // Debugging: Log available animations
  console.log(
    "Available Animations:",
    allAnimations.map((a) => a.name)
  );

  return (
    <group
      ref={modelRef}
      position={position}
      rotation={rotation ? new THREE.Euler(...rotation) : undefined}
      scale={1.2}
    >
      <primitive object={scene} />
    </group>
  );
};

export default Model;