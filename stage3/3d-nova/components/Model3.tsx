


export default Model = ({ position, modelUrl, currentAnimation = "idle" }) => {
    const modelRef = useRef();
    const { scene, animations } = useGLTF(modelUrl);
    const { actions } = useAnimations(animations, modelRef);
  
    useEffect(() => {
      if (!actions || !currentAnimation || !actions[currentAnimation]) return;
  
      Object.values(actions).forEach((action) => action.stop());
  
      const action = actions[currentAnimation];
      action.reset().setLoop(THREE.LoopRepeat, Infinity).play();
  
      return () => {
        action.fadeOut(0.3);
      };
    }, [currentAnimation, actions]);
  
    return (
      <group ref={modelRef} position={position} scale={1.2}>
        <primitive object={scene} />
      </group>
    );
  };