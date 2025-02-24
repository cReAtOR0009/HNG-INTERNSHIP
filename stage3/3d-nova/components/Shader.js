import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

// Define the custom shader material
const GridShaderMaterial = shaderMaterial(
  { color: new THREE.Color(0xffffff), scale: 5.0 },

  // Vertex Shader
  `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,

  // Fragment Shader
  `
  varying vec3 vPosition;
  uniform vec3 color;
  uniform float scale;

  void main() {
    float grid = abs(fract(vPosition.x * scale) - 0.5) + abs(fract(vPosition.z * scale) - 0.5);
    grid = smoothstep(0.45, 0.55, grid);  
    vec3 gridColor = mix(color, vec3(0.0), grid);
    gl_FragColor = vec4(gridColor, 1.0);
  }
  `
);

// Register the shader material with R3F
extend({ GridShaderMaterial });

export { GridShaderMaterial };
