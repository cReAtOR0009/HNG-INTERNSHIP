// hooks/useResolveAssets.js
import { useState, useEffect } from "react";
import { Asset } from "expo-asset";

const useResolveAssets = () => {
  const [assets, setAssets] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resolveAssets = async () => {
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
            animationUrl4: `${
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
                require("../../assets/animations/M_Dances_003.glb")
              ).uri
            }`,
            animationUrl2: `${
              Asset.fromModule(
                require("../../assets/animations/F_Jog_Jump_Small_001.glb")
              ).uri
            }`,
            animationUrl3: `${
              Asset.fromModule(
                require("../../assets/animations/M_Standing_Idle_001.glb")
              ).uri
            }`,
            animationUrl4: `${
              Asset.fromModule(
                require("../../assets/animations/M_Standing_Idle_001.glb")
              ).uri
            }`,
          },
        };
        setAssets(resolvedAssets);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load assets:", error);
        setLoading(false);
      }
    };

    resolveAssets();
  }, []);

  return { assets, loading };
};

export default useResolveAssets;
