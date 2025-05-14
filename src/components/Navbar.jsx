import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Detect which section is currently in view
      updateActiveSection();
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Update the active section based on scroll position
  const updateActiveSection = () => {
    const sections = [
      'hero', 
      'about', 
      'expertise', 
      'experience', 
      'projects', 
      'success-stories', 
      'skills', 
      'contact'
    ];
    
    // Find the section that's most in view
    const current = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // A section is considered in view if its top is within the top half of the screen
        return rect.top <= 300 && rect.bottom >= 300;
      }
      return false;
    }) || 'hero';
    
    setActiveSection(current);
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      // Get the height of the navbar for offset
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      
      // Calculate the position to scroll to with the offset
      const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = sectionPosition - navbarHeight - 20; // Extra 20px for spacing
      
      // Smooth scroll to the section
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <a href="#hero" onClick={() => scrollToSection('hero')}>Naveen Vanam</a>
        </div>
        <div className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <li><a href="#about" onClick={() => scrollToSection('about')} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
          <li><a href="#expertise" onClick={() => scrollToSection('expertise')} className={activeSection === 'expertise' ? 'active' : ''}>Expertise</a></li>
          <li><a href="#experience" onClick={() => scrollToSection('experience')} className={activeSection === 'experience' ? 'active' : ''}>Experience</a></li>
          <li><a href="#projects" onClick={() => scrollToSection('projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
          <li><a href="#success-stories" onClick={() => scrollToSection('success-stories')} className={activeSection === 'success-stories' ? 'active' : ''}>Client Success</a></li>
          <li><a href="#skills" onClick={() => scrollToSection('skills')} className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
          <li><a href="#contact" onClick={() => scrollToSection('contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
