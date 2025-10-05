import React from 'react'

export default function Services(){
  return (
    <>
      <section className="cly-container-services">
        <div className="cly-services-div">
          <h2>Services</h2>
          <p></p>
        </div>
      </section>

      <section className="cly-services">
        <div className="cly-container-services-flex">
          <div className="cly-services-card">
            <h3>Web Development</h3>
            <p>We build scalable and robust Front-End websites tailored to your startup's unique needs, using the latest technologies and best practices.</p>
          </div>
          <div className="cly-services-card">
            <h3>Product Strategy</h3>
            <p>We work closely with you to define a clear product vision and roadmap, ensuring your digital solution aligns with your business goals.</p>
          </div>
          <div className="cly-services-card">
            <h3>Brand Strategy</h3>
            <p>We work with you to craft a compelling brand identity that resonates with your target audience and sets you apart in the market.</p>
          </div>
          <div className="cly-services-card">
            <h3>Data Strategy</h3>
            <p>We help you leverage data to make informed decisions, optimize performance, and gain insights into user behavior.</p>
          </div>
        </div>
      </section>
    </>
  )
}
