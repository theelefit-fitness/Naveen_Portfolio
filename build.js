#!/usr/bin/env node

// This is a simplified build script using CommonJS that will be used
// if the ES Module version (netlify-build.js) fails

const { execSync } = require('child_process');

console.log('🚀 Starting backup build process...');

try {
  console.log('📦 Installing dependencies...');
  execSync('npm install --legacy-peer-deps --no-audit --no-fund', { stdio: 'inherit' });
  
  console.log('🏗️ Building project...');
  execSync('CI=false VITE_CJS_IGNORE_WARNING=true npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error(`❌ Build failed: ${error.message}`);
  process.exit(1);
} 