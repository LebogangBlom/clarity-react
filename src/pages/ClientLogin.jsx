import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import { initializeFirebase } from '../firebase/config';

const ClientLogin = () => {
    const [formData, setFormData] = useState({ loginIdentifier: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const app = initializeFirebase();
            const auth = getAuth(app);
            const db = getFirestore(app);
            let email;

            if (formData.loginIdentifier.includes('@')) {
                email = formData.loginIdentifier;
            } else {
                const q = query(collection(db, "clients"), where("uniqueNumber", "==", formData.loginIdentifier));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    setError('Invalid credentials.');
                    setLoading(false);
                    return;
                }
                email = querySnapshot.docs[0].data().email;
            }

            await signInWithEmailAndPassword(auth, email, formData.password);
            navigate('/client-dashboard');
        } catch (error) {
            setError('Invalid credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Client Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="loginIdentifier">Email or Unique Number</label>
                        <input
                            type="text"
                            id="loginIdentifier"
                            name="loginIdentifier"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="toggle-form">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
                <p className="toggle-form">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </p>
            </div>
        </div>
    );
};

export default ClientLogin;
