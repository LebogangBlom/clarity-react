import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
    return (
        <section className="cly-thank-you-section">
            <h1>Thank You!</h1>
            <p>Your message has been sent successfully. We will get back to you shortly.</p>
            <Link to="/" className="cly-thank-you-btn">Go to Homepage</Link>
        </section>
    );
};

export default ThankYou;
