import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin-dashboard');
        } catch (error) {
            setError("Invalid email or password. Please try again."); // More user-friendly error
        }
    };

    return (
        <div className="cly-login-container">
            <div className="cly-login-form">
                <h2>Admin Login</h2>
                {error && <p className="cly-error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="cly-form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="cly-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="cly-btn cly-btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;