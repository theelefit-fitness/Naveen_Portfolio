import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animation types
const ANIMATIONS = {
  FADE_UP: 'fadeUp',
  FADE_DOWN: 'fadeDown',
  FADE_LEFT: 'fadeLeft',
  FADE_RIGHT: 'fadeRight',
  ZOOM_IN: 'zoomIn',
  ZOOM_OUT: 'zoomOut',
  FLIP: 'flip',
  SCALE: 'scale',
};

const ScrollAnimation = ({ 
  children, 
  type = ANIMATIONS.FADE_UP, 
  delay = 0, 
  duration = 0.8,
  threshold = 0.2,
  once = true,
  ease = 'power2.out',
  id,
  style,
  className
}) => {
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    let animation;
    const element = elementRef.current;
    
    // Initial state based on animation type
    switch (type) {
      case ANIMATIONS.FADE_UP:
        gsap.set(element, { opacity: 0, y: 50 });
        break;
      case ANIMATIONS.FADE_DOWN:
        gsap.set(element, { opacity: 0, y: -50 });
        break;
      case ANIMATIONS.FADE_LEFT:
        gsap.set(element, { opacity: 0, x: -50 });
        break;
      case ANIMATIONS.FADE_RIGHT:
        gsap.set(element, { opacity: 0, x: 50 });
        break;
      case ANIMATIONS.ZOOM_IN:
        gsap.set(element, { opacity: 0, scale: 0.5 });
        break;
      case ANIMATIONS.ZOOM_OUT:
        gsap.set(element, { opacity: 0, scale: 1.5 });
        break;
      case ANIMATIONS.FLIP:
        gsap.set(element, { opacity: 0, rotationY: 90 });
        break;
      case ANIMATIONS.SCALE:
        gsap.set(element, { opacity: 0, scale: 0.8 });
        break;
      default:
        gsap.set(element, { opacity: 0 });
    }
    
    // Create the animation
    ScrollTrigger.create({
      trigger: element,
      start: `top ${80}%`,
      onEnter: () => {
        if (once && hasAnimated.current) return;
        
        // Animation settings based on type
        switch (type) {
          case ANIMATIONS.FADE_UP:
            animation = gsap.to(element, { opacity: 1, y: 0, duration, delay, ease });
            break;
          case ANIMATIONS.FADE_DOWN:
            animation = gsap.to(element, { opacity: 1, y: 0, duration, delay, ease });
            break;
          case ANIMATIONS.FADE_LEFT:
            animation = gsap.to(element, { opacity: 1, x: 0, duration, delay, ease });
            break;
          case ANIMATIONS.FADE_RIGHT:
            animation = gsap.to(element, { opacity: 1, x: 0, duration, delay, ease });
            break;
          case ANIMATIONS.ZOOM_IN:
            animation = gsap.to(element, { opacity: 1, scale: 1, duration, delay, ease });
            break;
          case ANIMATIONS.ZOOM_OUT:
            animation = gsap.to(element, { opacity: 1, scale: 1, duration, delay, ease });
            break;
          case ANIMATIONS.FLIP:
            animation = gsap.to(element, { opacity: 1, rotationY: 0, duration, delay, ease });
            break;
          case ANIMATIONS.SCALE:
            animation = gsap.to(element, { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.7)' });
            break;
          default:
            animation = gsap.to(element, { opacity: 1, duration, delay, ease });
        }
        
        hasAnimated.current = true;
      },
      onLeaveBack: () => {
        if (once) return;
        
        // Reset animation if not once
        switch (type) {
          case ANIMATIONS.FADE_UP:
            animation = gsap.to(element, { opacity: 0, y: 50, duration, ease });
            break;
          case ANIMATIONS.FADE_DOWN:
            animation = gsap.to(element, { opacity: 0, y: -50, duration, ease });
            break;
          case ANIMATIONS.FADE_LEFT:
            animation = gsap.to(element, { opacity: 0, x: -50, duration, ease });
            break;
          case ANIMATIONS.FADE_RIGHT:
            animation = gsap.to(element, { opacity: 0, x: 50, duration, ease });
            break;
          case ANIMATIONS.ZOOM_IN:
            animation = gsap.to(element, { opacity: 0, scale: 0.5, duration, ease });
            break;
          case ANIMATIONS.ZOOM_OUT:
            animation = gsap.to(element, { opacity: 0, scale: 1.5, duration, ease });
            break;
          case ANIMATIONS.FLIP:
            animation = gsap.to(element, { opacity: 0, rotationY: 90, duration, ease });
            break;
          case ANIMATIONS.SCALE:
            animation = gsap.to(element, { opacity: 0, scale: 0.8, duration, ease });
            break;
          default:
            animation = gsap.to(element, { opacity: 0, duration, ease });
        }
        
        hasAnimated.current = false;
      }
    });
    
    return () => {
      // Cleanup ScrollTrigger
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === element) {
          st.kill();
        }
      });
      
      // Cleanup animation if it exists
      if (animation) {
        animation.kill();
      }
    };
  }, [type, delay, duration, ease, once, threshold]);
  
  // Default styles for the wrapper
  const defaultStyle = { width: '100%' };
  // Merge with passed styles
  const mergedStyles = { ...defaultStyle, ...style };
  
  return (
    <div ref={elementRef} id={id} style={mergedStyles} className={className}>
      {children}
    </div>
  );
};

// Export animation types as static properties
ScrollAnimation.ANIMATIONS = ANIMATIONS;

export default ScrollAnimation; 