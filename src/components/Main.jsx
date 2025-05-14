import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import About from './About';
import Contact from './Contact';
import Skills from './Skills';
import Projects from './Projects';
import Expertise from './Expertise';
import Experience from './Experience';
import Footer from './Footer';
import Hero from './Hero';
import Navbar from './Navbar';
import ClientSuccess from './ClientSuccess';
import '../styles/SectionColors.css';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  useEffect(() => {
    // Initialize ScrollTrigger with smooth scrolling if desired
    // This can be commented out if you prefer native scrolling
    /*
    gsap.registerPlugin(ScrollSmoother);
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      effects: true,
    });
    */

    // Refresh ScrollTrigger when all components are loaded
    ScrollTrigger.refresh();

    // Cleanup function
    return () => {
      // Kill all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Expertise />
      <Experience />
      <Projects />
      <ClientSuccess />
      <Contact />
      <Footer />
    </div>
  );
};

export default Main; 