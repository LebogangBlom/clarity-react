import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { app } from '../firebase/config';

const ForgotPassword = () => {
    const [loginIdentifier, setLoginIdentifier] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const auth = getAuth(app);
    const db = getFirestore(app);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setLoading(true);

        try {
            let email;
            if (loginIdentifier.includes('@')) {
                email = loginIdentifier;
            } else {
                const q = query(collection(db, "clients"), where("uniqueNumber", "==", loginIdentifier));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    setError('If you entered a unique number, it was not found. Please check and try again.');
                    setLoading(false);
                    return;
                }
                email = querySnapshot.docs[0].data().email;
            }

            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent. Please check your inbox.');
        } catch (error) {
            setError('Failed to send password reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Forgot Password</h2>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="loginIdentifier">Email or Unique Number</label>
                        <input
                            type="text"
                            id="loginIdentifier"
                            placeholder="Email or Unique Number"
                            value={loginIdentifier}
                            onChange={(e) => setLoginIdentifier(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Email'}
                    </button>
                </form>
                <p className="toggle-form">
                    <Link to="/client-login">Back to Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;