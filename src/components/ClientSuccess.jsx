import React, { useEffect } from 'react';
import '../styles/ClientSuccess.css';

const ClientSuccess = () => {
  // Client success stories data
  const successStories = [
    {
      client: "Adobe Systems",
      message: "The AEM implementation transformed our digital presence, resulting in a 40% increase in user engagement and streamlined content delivery across channels."
    },
    {
      client: "IBM Corporation",
      message: "Seamless migration to AEM with zero downtime. The platform's flexibility and robust architecture have greatly improved our global content operations."
    },
    {
      client: "Deloitte Digital",
      message: "The intelligent forms solution revolutionized our client onboarding process, improving accuracy by 85% and dramatically reducing processing times."
    }
  ];
  
  useEffect(() => {
    const cards = document.querySelectorAll('.success-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.3 });
    
    cards.forEach(card => {
      observer.observe(card);
    });
    
    return () => {
      cards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, []);
  
  return (
    <section id="success-stories" className="testimonials-section">
      <div className="scene">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <h2>Client Success Stories</h2>
            <div className="header-line"></div>
            <p>See how we've helped leading organizations transform their digital experiences</p>
          </div>

          <div className="success-cards-container">
            {successStories.map((story, index) => (
              <div className="success-card" key={index} style={{ '--delay': `${index * 0.2}s` }}>
                <div className="card-content">
                  <div className="card-front">
                    <div className="client-name">{story.client}</div>
                    <div className="quote-icon">❝</div>
                    <p className="testimonial-message">{story.message}</p>
                  </div>
                  <div className="card-back">
                    <div className="glow"></div>
                    <div className="back-content">
                      <div className="client-name">{story.client}</div>
                      <div className="card-shape"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSuccess; 