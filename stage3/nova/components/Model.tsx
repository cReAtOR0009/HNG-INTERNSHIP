import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "../hooks/useStore";

const Model = ({
  id,
  modelUrl,
  position,
  animationUrl,
  animationUrl2,
  animationUrl3,
  animationUrl4,
  rotation,
  activeModel,
  setAnimations,
}) => {
  const modelRef = useRef();
  const currentAnimation = useStore((state) => state.models[id]?.currentAnimation);

  // Load the 3D model and animations
  const { scene, animations: modelAnimations } = useGLTF(modelUrl);
  const { animations: animation1 } = animationUrl ? useGLTF(animationUrl) : { animations: [] };
  const { animations: animation2 } = animationUrl2 ? useGLTF(animationUrl2) : { animations: [] };
  const { animations: animation3 } = animationUrl3 ? useGLTF(animationUrl3) : { animations: [] };
  const { animations: animation4 } = animationUrl4 ? useGLTF(animationUrl4) : { animations: [] };

  // Use useMemo to combine animations
  const allAnimations = useMemo(() => {
    return [
      ...modelAnimations,
      ...animation1,
      ...animation2,
      ...animation3,
      ...animation4,
    ];
  }, [modelAnimations, animation1, animation2, animation3, animation4]);

  // Use animations
  const { actions } = useAnimations(allAnimations, modelRef);


  // Play the selected animation
  useEffect(() => {
    if (!actions || !currentAnimation || !actions[currentAnimation]) return;

    // Stop any currently running animations
    Object.values(actions).forEach((action) => {
      if (action.isRunning() && action !== actions[currentAnimation]) {
        action.stop();
      }
    });

    // Play the selected animation
    actions[currentAnimation].reset().setLoop(THREE.LoopRepeat, Infinity).play();
  }, [currentAnimation, actions]);

  const animationList = allAnimations.map((a) => a.name);

  // Update animations for the active model
  useEffect(() => {
    if (setAnimations && activeModel && allAnimations.length > 0) {
      setAnimations(id, animationList);
    }
  }, [id, activeModel, allAnimations, setAnimations]);

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

export default React.memo(Model);
