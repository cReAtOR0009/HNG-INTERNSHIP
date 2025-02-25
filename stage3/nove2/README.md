# 3D Model Viewer and Controller App 👋

## Overview

This project is a 3D Model Viewer and Controller App built using [React Native], [Expo](https://expo.dev), [Three.js], and React Three Fiber using animations and Models from the readyPlayerme website and repository. It allows users to:

1. View and interact with 3D models in a 3D environment.

2. Control models using a directional pad (D-pad) and animation buttons.

3. Add new models dynamically via a form.

4. Switch between multiple models and animations seamlessly.

The app is designed to be responsive and user-friendly, with smooth animations and intuitive controls.

## Features

- Features
- 3D Model Rendering:
- Render 3D models in a 3D scene using Three.js and React Three Fiber.
- Support for both local assets (e.g., GLB files) and remote URLs.
- Model Controllers:
- D-Pad: Move models in four directions (up, down, left, right).
- Animation Buttons: Play specific animations (e.g., walk, dance, idle) for each model.
- Dynamic Model Addition:
- Add new models dynamically via a form.
- Support for custom model URLs and animation URLs(GLB).

## State Management:

- Use Zustand for global state management to handle models, animations, and active states.

- Responsive Design:

- The app is optimized for mobile devices, with a clean and intuitive UI.

- Smooth Animations:

- Use React Three Fiber's useAnimations hook to handle model animations.

- Seamlessly rendering and switch between animations based on model and user input.

- Environment and Lighting using three fiber Environment:

- Add a procedural sky and environment lighting to enhance the 3D scene.

## Tech Stack

- Frontend:

- React Native: For building the mobile app.

- Expo: For development and deployment.

- Three.js: For 3D rendering.

- React Three Fiber: A React renderer for Three.js.

- Zustand: For state management.

- 3D Assets:

- GLB/GLTF: 3D model formats supported by Three.js.

- Expo Asset: For resolving local assets.

- UI Components:

- React Native Elements: For buttons, inputs, and other UI components.

- Icons: Using @expo/vector-icons for icons.

**Challenges and Solutions**

1. Dynamic Model Addition
   Challenge: Adding new models dynamically while ensuring their assets (e.g., model URL, animations) are resolved correctly.

- Solution:

  Created a form (AddModelInput) to input model and animation URLs.

  Created a new Model Component to render added Models dynamically, since they wont need to be "resolved' by expo asset as they are added via url

  Used a Zustand store to manage the state of all models.

  Implemented a resolveAsset function to handle both local and remote assets:

```
   const resolveAsset = (asset) => {
  if (typeof asset === "string" && asset.startsWith("http")) {
    return asset; // Remote URL
  } else if (typeof asset === "string") {
    return Asset.fromModule(require(asset)).uri; // Local asset
  }
  return asset; // Already resolved
};
```

2. **Animation Handling**

Challenge: Playing and switching animations for models dynamically.

- Solution:

  Used React Three Fiber's useAnimations hook to load and control animations.

  Stored animations in the Zustand store and updated them dynamically:

```
const { actions } = useAnimations(allAnimations, modelRef);
useEffect(() => {
  if (actions && currentAnimation) {
    actions[currentAnimation]?.reset().play();
  }
}, [currentAnimation, actions]);

```

3. **Responsive D-Pad and Controllers**
   Challenge: Creating a responsive and intuitive D-pad for model movement.

- Solution:

  Designed a circular D-pad with directional buttons (up, down, left, right).

  Used React Native's TouchableOpacity for button interactions.

  Implemented movement logic using Three.js vectors:

```
const handleMove = (id, direction) => {
  const speed = 0.1;
  const newPosition = new THREE.Vector3(...models[id].position);
  switch (direction) {
    case "up": newPosition.z -= speed; break;
    case "down": newPosition.z += speed; break;
    case "left": newPosition.x -= speed; break;
    case "right": newPosition.x += speed; break;
  }
  setPosition(id, newPosition.toArray());
};

```

5. **Performance Optimization**
   Challenge: Ensuring smooth performance with multiple models and animations.

- Solution:

  Used React.memo to prevent unnecessary re-renders of the Model component.

  Memoized expensive computations (e.g., resolvedAssets) using useMemo:

  Ensure assets are made available before run time using expo asset

```
const resolvedAssets = useMemo(() => {
  const assets = {};
  Object.entries(models).forEach(([id, model]) => {
    assets[id] = {
      modelUrl: resolveAsset(model.modelUrl),
      animationUrl: resolveAsset(model.animationUrl),
    };
  });
  return assets;
}, [models]);
```

### Prerequisites

- **Node.js** (v16 or higher) installed on your machine.
- **Expo CLI** installed globally:
  ```bash
  npm install -g expo-cli
  ```

**Cloning the Repository:**

```bash
git clone https://github.com/cReAtOR0009/HNG-INTERNSHIP/tree/master/stage3
cd nova
```

**Install Dependencies:**

```bash
npm install
```

**Start the Development Server:**

```bash
expo start
```

**Run on a Device or Emulator:**
-Scan the QR code with the Expo Go app (available on iOS and Android).
-Alternatively, run on an emulator:.

```bash
expo start --android
```

    or

```bash
expo start --ios
```

```
/src
|-- assets/                # 3D models and animations
|-- components/            # Reusable components (e.g., Model, Controllers)
|-- hooks/                 # Custom hooks (e.g., useStore for Zustand)
|-- screens/               # Main screens (e.g., Home, AddModel)
|-- styles/                # Global styles
|-- app.js                 # Main entry point
|-- README.md              # Project documentation

```

### 🤝 Contributing

**We welcome contributions to improve the app! Here’s how you can contribute:**

**1. Fork the Repository:**

```bash
git clone https://github.com/cReAtOR0009/HNG-INTERNSHIP/tree/master/stage3
```

**2. Create a New Branch:**

```bash
git checkout -b feature/your-feature-name
```

**3. Commit Your Changes:**

```bash
git commit -m "Add your commit message"
```

**4. Push to the Branch:**

```bash
git push origin feature/your-feature-name
```

**5. Open a Pull Request:**
-Describe your changes and why they are necessary.

### 📄 License

**This project is licensed under the MIT License. See the <a href="https://opensource.org/license/mit" target="_blank"> LICENSE file for details.**
