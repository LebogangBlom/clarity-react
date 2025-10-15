import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.message) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsModalOpen(true);
        } else {
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode({
                    "form-name": "contact",
                    ...formData
                })
            })
            .then(() => navigate("/thank-you"))
            .catch(error => alert(error));
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Helmet>
                <title>Contact Us - Clarity</title>
                <meta name="description" content="Get in touch with the Clarity team. We're here to help you with any questions you may have." />
                <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            </Helmet>
            <section className="cly-contact-hero">
                <div className="cly-contact-hero-image">
                    <img src="/images/contact-hero.jpg" alt="Contact Us" />
                </div>
                <div className="cly-contact-content">
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you. Please fill out the form below to get in touch.</p>
                </div>
            </section>
            <section className="cly-contact-section">
                <div className="cly-contact-info">
                    <h2>Our Information</h2>
                    <p>You can also reach us through the following channels:</p>
                    <ul>
                        <li><i className="fas fa-envelope"></i> <a href="mailto:contact@clarity.com">contact@clarity.com</a></li>
                        <li><i className="fas fa-phone"></i> (555) 123-4567</li>
                        <li><i className="fas fa-map-marker-alt"></i> 123 Clarity St, Suite 100, San Francisco, CA 94102</li>
                    </ul>
                </div>
                <div className="cly-contact-form-container">
                    <h2>Send a Message</h2>
                    <form
                        name="contact"
                        method="POST"
                        onSubmit={handleSubmit}
                    >
                        <input type="hidden" name="form-name" value="contact" />
                        <div className="cly-form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="cly-form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="cly-form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="cly-form-group">
                            <div data-netlify-recaptcha="true"></div>
                        </div>
                        <button type="submit" className="cly-form-btn">Send Message</button>
                    </form>
                </div>
            </section>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Form Errors</h2>
                <ul>
                    {Object.values(errors).map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            </Modal>
        </>
    );
};

export default Contact;
