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
                <p>We build fast, scalable websites for startups ready to grow. Our team blends sharp design with smart strategy to launch digital products that perform.</p>
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
                    <p>We are a passionate team dedicated to turning innovative ideas into powerful digital solutions. We specialize in building cutting-edge Front-End websites for startups, helping you grow from a concept into a competitive product.</p>
                    <a href="/about" className="cly-about-us-btn">Learn More</a>
                </div>
            </div>
        </section>

        <section className="cly-services">
            <div className="container">
                <h2>Services</h2>
                <div className="cly-services-grid">
                    <div className="cly-service-card">
                        <h3>Web</h3>
                        <p>Building front-end responsive and scalable websites from scratch.</p>
                    </div>
                    <div className="cly-service-card">
                        <h3>Product</h3>
                        <p>Defining your product's vision, roadmap, and core features for market success.</p>
                    </div>
                    <div className="cly-service-card">
                        <h3>Brand</h3>
                        <p>Crafting a compelling brand identity that resonates with your target audience.</p>
                    </div>
                    <div className="cly-service-card">
                        <h3>Data</h3>
                        <p>Unlocking insights from your data to drive business growth.</p>
                    </div>
                </div>
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

        <section className="cly-contact-us">
            <div className="container cly-contact-flex">
                <div className="cly-about-us-content">
                    <h2>Contact Us</h2>
                    <p>Whether you're a startup looking to build your first product or an established business seeking to innovate, We are here to help. Reach out to us today to discuss your project and discover how we can partner with you on your journey to success.</p>
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
