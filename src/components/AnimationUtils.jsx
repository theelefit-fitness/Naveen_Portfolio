
import { useEffect } from 'react';

const AnimationUtils = () => {
  useEffect(() => {
    const observeElements = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      const animatedElements = document.querySelectorAll('.fade-in, .slide-right, .slide-left, .scale-in');
      animatedElements.forEach(el => {
        observer.observe(el);
      });
      
      return observer;
    };
    
    const observer = observeElements();
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return null;
};

export default AnimationUtils;
