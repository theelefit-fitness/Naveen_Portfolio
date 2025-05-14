
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Expertise from '../components/Expertise';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AnimationUtils from '../components/AnimationUtils';
import '../styles/main.css';
import ClientSuccess from '../components/ClientSuccess';
import Projects from '../components/Projects';
const Index = () => {
  useEffect(() => {
    document.title = "Naveen Vanam | Digital Transformation Specialist";
  }, []);

  return (
    <div className="app">
      <AnimationUtils />
      <Navbar />
      <Hero />
      <About />
      <Expertise />
      <Experience />
      <Projects />
      <ClientSuccess />
      <Skills />
      <Contact />
     
      <Footer />
    </div>
  );
};

export default Index;
