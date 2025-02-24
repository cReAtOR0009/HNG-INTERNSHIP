import { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei/native";
import * as THREE from "three";

const ModelUnoptimized = ({
  modelUrl,
  position,
  currentAnimation,
  animationUrl,
  animationUrl2,
  animationUrl3,
  rotation,
  onMove,
  otherModels,
  activeModel,
}) => {
  const modelRef = useRef();

  // Load the 3D model
  const { scene, animations: modelAnimations } = useGLTF(modelUrl);

  // Load animations safely
  const glb = animationUrl ? useGLTF(animationUrl) : { animations: [] };
  const glb2 = animationUrl2 ? useGLTF(animationUrl2) : { animations: [] };
  const glb3 = animationUrl3 ? useGLTF(animationUrl3) : { animations: [] };

  // Combine model animations and loaded animations
  const animationData = [
    ...(glb?.animations || []),
    ...(glb2?.animations || []),
    ...(glb3?.animations || []),
  ];
  const allAnimations = useMemo(
    () => [...modelAnimations, ...animationData],
    [modelAnimations, animationData]
  );

  // Use animations
  const { actions } = useAnimations(allAnimations, modelRef);

  // Play the selected animation safely
  useEffect(() => {
    const originalMaterials = new Map();
    scene.traverse((child) => {
      if (child.isMesh) {
        originalMaterials.set(child, child.material.clone());
      }
    });

    if (!actions || !actions[currentAnimation]) return;

    // Stop all animations before playing the new one
    Object.values(actions).forEach((action) => action.stop());

    const action = actions[currentAnimation];
    if (actions && actions[currentAnimation]) {
      Object.values(actions).forEach((action) => action.stop());
      const action = actions[currentAnimation];
      if (action) {
        action.reset().setLoop(THREE.LoopRepeat, Infinity).play();
      }
    }

    // Reapply materials if necessary
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.needsUpdate = true;
      }
    });
  }, [currentAnimation, actions, activeModel, scene]);

  // Handle movement
  useEffect(() => {
    if (onMove) {
      const handleMove = (direction) => {
        const speed = 0.1;
        const newPosition = new THREE.Vector3(...position);

        switch (direction) {
          case "forward":
            newPosition.z -= speed;
            break;
          case "backward":
            newPosition.z += speed;
            break;
          case "left":
            newPosition.x -= speed;
            break;
          case "right":
            newPosition.x += speed;
            break;
          default:
            break;
        }

        // Check for collisions with other models
        const collision = otherModels.some((model) => {
          const distance = newPosition.distanceTo(
            new THREE.Vector3(...model.position)
          );
          return distance < 1; // Adjust collision radius as needed
        });

        if (!collision) {
          onMove(newPosition.toArray());
        }
      };

      // Add event listeners or buttons for movement
      // Example: Attach to buttons in the UI
    }
  }, [position, onMove, otherModels, currentAnimation]);

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

export default ModelUnoptimized;
