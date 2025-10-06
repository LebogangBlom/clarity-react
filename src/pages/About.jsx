import React from 'react'

export default function About(){
  return (
    <>
      <section className="cly-about-us-container">
        <div className="cly-about-us-div">
          <h2>About Us</h2>
          <p>We believe exceptional customer experiences are the key to business growth. We're a customer experience consultancy dedicated to helping brands build deeper connections with their audiences through strategic insights, innovative design, and meaningful engagement.</p>
        </div>
      </section>

      <section className="cly-values-section">
            <h2>What We stand for</h2>
            <div className="cly-values-grid">
                <div className="cly-value-card">
                    <h3>Innovation</h3>
                    <p>Staying ahead of the curve with forward-thinking solutions that leverage emerging technologies to drive business growth and differentiation.</p>
                </div>
                <div className="cly-value-card">
                    <h3>Collaboration</h3>
                    <p>Delivering results through close partnership, transparent communication, and co-creation that ensures every solution aligns with real business needs.</p>
                </div>
                <div className="cly-value-card">
                    <h3>Integrity</h3>
                    <p>Upholding honesty and accountability in every engagement, building trust through consistent delivery and ethical practices.</p>
                </div>
                <div className="cly-value-card">
                    <h3>Excellence</h3>
                    <p>Raising the bar with meticulous attention to detail, delivering solutions that are not only reliable and efficient but also crafted to the highest standards.</p>
                </div>
            </div>
        </section>
    </>
  )
}
