import { create } from "zustand";
import { useGLTF } from "@react-three/drei/native";

// Define the initial state for all models
const initialModels = {
  "1": {
    id: "1",
    modelUrl: "./assets/femaleglb.glb",
    animationUrl: "./assets/animations/F_Standing_Idle_001.glb",
    position: [-1, 0, 0],
    rotation: [0, Math.PI / 2, 0],
    animations: [],
    currentAnimation: "F_Talking_Variations_004",
  },
  "2": {
    id: "2",
    modelUrl: "./assets/man.glb",
    animationUrl: "./assets/animations/M_Dances_003.glb",
    position: [1, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
    animations: [],
    currentAnimation: "M_Talking_Variations_006",
  },
};


export const useStore = create((set, get) => ({
  // State for models
  models: initialModels,
  activeModel: "2",
  bears: 0,
  addModelModal: false,
  controllerModal: true,

  setShowAddModel: (open) =>
    set((state) => ({
      addModelModal: open,
    })),

  setShowController: (open) =>
    set((state) => ({
      controllerModal: open,
    })),

  // Actions for updating models
  setModelUrl: (id, url) =>
    set((state) => ({
      models: {
        ...state.models,
        [id]: {
          ...state.models[id],
          modelUrl: url,
        },
      },
    })),

  addModel: (model) =>
    set((state) => ({
      models: { ...state.models, [model.id]: model },
    })),

  setAnimationUrl: (id, url) =>
    set((state) => ({
      models: {
        ...state.models,
        [id]: {
          ...state.models[id],
          animationUrl: url,
        },
      },
    })),

  setPosition: (id,  value) =>
    set((state) => ({
      models: {
        ...state.models,
        [id]: {
          ...state.models[id],
          position:value,
        },
      },
    })),

  setRotation: (id, newRotation) =>
    set((state) => ({
      models: {
        ...state.models,
        [id]: {
          ...state.models[id],
          rotation: newRotation,
        },
      },
    })),

  setCurrentAnimation: (id, animation) =>
    set((state) => {
      // Check if the model with the given ID exists
      if (state.models[id]) {
        return {
          models: {
            ...state.models,
            [id]: {
              ...state.models[id], // Preserve other properties of the model
              currentAnimation: animation, // Update only the currentAnimation
            },
          },
        };
      }
      // If the model ID doesn't exist, return the current state without changes
      return state;
    }),

  setAnimations: (id, animations) =>
    set((state) => {
      if (state.models[id]) {
        return {
          models: {
            ...state.models,
            [id]: {
              ...state.models[id],
              animations: animations, // Update only the animations
            },
          },
        };
      }
      return state;
    }),

  handleMove: (id, direction) => {
    // Implement movement logic here
  },

  addModel: (model) =>
    set((state) => ({
      models: { ...state.models, [model.id]: model },
    })),

  removeModel: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.models;
      return { models: rest };
    }),

  // Global state actions
  incrementBears: () => set((state) => ({ bears: state.bears + 1 })),

  setActiveModel: (id) =>
    set((state) => ({
      activeModel: id,
    })),
}));
