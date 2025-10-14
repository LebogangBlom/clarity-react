import React, { useState } from 'react';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from '../firebase/config';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [modal, setModal] = useState({ message: null, type: null });
    const [loading, setLoading] = useState(false);
    const db = getFirestore(app);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            await addDoc(collection(db, "contacts"), {
                ...formData,
                createdAt: new Date()
            });
            setModal({ message: 'Your message has been sent successfully!', type: 'success' });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setModal({ message: 'Failed to send message. Please try again later.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loader />}
            <Modal 
                message={modal.message} 
                onClose={() => setModal({ message: null, type: null })} 
                type={modal.type} 
            />
            <div className="contact-container">
                <div className="contact-form">
                    <h2>Contact Us</h2>
                    <p>Have a question or want to work with us? Fill out the form below and we'll get back to you as soon as possible.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p className="error-text">{errors.name}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                            {errors.message && <p className="error-text">{errors.message}</p>}
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Contact;
