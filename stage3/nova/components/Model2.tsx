const Model = ({
  id,
  modelUrl,
  position,
  animationUrl,
  rotation,
  activeModel,
  setAnimations,
}) => {
  const modelRef = useRef();
  const currentAnimation = useStore((state) => state.models[id]?.currentAnimation);

  // Load the 3D model and animations
  const { scene, animations: modelAnimations } = useGLTF(modelUrl);
  const { animations: animation } = animationUrl ? useGLTF(animationUrl) : { animations: [] };

  // Combine animations
  const allAnimations = useMemo(() => {
    return [...modelAnimations, ...animation];
  }, [modelAnimations, animation]);

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

  // Update animations for the active model
  useEffect(() => {
    if (setAnimations && activeModel && allAnimations.length > 0) {
      const animationList = allAnimations.map((a) => a.name);
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