import React, { useEffect, useState } from 'react';
import { checkWebGLSupport } from '../three-patch';

// A component that safely handles WebGL support detection
const SafeWebGL = ({ 
  children, 
  fallback, 
  onError = () => {}, 
  onSupported = () => {}
}) => {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    try {
      // Check WebGL support
      const hasWebGL = checkWebGLSupport();
      setIsWebGLSupported(hasWebGL);
      
      if (hasWebGL) {
        onSupported();
      } else {
        console.warn('WebGL is not supported in this browser');
        onError(new Error('WebGL not supported'));
      }
    } catch (error) {
      console.error('Error detecting WebGL support:', error);
      setHasError(true);
      setIsWebGLSupported(false);
      onError(error);
    }
  }, [onError, onSupported]);
  
  if (!isWebGLSupported || hasError) {
    return fallback || null;
  }
  
  return children;
};

export default SafeWebGL; 