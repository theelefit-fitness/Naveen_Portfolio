import React, { useEffect, useRef } from 'react';
import '../styles/Experience.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const experienceRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const ctaRef = useRef(null);

  const experiences = [
    {
      company: 'Deloitte Digital',
      position: 'Specialist Leader',
      period: 'May 2021 - Present',
      location: 'Houston, Texas, United States',
      current: true
    },
    {
      company: 'Deloitte Digital',
      position: 'Specialist Master',
      period: 'March 2018 - May 2021',
      location: 'Houston, Texas',
      duration: '3 years 3 months'
    },
    {
      company: 'R3 Technologies, Inc.',
      position: 'Software Consultant',
      period: '2004 - March 2018',
      duration: '14 years'
    },
    {
      company: 'Adobe',
      position: 'Lead AEM Developer / Technical Account Manager',
      period: 'May 2017 - October 2017',
      location: 'Greater New York City Area',
      duration: '6 months'
    },
    {
      company: 'Florida Department of Environmental Protection',
      position: 'Sr. AEM Forms Developer / Solutions Architect',
      period: 'June 2015 - May 2017',
      location: 'Tallahassee, Florida Area',
      duration: '2 years'
    },
    {
      company: 'Deloitte',
      position: 'Sr. Adobe LiveCycle Consultant',
      period: 'August 2014 - May 2015',
      location: 'Camp Hill, Pennsylvania',
      duration: '10 months'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      // Experience items animation
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      
      timelineItems.forEach((item, index) => {
        const isEven = index % 2 === 0;
        const xValue = isEven ? -50 : 50;
        
        gsap.from(item, {
          opacity: 0,
          x: xValue,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      });

      // CTA buttons animation
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    }, experienceRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="experience" ref={experienceRef}>
      <div className="container">
        <div className="section-title" ref={titleRef}>
          <h2>Professional Experience</h2>
          <div className="underline"></div>
        </div>

        <div className="timeline" ref={timelineRef}>
          {experiences.map((exp, index) => (
            <div className={`timeline-item ${exp.current ? 'current' : ''}`} key={index}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>{exp.position}</h3>
                  <span className="company">{exp.company}</span>
                </div>
                <div className="timeline-info">
                  <span className="period">{exp.period}</span>
                  {exp.duration && <span className="duration">{exp.duration}</span>}
                </div>
                {exp.location && <div className="location">{exp.location}</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="experience-cta" ref={ctaRef}>
          <a href="#contact" className="btn primary-btn">Get In Touch</a>
          <a href="https://www.linkedin.com/in/nvanam" target="_blank" rel="noopener noreferrer" className="btn secondary-btn">View Full Profile</a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
