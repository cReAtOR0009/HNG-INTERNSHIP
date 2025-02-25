const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('glb', 'gltf'); // Add any additional file extensions you need
config.resolver.sourceExts.push('jsx', 'js', 'ts', 'tsx', 'glb'); // Ensure these are included

module.exports = config;