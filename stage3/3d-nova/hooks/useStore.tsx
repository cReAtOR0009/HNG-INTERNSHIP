import { create } from "zustand";
import { useGLTF } from "@react-three/drei/native";

// Define the initial state for all models
const initialModels = {
  "1": {
    id: "1",
    modelUrl: "./assets/67b3f8773e11eea19c744165.glb",
    animationUrl: "./assets/animations/M_Dances_003.glb",
    position: [-2, 0, 0], // Ensuring consistent object structure
    rotation: [0, Math.PI / 2, 0],
    animations: [],
    currentAnimation: "M_Standing_Idle_001",
  },
  "2": {
    id: "2",
    modelUrl: "./assets/readyplayer.glb",
    animationUrl: "./assets/animations/M_Dances_003.glb",
    position: [2, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
    animations: [],
    currentAnimation: "M_Standing_Idle_001",
  },
};

// Preload all model URLs
Object.values(initialModels).forEach((model) => {
  useGLTF.preload(model.modelUrl);
});

// Preload all model Animations
Object.values(initialModels).forEach((model) => {
  useGLTF.preload(model.animationUrl);
});

export const useStore = create((set, get) => ({
  // State for models
  models: initialModels,

  // Global state
  bears: 0,

  // Actions for updating models
  setModelUrl: (id, url) =>
    set((state) => {
      state.models[id].modelUrl = url;
    }),

  setAnimationUrl: (id, url) =>
    set((state) => {
   state.models[id].animationUrl == url;
    }),

  setPosition: (id, axis, value) =>
    set((state) => {
      state.models[id].position[axis] += value;
    }),

  setRotation: (id, axis, value) =>
    set((state) => {
      state.models[id].rotation[axis] = value;
    }),
  setCurrentAnimation: (id, value) =>
    set((state) => {
      state.model, state.models[id].currentAnimation += value;
    }),
  setAnimations: (id, animations) =>
    set((state) => {
      state.models[id].animations = animations;
    }),

  addModel: (id, model) =>
    set((state) => ({
      models: { ...state.models, [id]: model },
    })),

  removeModel: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.models;
      return { models: rest };
    }),

  // Global state actions
  incrementBears: () => set((state) => ({ bears: state.bears + 1 })),
}));
