import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Generic function to create scroll animations
export const createScrollAnimation = (element, animation, trigger = {}) => {
  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...trigger
    }
  });
};

// Fade in animation
export const fadeInAnimation = (element, delay = 0, trigger = {}) => {
  return createScrollAnimation(
    element,
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay
    },
    trigger
  );
};

// Slide from left animation
export const slideFromLeftAnimation = (element, delay = 0, trigger = {}) => {
  return createScrollAnimation(
    element,
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay
    },
    trigger
  );
};

// Slide from right animation
export const slideFromRightAnimation = (element, delay = 0, trigger = {}) => {
  return createScrollAnimation(
    element,
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay
    },
    trigger
  );
};

// Scale up animation
export const scaleUpAnimation = (element, delay = 0, trigger = {}) => {
  return createScrollAnimation(
    element,
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)',
      delay
    },
    trigger
  );
};

// Stagger animation for multiple elements
export const staggerAnimation = (elements, animation, staggerAmount = 0.1, trigger = {}) => {
  return gsap.to(elements, {
    ...animation,
    stagger: staggerAmount,
    scrollTrigger: {
      trigger: elements[0],
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...trigger
    }
  });
};

// Initialize animations on component refs
export const initGSAPAnimations = (refs) => {
  const cleanup = [];
  
  // Set initial states
  gsap.set(refs.fadeIn, { opacity: 0, y: 50 });
  gsap.set(refs.slideLeft, { opacity: 0, x: -50 });
  gsap.set(refs.slideRight, { opacity: 0, x: 50 });
  gsap.set(refs.scaleUp, { opacity: 0, scale: 0.8 });
  
  // Create animations
  if (refs.fadeIn && refs.fadeIn.length > 0) {
    cleanup.push(staggerAnimation(refs.fadeIn, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }));
  }
  
  if (refs.slideLeft && refs.slideLeft.length > 0) {
    cleanup.push(staggerAnimation(refs.slideLeft, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }));
  }
  
  if (refs.slideRight && refs.slideRight.length > 0) {
    cleanup.push(staggerAnimation(refs.slideRight, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }));
  }
  
  if (refs.scaleUp && refs.scaleUp.length > 0) {
    cleanup.push(staggerAnimation(refs.scaleUp, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }));
  }
  
  // Return a cleanup function
  return () => {
    cleanup.forEach(animation => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    });
  };
}; 