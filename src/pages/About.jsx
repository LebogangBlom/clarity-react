import React from 'react'

export default function About(){
  return (
    <>

      <section className="cly-about-us-container">
        <div className="cly-about-us-div">
          <h2>About Us</h2>
          <p>We are a passionate web development agency dedicated to turning innovative ideas into powerful digital solutions. We specialize in building cutting-edge Front-End websites for startups and small businesses, helping you grow from a concept into a competitive product.</p>
        </div>
      </section>

      <section className="cly-values-section">
        <h2>What We stand for</h2>
        <div className="cly-values-grid">
          <div className="cly-value-card">
            <h3>Innovation</h3>
            <p>We are dedicated to staying at the forefront of technology, creating forward-thinking solutions that drive your business forward and set you apart from the competition.</p>
          </div>
          <div className="cly-value-card">
            <h3>Collaboration</h3>
            <p>We believe the best results come from working together. We partner with our clients every step of the way, ensuring transparency and building solutions that truly meet your needs.</p>
          </div>
          <div className="cly-value-card">
            <h3>Integrity</h3>
            <p>Our commitment to honesty and ethical practice is non-negotiable. We build trust by delivering on our promises and operating with full transparency in all our projects.</p>
          </div>
          <div className="cly-value-card">
            <h3>Excellence</h3>
            <p>We are passionate about our craft. We strive for excellence in every line of code, ensuring that our solutions are not only functional but also robust, efficient, and of the highest quality.</p>
          </div>
        </div>
      </section>
    </>
  )
}
