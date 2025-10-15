import React from 'react'

export default function Home(){
return (
    <>
        <section className="cly-hero">
            <div className="cly-hero-image">
                <img
                    src="/images/hero/clarity-hero.jpg"
                    alt="Three team members collaborating at a desk in a bright modern office, focused and engaged, with the text From Idea to Impact. We Make It Happen visible on a wall in the background"
                    loading="lazy"
                />
            </div>
            <div className="cly-hero-content">
                <h1>From Idea to Impact. We Make It Happen</h1>
                <p>We help brands design, optimize, and innovate every customer interaction — turning complexity into simplicity, and touchpoints into lasting impressions.</p>
                <a href="/about" className="cly-hero-button"> Learn more</a>
            </div>
        </section>

        <section className="cly-about-us-section">
            <div className="cly-about-us-flex container">
                <div className="cly-about-us-image">
                    <img
                        src="/images/index/about-us.jpg"
                        alt="Small group of developers gathered around a laptop, smiling and discussing a project in a cozy workspace with plants and natural light"
                        loading="lazy"
                    />
                </div>
                <div className="cly-about-us-content">
                    <h2>About Us</h2>
                    <p>We believe exceptional customer experiences are the key to business growth. We're a customer experience consultancy dedicated to helping brands build deeper connections with their audiences through strategic insights, innovative design, and meaningful engagement.</p>
                    <a href="/about" className="cly-about-us-btn">Learn More</a>
                </div>
            </div>
        </section>

        <section className="cly-services-values-section">
            <h2>Services</h2>
            <div className="cly-services-values-grid">
                <div className="cly-card">
                    <h3>CX Audits & Consulting</h3>
                    <p>Our CX Audits & Consulting service helps you evaluate your customer experience across all touchpoints. We identify gaps, optimize processes, and provide actionable insights to enhance customer satisfaction, loyalty, and retention.</p>
                </div>
                <div className="cly-card">
                    <h3>Content Marketing</h3>
                    <p>Engage and educate your audience with our targeted content marketing strategies. From blog posts to video content, we craft compelling messages that drive traffic, build brand awareness, and convert leads into loyal customers.</p>
                </div>
                <div className="cly-card">
                    <h3>Experience Design (UX/UI)</h3>
                    <p>Optimize your digital interfaces with our Experience Design services. We focus on creating intuitive, user-centered designs for websites and apps, ensuring a seamless experience that enhances customer satisfaction and engagement.</p>
                </div>
                <div className="cly-card">
                    <h3>Experience Innovation</h3>
                    <p>Stay ahead of the curve with Experience Innovation. We help you redefine customer experiences using emerging technologies, creative strategies, and data-driven insights to deliver cutting-edge solutions that resonate with your customers.</p>
                </div>
            </div>
        </section>

        <section className="cly-services-values-section">
            <h2>What We stand for</h2>
            <div className="cly-services-values-grid">
                <div className="cly-card">
                    <h3>Innovation</h3>
                    <p>Staying ahead of the curve with forward-thinking solutions that leverage emerging technologies to drive business growth and differentiation.</p>
                </div>
                <div className="cly-card">
                    <h3>Collaboration</h3>
                    <p>Delivering results through close partnership, transparent communication, and co-creation that ensures every solution aligns with real business needs.</p>
                </div>
                <div className="cly-card">
                    <h3>Integrity</h3>
                    <p>Upholding honesty and accountability in every engagement, building trust through consistent delivery and ethical practices.</p>
                </div>
                <div className="cly-card">
                    <h3>Excellence</h3>
                    <p>Raising the bar with meticulous attention to detail, delivering solutions that are not only reliable and efficient but also crafted to the highest standards.</p>
                </div>
            </div>
        </section>

        <section className="cly-contact-us">
            <div className="container cly-contact-flex">
                <div className="cly-about-us-content">
                    <h2>Contact Us</h2>
                    <p>Ready to take your customer experience to the next level? Reach out to start a conversation — no pressure, just possibilities.</p>
                    <a href="/contact" className="cly-contact-btn">Get in Touch</a>
                </div>
                <div className="cly-contact-image">
                    <img
                        src="/images/index/contact-us.jpg"
                        alt="Team member smiling while talking on the phone at a desk with a laptop, surrounded by office supplies and a window showing a sunny day, conveying a welcoming and approachable atmosphere"
                        className="cly-contact-img"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    </>
)
}