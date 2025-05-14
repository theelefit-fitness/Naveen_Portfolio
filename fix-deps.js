const fs = require('fs');

// Read the package.json file
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// Update the version to fixed ones that are compatible
packageJson.dependencies['@react-three/drei'] = '9.88.7';
packageJson.dependencies['@react-three/fiber'] = '8.15.11';
packageJson.dependencies['@react-three/postprocessing'] = '2.15.11';
packageJson.dependencies['three'] = '0.158.0';

// Add resolutions field if it doesn't exist
if (!packageJson.resolutions) {
  packageJson.resolutions = {};
}
packageJson.resolutions.three = '0.158.0';

// Write the updated package.json back to disk
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

console.log('Successfully updated package.json with fixed versions.'); 