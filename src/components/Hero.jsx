import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createSafeRenderer, fixWindowReferences } from '../three-patch';
import SafeWebGL from './SafeWebGL';
import '../styles/Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const pageRef = useRef(null);
  const [webGLInitialized, setWebGLInitialized] = useState(false);

  // Dynamic 3D content
  useEffect(() => {
    if (!webGLInitialized) return;
    
    let renderer, scene, camera;
    let bgRenderer, bgScene, bgCamera, controls;
    let width, height, wWidth, wHeight;
    let objects = [];
    let bgAnimation = null;
    const objectWidth = 12;
    const objectThickness = 3;
    const color = 0xffffff;
    
    // Initialize renderer and scene
    const initThree = () => {
      try {
        // Use createSafeRenderer from three-patch instead of direct THREE.WebGLRenderer creation
        renderer = createSafeRenderer({ 
          canvas: canvasRef.current, 
          antialias: true, 
          alpha: true 
        });
        
        if (!renderer) {
          throw new Error('Failed to create renderer');
        }
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 75;
        
        scene = new THREE.Scene();
        
        // Add ambient light with subtle blue tint
        scene.add(new THREE.AmbientLight(0x00CDFE, 1));
        scene.add(new THREE.AmbientLight(0xFFFFFF, 1));
        
        // Add point light with white color
        const light = new THREE.PointLight(0xffffff, 1.2);
        light.position.z = 100;
        scene.add(light);
        
        onResize();
        window.addEventListener('resize', onResize);
        
        initObjects();
        animate();
        
        // Add loaded class to show content
        document.querySelector('.hero').classList.add('loaded');
        
        // Start animation
        startAnim();
      } catch (error) {
        console.error('Error initializing Three.js:', error);
        // Show content immediately if initialization fails
        document.querySelector('.hero').classList.add('loaded');
        document.querySelector('.hero').classList.add('revealed');
        const heroContent = document.querySelector('.hero-content');
        heroContent.classList.add('appear');
      }
    };

    // Initialize background animation
    const initBackgroundAnimation = () => {
      try {
        // Use createSafeRenderer for background animation too
        bgRenderer = createSafeRenderer({
          canvas: bgCanvasRef.current,
          antialias: true,
          alpha: true
        });
        
        if (!bgRenderer) {
          throw new Error('Failed to create background renderer');
        }
        
        bgRenderer.setSize(window.innerWidth, window.innerHeight);
        bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        bgCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        bgCamera.position.z = 30;
        bgCamera.position.y = 5;
        
        bgScene = new THREE.Scene();

        // Add orbit controls for interactivity
        controls = new OrbitControls(bgCamera, bgCanvasRef.current);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        // Create a group to hold all objects
        const mainGroup = new THREE.Group();
        bgScene.add(mainGroup);

        // Create a modern 3D AEM logo-inspired shape
        const aemLogoGroup = createAEMLogo();
        aemLogoGroup.position.x = 5;
        mainGroup.add(aemLogoGroup);

        // Create floating particles
        const particles = createParticles();
        mainGroup.add(particles);

        // Create flowing data streams
        const dataStreams = createDataStreams();
        mainGroup.add(dataStreams);

        // Create a floating geometric platform
        const platform = createPlatform();
        platform.position.y = -10;
        mainGroup.add(platform);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        bgScene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7);
        bgScene.add(directionalLight);

        // Add a subtle blue point light for accent
        const blueLight = new THREE.PointLight(0x4A86E8, 1);
        blueLight.position.set(-10, 5, 10);
        bgScene.add(blueLight);

        // Add a subtle teal point light for accent
        const tealLight = new THREE.PointLight(0x55D6C2, 0.8);
        tealLight.position.set(10, -5, 10);
        bgScene.add(tealLight);
        
        // Animation function
        const runBgAnimation = () => {
          // Update controls
          controls.update();
          
          // Animate particles
          if (particles) {
            particles.rotation.y += 0.0005;
            particles.children.forEach(particle => {
              // Digital pulsing effect
              const time = Date.now() * 0.001;
              const pulseFactor = Math.sin(time + particle.position.x * 0.1) * 0.1 + 1;
              particle.scale.set(
                particle.userData.originalScale ? particle.userData.originalScale * pulseFactor : pulseFactor,
                particle.userData.originalScale ? particle.userData.originalScale * pulseFactor : pulseFactor,
                particle.userData.originalScale ? particle.userData.originalScale * pulseFactor : pulseFactor
              );
              
              // Store original scale if not already stored
              if (!particle.userData.originalScale) {
                particle.userData.originalScale = particle.scale.x / pulseFactor;
              }
              
              // Subtle rotation
              particle.rotation.x += 0.005 * Math.random();
              particle.rotation.z += 0.005 * Math.random();
            });
          }

          // Animate data streams
          if (dataStreams) {
            dataStreams.children.forEach((stream, i) => {
              // Move data packets along the streams
              stream.children.forEach((packet, j) => {
                if (j > 0) { // Skip the tube itself (first child)
                  packet.position.y -= 0.1 * (i % 3 + 1);
                  
                  // Reset position when it goes below the stream
                  if (packet.position.y < -10) {
                    packet.position.y = 10;
                  }
                  
                  // Digital pulse effect
                  const time = Date.now() * 0.001;
                  const pulseScale = Math.sin(time * 3 + j) * 0.2 + 1;
                  packet.scale.set(pulseScale, pulseScale, pulseScale);
                  
                  // Get position on the curve
                  const t = (packet.position.y + 10) / 20;
                  if (stream.children[0].geometry.parameters && stream.children[0].geometry.parameters.path) {
                    const curve = stream.children[0].geometry.parameters.path;
                    const point = curve.getPointAt(Math.max(0, Math.min(1, t)));
                    packet.position.x = point.x;
                    packet.position.z = point.z;
                  }
                }
              });
            });
          }

          // Animate AEM logo
          if (aemLogoGroup) {
            // More digital, less fluid rotation
            aemLogoGroup.rotation.y += 0.005;
            
            // Digital transformation effect
            const time = Date.now() * 0.001;
            aemLogoGroup.children.forEach((ring, i) => {
              if (i < aemLogoGroup.children.length - 1) { // Skip the central sphere
                // Digital wave effect
                ring.rotation.x = Math.sin(time * 0.5 + i * 1.5) * 0.2;
                ring.rotation.z = Math.cos(time * 0.5 + i * 1.5) * 0.2;
                
                // Pulsing effect
                const scaleFactor = Math.sin(time + i) * 0.05 + 1;
                ring.scale.set(scaleFactor, scaleFactor, scaleFactor);
              } else {
                // Central sphere pulse
                const sphereScale = Math.sin(time * 2) * 0.1 + 1;
                ring.scale.set(sphereScale, sphereScale, sphereScale);
              }
            });
          }
          
          // Animate circuit nodes on the platform
          if (platform && platform.children.length > 1 && platform.children[1].children) {
            const circuitGroup = platform.children[1];
            const time = Date.now() * 0.001;
            
            // Animate circuit nodes
            circuitGroup.children.forEach((element, i) => {
              if (element instanceof THREE.Mesh) {
                // Pulse effect for nodes
                const pulseScale = Math.sin(time * 2 + i) * 0.3 + 1;
                element.scale.set(pulseScale, pulseScale, pulseScale);
                
                // Pulse emissive intensity
                if (element.material) {
                  element.material.emissiveIntensity = Math.sin(time * 3 + i) * 0.2 + 0.3;
                }
              }
            });
          }
          
          bgRenderer.render(bgScene, bgCamera);
          bgAnimation = requestAnimationFrame(runBgAnimation);
        };
        
        // Start background animation
        bgAnimation = requestAnimationFrame(runBgAnimation);
        
        // Handle resize for background
        const handleBgResize = () => {
          bgCamera.aspect = window.innerWidth / window.innerHeight;
          bgCamera.updateProjectionMatrix();
          bgRenderer.setSize(window.innerWidth, window.innerHeight);
        };
        
        window.addEventListener('resize', handleBgResize);
        
        return () => {
          window.removeEventListener('resize', handleBgResize);
          if (bgAnimation) {
            cancelAnimationFrame(bgAnimation);
          }
          controls.dispose();
          bgScene.dispose();
          bgRenderer.dispose();
        };
      } catch (error) {
        console.error('Error initializing background animation:', error);
        // Allow the page to be viewed without animation if there's an error
      }
    };

    // Create AEM-inspired logo
    const createAEMLogo = () => {
      const group = new THREE.Group();
      
      // Create multiple rings with different sizes and orientations
      const ringGeometries = [
        new THREE.TorusGeometry(5, 0.4, 16, 50),
        new THREE.TorusGeometry(4, 0.3, 16, 50),
        new THREE.TorusGeometry(3, 0.2, 16, 50)
      ];
      
      // Use updated color palette
      const materials = [
        new THREE.MeshStandardMaterial({
          color: 0x4A86E8, // Professional blue
          metalness: 0.1,
          roughness: 0.8,
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide
        }),
        new THREE.MeshStandardMaterial({
          color: 0x7FACDE, // Lighter blue
          metalness: 0.1,
          roughness: 0.8,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide
        }),
        new THREE.MeshStandardMaterial({
          color: 0x55D6C2, // Teal accent
          metalness: 0.1,
          roughness: 0.8,
          transparent: true,
          opacity: 0.7,
          side: THREE.DoubleSide
        })
      ];
      
      // Create rings and add to group with different orientations
      ringGeometries.forEach((geometry, i) => {
        const ring = new THREE.Mesh(geometry, materials[i]);
        ring.rotation.x = Math.PI * 0.5 * i;
        ring.rotation.y = Math.PI * 0.25 * i;
        group.add(ring);
      });

      // Add a central sphere
      const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0x4A86E8, // Professional blue
        metalness: 0.1,
        roughness: 0.8,
        transparent: true,
        opacity: 0.9
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      group.add(sphere);
      
      return group;
    };

    // Create floating particles
    const createParticles = () => {
      const group = new THREE.Group();
      const particleCount = 100;
      
      // Create small geometric shapes as particles
      const geometries = [
        new THREE.TetrahedronGeometry(0.2),
        new THREE.OctahedronGeometry(0.2),
        new THREE.DodecahedronGeometry(0.2),
        new THREE.BoxGeometry(0.2, 0.2, 0.2)
      ];
      
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.8,
        transparent: true,
        opacity: 0.7
      });
      
      for (let i = 0; i < particleCount; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const particle = new THREE.Mesh(geometry, material.clone());
        
        // Position particles in a spherical volume
        const radius = 20 + Math.random() * 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);
        
        // Random rotation
        particle.rotation.x = Math.random() * Math.PI;
        particle.rotation.y = Math.random() * Math.PI;
        particle.rotation.z = Math.random() * Math.PI;
        
        // Random scale
        const scale = 0.5 + Math.random() * 1.5;
        particle.scale.set(scale, scale, scale);
        
        // Add some emissive to 30% of particles for digital glow effect
        if (Math.random() < 0.3) {
          particle.material.emissive = new THREE.Color(
            Math.random() < 0.5 ? 0x4A86E8 : 0x55D6C2 // Blue or teal
          );
          particle.material.emissiveIntensity = 0.3;
        }
        
        group.add(particle);
      }
      
      return group;
    };

    // Create data streams visualization
    const createDataStreams = () => {
      const group = new THREE.Group();
      const streamCount = 5;
      
      for (let i = 0; i < streamCount; i++) {
        const streamGroup = new THREE.Group();
        
        // Create a curved path for the stream
        const curve = new THREE.CubicBezierCurve3(
          new THREE.Vector3(-10 + i * 5, 10, -5 + i * 2),
          new THREE.Vector3(-5 + i * 3, 5, 0),
          new THREE.Vector3(0 + i * 2, 0, 5 - i),
          new THREE.Vector3(10 - i * 3, -10, -5 + i * 2)
        );
        
        // Create the stream tube
        const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.05, 8, false);
        const tubeMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.1,
          roughness: 0.8,
          transparent: true,
          opacity: 0.3
        });
        
        const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
        streamGroup.add(tube);
        
        // Add data packets moving along the stream
        const packetCount = 5;
        for (let j = 0; j < packetCount; j++) {
          // Use cubes and spheres for data packets
          let packetGeometry;
          if (j % 2 === 0) {
            packetGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
          } else {
            packetGeometry = new THREE.SphereGeometry(0.1, 8, 8);
          }
          
          // Use professional color palette
          const packetMaterial = new THREE.MeshStandardMaterial({
            color: j % 2 === 0 ? 0x4A86E8 : 0x55D6C2, // Blue or teal
            emissive: j % 2 === 0 ? 0x4A86E8 : 0x55D6C2,
            emissiveIntensity: 0.3,
            metalness: 0.1,
            roughness: 0.8
          });
          
          const packet = new THREE.Mesh(packetGeometry, packetMaterial);
          
          // Position packets along the stream at different points
          packet.position.y = -10 + j * 5;
          
          // Get position on the curve
          const t = (packet.position.y + 10) / 20;
          const point = curve.getPointAt(Math.max(0, Math.min(1, t)));
          packet.position.x = point.x;
          packet.position.z = point.z;
          
          streamGroup.add(packet);
        }
        
        group.add(streamGroup);
      }
      
      return group;
    };

    // Create a platform
    const createPlatform = () => {
      // Create a circular platform
      const platformGeometry = new THREE.CylinderGeometry(15, 15, 0.5, 32);
      const platformMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.8,
        transparent: true,
        opacity: 0.7
      });
      
      const platform = new THREE.Mesh(platformGeometry, platformMaterial);
      
      // Add grid pattern to the platform
      const gridHelper = new THREE.GridHelper(30, 30, 0x4A86E8, 0x7FACDE); // Updated colors
      gridHelper.position.y = 0.26;
      platform.add(gridHelper);
      
      // Add digital circuit pattern to the platform
      const circuitGroup = createCircuitPattern();
      circuitGroup.position.y = 0.26;
      platform.add(circuitGroup);
      
      return platform;
    };
    
    // Create digital circuit pattern
    const createCircuitPattern = () => {
      const group = new THREE.Group();
      const circuitCount = 15;
      
      for (let i = 0; i < circuitCount; i++) {
        // Create circuit paths
        const points = [];
        let x = -15 + Math.random() * 30;
        let z = -15 + Math.random() * 30;
        
        points.push(new THREE.Vector3(x, 0, z));
        
        // Create 3-5 segments per circuit
        const segments = 3 + Math.floor(Math.random() * 3);
        
        for (let j = 0; j < segments; j++) {
          // Decide direction: 0 = x+, 1 = x-, 2 = z+, 3 = z-
          const direction = Math.floor(Math.random() * 4);
          const length = 2 + Math.random() * 5;
          
          switch(direction) {
            case 0: x += length; break;
            case 1: x -= length; break;
            case 2: z += length; break;
            case 3: z -= length; break;
          }
          
          // Keep within platform bounds
          x = Math.max(-15, Math.min(15, x));
          z = Math.max(-15, Math.min(15, z));
          
          points.push(new THREE.Vector3(x, 0, z));
        }
        
        // Create the circuit line
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: i % 2 === 0 ? 0x4A86E8 : 0x55D6C2, // Blue or teal
          transparent: true,
          opacity: 0.5
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        group.add(line);
        
        // Add circuit nodes at the endpoints
        const nodeGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const nodeMaterial = new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0x4A86E8 : 0x55D6C2, // Blue or teal
          emissive: i % 2 === 0 ? 0x4A86E8 : 0x55D6C2,
          emissiveIntensity: 0.3,
          metalness: 0.1,
          roughness: 0.8
        });
        
        const startNode = new THREE.Mesh(nodeGeometry, nodeMaterial);
        startNode.position.copy(points[0]);
        group.add(startNode);
        
        const endNode = new THREE.Mesh(nodeGeometry, nodeMaterial);
        endNode.position.copy(points[points.length - 1]);
        group.add(endNode);
      }
      
      return group;
    };
    
    // Handle window resize
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      
      const size = getRendererSize();
      wWidth = size[0];
      wHeight = size[1];
    };
    
    // Calculate renderer size
    const getRendererSize = () => {
      const cam = new THREE.PerspectiveCamera(75, camera.aspect);
      const vFOV = cam.fov * Math.PI / 180;
      const height = 2 * Math.tan(vFOV / 2) * Math.abs(75);
      const width = height * cam.aspect;
      return [width, height];
    };
    
    // Create 3D objects
    const initObjects = () => {
      objects = [];
      const geometry = new THREE.BoxGeometry(objectWidth, objectWidth, objectThickness);
      
      const nx = Math.round(wWidth / objectWidth) + 1;
      const ny = Math.round(wHeight / objectWidth) + 1;
      
      // Use white and very light blue for a clean look
      const white = 0xffffff;
      const lightBlue = 0xf5f9ff;
      
      for (let i = 0; i < nx; i++) {
        for (let j = 0; j < ny; j++) {
          // Alternate between white and very light blue
          const boxColor = (i + j) % 2 === 0 ? white : lightBlue;
          
          const material = new THREE.MeshLambertMaterial({ 
            color: boxColor, 
            transparent: true, 
            opacity: 1 
          });
          
          const mesh = new THREE.Mesh(geometry, material);
          const x = -wWidth / 2 + i * objectWidth;
          const y = -wHeight / 2 + j * objectWidth;
          mesh.position.set(x, y, 0);
          objects.push(mesh);
          scene.add(mesh);
        }
      }
    };
    
    // Start animation
    const startAnim = () => {
      document.querySelector('.hero').classList.remove('revealed');
      
      objects.forEach(mesh => {
        mesh.rotation.set(0, 0, 0);
        mesh.material.opacity = 1;
        mesh.position.z = 0;
        
        const delay = THREE.MathUtils.randFloat(1, 2);
        const rx = THREE.MathUtils.randFloatSpread(2 * Math.PI);
        const ry = THREE.MathUtils.randFloatSpread(2 * Math.PI);
        const rz = THREE.MathUtils.randFloatSpread(2 * Math.PI);
        
        gsap.to(mesh.rotation, {
          x: rx,
          y: ry,
          z: rz,
          duration: 2,
          delay: delay
        });
        
        gsap.to(mesh.position, {
          z: 80,
          duration: 2,
          delay: delay + 0.5,
          ease: "power1.out"
        });
        
        gsap.to(mesh.material, {
          opacity: 0,
          duration: 2,
          delay: delay + 0.5
        });
      });
      
      setTimeout(() => {
        document.querySelector('.hero').classList.add('revealed');
        
        // Make the hero content appear after the reveal
        const heroContent = document.querySelector('.hero-content');
        heroContent.classList.add('appear');
        
        // Initialize background animation after the reveal completes
        initBackgroundAnimation();
      }, 4500);
    };
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    
    // Initialize everything
    initThree();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      if (scene) scene.dispose();
      if (objects.length) {
        objects.forEach(obj => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) obj.material.dispose();
        });
      }
      if (renderer) renderer.dispose();
      if (bgAnimation) cancelAnimationFrame(bgAnimation);
      if (controls) controls.dispose();
    };
  }, [webGLInitialized]);

  // Static content when WebGL is not supported
  const StaticHero = () => (
    <div className="hero-container static-hero">
      <div className="hero-content static-content">
        <h1>Naveen Vanam</h1>
        <h2>Specialist Leader at Deloitte Digital</h2>
        <p>Digital Transformation Expert | AEM & Adobe LiveCycle Specialist | RESTful Web Services</p>
        <div className="hero-buttons">
          <a href="#contact" className="btn primary-btn">Get In Touch</a>
          <a href="#expertise" className="btn secondary-btn">Explore My Work</a>
        </div>
      </div>
    </div>
  );

  // Dynamic content with Three.js
  const DynamicHero = () => (
    <>
      <canvas id="bg-animation" ref={bgCanvasRef}></canvas>
      <div id="page" ref={pageRef}>
        <div className="hero-container">
          <div className="hero-content">
            <h1>Naveen Vanam</h1>
            <h2>Specialist Leader at Deloitte Digital</h2>
            <p>Digital Transformation Expert | AEM & Adobe LiveCycle Specialist | RESTful Web Services</p>
            <div className="hero-buttons">
              <a href="#contact" className="btn primary-btn">Get In Touch</a>
              <a href="#expertise" className="btn secondary-btn">Explore My Work</a>
            </div>
          </div>
          <div className="hero-3d-space"></div>
        </div>
      </div>
      <canvas id="reveal-effect" ref={canvasRef}></canvas>
    </>
  );

  // Handle WebGL initialization success
  const handleWebGLSuccess = () => {
    setWebGLInitialized(true);
  };

  // Handle WebGL errors
  const handleWebGLError = (error) => {
    console.error('WebGL Error:', error);
  };

  return (
    <section id="hero" className="hero">
      <SafeWebGL 
        fallback={<StaticHero />}
        onError={handleWebGLError}
        onSupported={handleWebGLSuccess}
      >
        <DynamicHero />
      </SafeWebGL>
    </section>
  );
};

export default Hero;
