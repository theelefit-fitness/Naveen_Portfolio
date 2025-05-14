import React from 'react';
import '../styles/Projects.css';
import ScrollAnimation from './ScrollAnimation';

const Projects = () => {
  const projects = [
    {
      title: "AEM Digital Asset Management",
      category: "Federal Government",
      description: "Implemented a comprehensive Digital Asset Management solution using AEM Assets, enabling centralized storage, organization, and distribution of digital assets across multiple departments.",
      technologies: ["AEM 6.5", "Adobe Experience Manager Assets", "Adobe DAM", "RESTful APIs"],
      impact: "Reduced asset search time by 65% and increased asset reuse by 40%"
    },
    {
      title: "Intelligent Forms Automation",
      category: "Healthcare",
      description: "Developed an intelligent forms solution using AEM Forms and AI to automate data extraction, validation, and processing, reducing processing time by 70%.",
      technologies: ["AEM Forms", "Workflow Automation", "Machine Learning", "Document Analysis"],
      impact: "Saved 12,000+ staff hours annually and improved data accuracy by 45%"
    },
    {
      title: "Digital Transformation Portal",
      category: "Public Sector",
      description: "Created a centralized portal for citizens to access government services, integrating multiple backend systems through RESTful web services.",
      technologies: ["AEM Sites", "RESTful Web Services", "User Authentication", "Service Integration"],
      impact: "Serves 500,000+ monthly users with 99.8% uptime"
    },
    {
      title: "Enterprise Content Repository",
      category: "Energy Sector",
      description: "Designed and implemented an enterprise content repository with advanced search capabilities, improving document discovery and compliance.",
      technologies: ["AEM", "Apache Solr", "Content Classification", "Taxonomy Management"],
      impact: "Enhanced document retrieval speed by 85% and improved compliance reporting"
    },
    {
      title: "AI-Powered Content Recommendations",
      category: "Media & Entertainment",
      description: "Integrated machine learning algorithms with AEM to provide personalized content recommendations based on user behavior and preferences.",
      technologies: ["AEM Personalization", "Machine Learning", "User Behavior Analytics", "Content Targeting"],
      impact: "Increased user engagement by 32% and session duration by 28%"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <ScrollAnimation type={ScrollAnimation.ANIMATIONS.FADE_UP}>
          <div className="projects-header">
            <h2>Featured Projects</h2>
            <div className="header-underline"></div>
            <p>Transforming enterprises with cutting-edge AEM solutions</p>
          </div>
        </ScrollAnimation>
        
        <div className="projects-wrapper">
          {projects.map((project, index) => (
            <ScrollAnimation 
              key={index} 
              type={index % 2 === 0 ? ScrollAnimation.ANIMATIONS.FADE_LEFT : ScrollAnimation.ANIMATIONS.FADE_RIGHT} 
              delay={0.2 + (index * 0.1)}
            >
              <div className="project-item">
                <div className="project-content">
                  <div className="project-tag">{project.category}</div>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-impact">
                    <span className="impact-label">Impact:</span> {project.impact}
                  </div>
                  <div className="project-tech-stack">
                    {project.technologies.map((tech, techIndex) => (
                      <span className="tech-item" key={techIndex}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 