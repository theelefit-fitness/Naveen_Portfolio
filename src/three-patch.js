// Three.js patch file to fix WebGL initialization in production

// This file will be imported by the Hero component to ensure proper WebGL rendering

// WebGL detection and fallback
export const checkWebGLSupport = () => {
  try {
    const canvas = document.createElement('canvas');
    const isWebGL2 = !!window.WebGL2RenderingContext && 
      canvas.getContext('webgl2');
    const isWebGL1 = !!window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    
    if (isWebGL2 || isWebGL1) {
      return true;
    }
    
    return false;
  } catch (e) {
    console.error('WebGL detection error:', e);
    return false;
  }
};

// Safe renderer initialization
export const createSafeRenderer = (params) => {
  let renderer = null;
  try {
    // Try to create the WebGL renderer
    const canvas = params.canvas || document.createElement('canvas');
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: params.antialias !== undefined ? params.antialias : true,
      alpha: params.alpha !== undefined ? params.alpha : true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: false
    });
    
    // Enable necessary renderer features
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    
    console.log('WebGL renderer created successfully');
  } catch (e) {
    console.error('Failed to create WebGL renderer:', e);
    // Create a dummy renderer that does nothing
    renderer = {
      setSize: () => {},
      render: () => {},
      setPixelRatio: () => {},
      setClearColor: () => {},
      domElement: document.createElement('canvas')
    };
  }
  
  return renderer;
};

// Fix window references for SSR (Server-Side Rendering)
export const fixWindowReferences = () => {
  if (typeof window === 'undefined') {
    global.window = {
      innerWidth: 1920,
      innerHeight: 1080,
      devicePixelRatio: 1,
      addEventListener: () => {}
    };
    global.document = {
      createElement: () => ({
        getContext: () => null
      }),
      querySelector: () => null
    };
  }
};

// Export default to make usage simple in components
export default {
  checkWebGLSupport,
  createSafeRenderer,
  fixWindowReferences
}; 