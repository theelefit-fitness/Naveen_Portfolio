import React, { useEffect, useRef } from 'react';
import '../styles/About.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollAnimation from './ScrollAnimation';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // No animations here, we're using the ScrollAnimation component instead
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section about" ref={aboutRef}>
      <div className="container">
        <ScrollAnimation type={ScrollAnimation.ANIMATIONS.FADE_UP}>
          <div className="section-title">
            <h2>About Me</h2>
          </div>
        </ScrollAnimation>
        
        <div className="about-content">
          <ScrollAnimation type={ScrollAnimation.ANIMATIONS.FADE_LEFT} delay={0.2}>
            <div className="about-image">
              <div className="image-container">
                <img
                  src="profile.jpg"
                  alt="Profile"
                  className="profile-image"
                />
                <div className="blob-bg"></div>
              </div>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation type={ScrollAnimation.ANIMATIONS.FADE_RIGHT} delay={0.3}>
            <div className="about-text">
              <h3>Digital Transformation Specialist</h3>
              <p>
                As a Senior Manager at Deloitte Digital, I specialize in transforming legacy systems into cutting-edge digital platforms,
                leveraging AI, ML, and automation to streamline operations and enhance user experiences. With a passion for innovation,
                I lead multidisciplinary teams that deliver scalable, high-impact solutions for Government and Public Sector clients across the nation.
              </p>
              <p>
                I thrive at the intersection of technology, strategy, and execution, ensuring that digital transformation efforts drive
                measurable impact and long-term success. My expertise in Adobe Experience Manager (AEM), Adobe LiveCycle, and RESTful web services
                allows me to develop comprehensive solutions that meet complex business requirements.
              </p>
              
              <div className="about-highlights">
                <ScrollAnimation type={ScrollAnimation.ANIMATIONS.SCALE} delay={0.4}>
                  <div className="highlight">
                    <h4>7+ Years</h4>
                    <p>at Deloitte Digital</p>
                  </div>
                </ScrollAnimation>
                
                <ScrollAnimation type={ScrollAnimation.ANIMATIONS.SCALE} delay={0.5}>
                  <div className="highlight">
                    <h4>14+ Years</h4>
                    <p>Industry Experience</p>
                  </div>
                </ScrollAnimation>
                
                <ScrollAnimation type={ScrollAnimation.ANIMATIONS.SCALE} delay={0.6}>
                  <div className="highlight">
                    <h4>PMP®</h4>
                    <p>Certified</p>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default About;