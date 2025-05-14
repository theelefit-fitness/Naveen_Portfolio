
import React, { useEffect, useRef } from 'react';
import '../styles/Expertise.css';

const Expertise = () => {
  const expertiseRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    const expertiseItems = expertiseRef.current.querySelectorAll('.fade-in, .slide-right, .slide-left');
    expertiseItems.forEach(item => {
      observer.observe(item);
    });
    
    return () => {
      expertiseItems.forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  const expertiseData = [
    {
      title: 'Digital Transformation',
      description: 'From modernizing paper-based workflows to implementing enterprise-wide digital strategies, I help organizations adopt future-ready technologies.',
      icon: 'expertise-digital'
    },
    {
      title: 'AI & ML-Driven Solutions',
      description: 'I integrate AI-powered automation, predictive analytics, and intelligent decision-making to optimize operations and enhance service delivery.',
      icon: 'expertise-ai'
    },
    {
      title: 'Adobe Experience Manager (AEM)',
      description: 'Expert in developing and implementing AEM solutions for content management, digital asset management, and personalized customer experiences.',
      icon: 'expertise-aem'
    },
    {
      title: 'Adobe LiveCycle',
      description: 'Specialized in automating document-centric processes using Adobe LiveCycle, integrating with enterprise systems for seamless workflows.',
      icon: 'expertise-livecycle'
    },
    {
      title: 'RESTful Web Services',
      description: 'Design and development of scalable RESTful APIs to enable system integrations and create robust microservices architectures.',
      icon: 'expertise-api'
    },
    {
      title: 'System Integration',
      description: 'I design and oversee complex technology integrations, ensuring interoperability across platforms and maximizing efficiency.',
      icon: 'expertise-integration'
    }
  ];

  return (
    <section id="expertise" className="section expertise" ref={expertiseRef}>
      <div className="container">
        <div className="section-title fade-in">
          <h2>Areas of Expertise</h2>
        </div>
        <div className="expertise-intro fade-in">
          <p>
            With over 14 years of industry experience and a strong focus on Adobe technologies, 
            I've developed expertise across multiple domains within digital transformation and systems integration.
          </p>
        </div>
        <div className="expertise-grid">
          {expertiseData.map((item, index) => (
            <div 
              key={index} 
              className={`expertise-card ${index % 2 === 0 ? 'slide-right' : 'slide-left'}`}
            >
              <div className={`expertise-icon ${item.icon}`}>
                <div className="icon-inner"></div>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
