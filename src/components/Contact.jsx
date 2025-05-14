import React, { useEffect, useRef } from 'react';
import '../styles/Contact.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const detailsRefs = useRef([]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      gsap.set(infoRef.current, { opacity: 0, y: 50 });
      gsap.set(detailsRefs.current, { opacity: 0, y: 30, scale: 0.95 });
      
      // Title animation
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Info animation
      gsap.to(infoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Contact details staggered animation
      gsap.to(detailsRefs.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.4,
        scrollTrigger: {
          trigger: detailsRefs.current[0],
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }, contactRef);
    
    return () => ctx.revert(); // Cleanup
  }, []);
  
  // Function to add elements to detailsRefs
  const addToDetailsRefs = (el) => {
    if (el && !detailsRefs.current.includes(el)) {
      detailsRefs.current.push(el);
    }
  };

  return (
    <section id="contact" className="section contact" ref={contactRef}>
      <div className="container">
        <div className="section-title" ref={titleRef}>
          <h2>Get In Touch</h2>
        </div>
        <div className="contact-content">
          <div className="contact-info" ref={infoRef}>
            <h3>Contact Information</h3>
            <p>Feel free to reach out if you're interested in digital transformation solutions or have questions about Adobe Experience Manager, LiveCycle, or RESTful web services.</p>
            <div className="contact-details">
              <div className="contact-item" ref={addToDetailsRefs}>
                <div className="contact-icon email"></div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <p>vanam413@gmail.com</p>
                </div>
              </div>
              <div className="contact-item" ref={addToDetailsRefs}>
                <div className="contact-icon location"></div>
                <div className="contact-text">
                  <h4>Location</h4>
                  <p>Houston, Texas, United States</p>
                </div>
              </div>
              <div className="contact-item" ref={addToDetailsRefs}>
                <div className="contact-icon linkedin"></div>
                <div className="contact-text">
                  <h4>LinkedIn</h4>
                  <p><a href="https://www.linkedin.com/in/nvanam" target="_blank" rel="noopener noreferrer">www.linkedin.com/in/nvanam</a></p>
                </div>
              </div>
              <div className="contact-item" ref={addToDetailsRefs}>
                <div className="contact-icon blog"></div>
                <div className="contact-text">
                  <h4>Blog</h4>
                  <p><a href="https://alcpro.blogspot.com" target="_blank" rel="noopener noreferrer">alcpro.blogspot.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
