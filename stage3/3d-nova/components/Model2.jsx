import { useState, useRef, useEffect } from "react";
import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const GridBox = ({ size = 2 }) => {
  const vertices = new Float32Array([
    -size,
    size,
    size,
    size,
    size,
    size, // Top front
    -size,
    -size,
    size,
    size,
    -size,
    size, // Bottom front
    -size,
    size,
    -size,
    size,
    size,
    -size, // Top back
    -size,
    -size,
    -size,
    size,
    -size,
    -size, // Bottom back
    -size,
    size,
    size,
    -size,
    size,
    -size, // Top left
    size,
    size,
    size,
    size,
    size,
    -size, // Top right
    -size,
    -size,
    size,
    -size,
    -size,
    -size, // Bottom left
    size,
    -size,
    size,
    size,
    -size,
    -size, // Bottom right
  ]);

  return (
    <lineSegments>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={vertices}
          count={vertices.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial attach="material" color="red" />
    </lineSegments>
  );
};

// Model Component with Suspense
const Model2 = ({
  modelUrl,
  position,
  currentAnimation,
  animationUrl,
  rotation,
  animations_,
}: any) => {
  const modelRef = useRef();
  const { scene, animations }: any = useGLTF(modelUrl);
  // const fbx = useFBX(animationUrl);
  // const { actions } = useAnimations(fbx.animations, modelRef);
  const { actions }: any = useAnimations(animations, modelRef);
  useEffect(() => {
    if (!actions || !currentAnimation || !actions[currentAnimation]) return;

    // Stop all animations
    Object.values(actions).forEach((action) => action.stop());

    // Play the selected animation
    const action = actions[currentAnimation];
    action.reset().setLoop(THREE.LoopRepeat, Infinity).play();

    return () => {
      action.fadeOut(0.3); // Smooth transition when switching animations
    };
  }, [currentAnimation, actions]);

  // Apply Wireframe to All Materials
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child: any) => {
      if (child.isMesh) {
        const wireframe = new THREE.WireframeGeometry(child.geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });

        const wireframeMesh = new THREE.LineSegments(wireframe, lineMaterial);
        child.add(wireframeMesh); // Attach to original mesh
      }
    });
  }, [scene]);

  useEffect(() => {
    let frameId;
    const animate = () => {
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.02; // Adjust speed as needed
      }
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  console.log(
    "model2",
    animations.map((a) => a.name)
  ); // Logs all available animations

  return (
    <group ref={modelRef} position={position} scale={1.2}>
      <primitive object={scene} />
      {/* <GridBox size={1} /> */}
    </group>
  );
};

export default Model2;
