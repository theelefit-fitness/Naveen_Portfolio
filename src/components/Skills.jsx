import React, { useEffect, useRef } from 'react';
import '../styles/Skills.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCertificate } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skillsRef = useRef(null);
  const titleRef = useRef(null);
  const adobeRef = useRef(null);
  const developmentRef = useRef(null);
  const emergingRef = useRef(null);
  const additionalRef = useRef(null);
  
  const skillsData = {
    adobe: [
      { name: 'Adobe Experience Manager (AEM)', level: 95 },
      { name: 'Adobe LiveCycle', level: 90 },
      { name: 'Adobe Analytics', level: 85 },
      { name: 'Adobe Target', level: 82 }
    ],
    development: [
      { name: 'RESTful Web Services', level: 88 },
      { name: 'Java', level: 86 },
      { name: 'Python', level: 80 },
      { name: 'JavaScript/React', level: 83 }
    ],
    emerging: [
      { name: 'Artificial Intelligence (AI)', level: 82 },
      { name: 'Machine Learning', level: 80 },
      { name: 'Cloud Computing', level: 85 },
      { name: 'Blockchain', level: 75 }
    ],
    other: [
      'SOA', 'SDLC', 'SQL', 'Agile Methodologies', 
    'Web Development', 'Android', 'Java Enterprise Edition', 'Spring', 
    'SOAP', 'Requirements Analysis', 'Software Development',
      'Databases', 'Consulting', 'Oracle', 'Business Analysis',
      'XML', 'Project Management', 'Microservices', 'Docker'
    ]
  };

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
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      });

      // Map of refs to categories
      const categoryRefs = {
        adobe: adobeRef,
        development: developmentRef,
        emerging: emergingRef,
        additional: additionalRef
      };

      // Animate skill categories one after another
      const categories = ['adobe', 'development', 'emerging', 'additional'];
      categories.forEach((category, categoryIndex) => {
        const categoryElement = categoryRefs[category]?.current;
        if (!categoryElement) return;
        
        // Category title fade in
        const titleElement = categoryElement.querySelector('.skill-category-title');
        gsap.from(titleElement, {
          opacity: 0,
          x: -50,
          duration: 0.8,
          delay: categoryIndex * 0.2,
          scrollTrigger: {
            trigger: categoryElement,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });

        // For progress bars (not for additional competencies)
        if (category !== 'additional') {
          // Skills staggered animation
          const skills = categoryElement.querySelectorAll('.skill-progress-item');
          gsap.from(skills, {
            opacity: 0,
            x: -30,
            stagger: 0.15,
            duration: 0.6,
            scrollTrigger: {
              trigger: categoryElement,
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          });

          // Skill bars animation
          skills.forEach((skill) => {
            const progressBar = skill.querySelector('.skill-progress-bar-fill');
            const progressValue = progressBar.getAttribute('data-value');
            
            gsap.set(progressBar, { width: 0 });
            
            gsap.to(progressBar, {
              width: progressValue,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: skill,
                start: 'top 75%',
                toggleActions: 'play none none none'
              }
            });

            // Percentage counter animation
            const percentText = skill.querySelector('.skill-progress-percent');
            
            gsap.from(percentText, {
              textContent: 0,
              duration: 1.2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: skill,
                start: 'top 75%',
                toggleActions: 'play none none none'
              },
              onUpdate: function() {
                percentText.textContent = Math.round(this.targets()[0].textContent) + '%';
              }
            });
          });
        } else {
          // Additional Competencies specific animation - skills coming from left and right to center
          const skillTags = categoryElement.querySelectorAll('.other-skill-tag');
          
          skillTags.forEach((tag, index) => {
            const fromDirection = index % 2 === 0 ? -100 : 100; // Alternate left and right
            
            gsap.from(tag, {
              opacity: 0,
              x: fromDirection,
              duration: 0.7,
              delay: index * 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: categoryElement,
                start: 'top 75%',
                toggleActions: 'play none none none'
              }
            });
          });
        }
      });
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="skills-section" ref={skillsRef}>
      <div className="skills-container">
        <div className="skills-header" ref={titleRef}>
          <h2>Technical Expertise</h2>
          <p className="skills-subtitle">Leveraging cutting-edge technologies to deliver exceptional solutions</p>
        </div>
        
        <div className="skills-grid">
          {/* Adobe Technologies */}
          <div className="skill-category" ref={adobeRef}>
            <div className="skill-category-title">
              <div className="skill-category-icon adobe-icon"></div>
              <h3>Adobe Technologies</h3>
            </div>
            <div className="skill-progress-list">
              {skillsData.adobe.map((skill, index) => (
                <div className="skill-progress-item" key={index}>
                  <div className="skill-progress-info">
                    <span className="skill-progress-label">{skill.name}</span>
                    <span className="skill-progress-percent">{skill.level}%</span>
                  </div>
                  <div className="skill-progress-bar">
                    <div 
                      className="skill-progress-bar-fill adobe-gradient" 
                      data-value={`${skill.level}%`}>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>

          {/* Development */}
          <div className="skill-category" ref={developmentRef}>
            <div className="skill-category-title">
              <div className="skill-category-icon dev-icon"></div>
              <h3>Development</h3>
            </div>
            <div className="skill-progress-list">
              {skillsData.development.map((skill, index) => (
                <div className="skill-progress-item" key={index}>
                  <div className="skill-progress-info">
                    <span className="skill-progress-label">{skill.name}</span>
                    <span className="skill-progress-percent">{skill.level}%</span>
                  </div>
                  <div className="skill-progress-bar">
                    <div 
                      className="skill-progress-bar-fill dev-gradient" 
                      data-value={`${skill.level}%`}>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Emerging Tech */}
          <div className="skill-category" ref={emergingRef}>
            <div className="skill-category-title">
              <div className="skill-category-icon emerging-icon"></div>
              <h3>Emerging Technologies</h3>
            </div>
            <div className="skill-progress-list">
              {skillsData.emerging.map((skill, index) => (
                <div className="skill-progress-item" key={index}>
                  <div className="skill-progress-info">
                    <span className="skill-progress-label">{skill.name}</span>
                    <span className="skill-progress-percent">{skill.level}%</span>
                  </div>
                  <div className="skill-progress-bar">
                    <div 
                      className="skill-progress-bar-fill emerging-gradient" 
                      data-value={`${skill.level}%`}>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Competencies */}
          <div className="skill-category other-skills" ref={additionalRef}>
            <div className="skill-category-title">
              <div className="skill-category-icon other-icon"></div>
              <h3>Additional Competencies</h3>
            </div>
            <div className="other-skills-cloud">
              {skillsData.other.map((skill, index) => (
                <div 
                  className="other-skill-tag" 
                  key={index}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="skills-footer">
          <div className="certification-badge">
            <div className="certification-badge-icon">
              <FaCertificate />
              </div>
            <div className="certification-badge-content">
              <h4>Project Management Professional (PMP)®</h4>
              <p>PMI - Project Management Institute</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
