#!/bin/bash

# Display Node and npm versions
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Enable mise settings for idiomatic version files if mise is available
if command -v mise &> /dev/null; then
  echo "Enabling idiomatic version files for Node in mise..."
  mise settings add idiomatic_version_file_enable_tools node
fi

# Run the build command
echo "Starting build process..."
npm run build

echo "Build process completed!" 