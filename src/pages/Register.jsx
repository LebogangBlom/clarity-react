import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from '../firebase/config';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import PasswordStrengthValidator from '../components/PasswordStrengthValidator';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        businessName: '',
        businessType: 'self-entrepreneur',
        companyWebsite: ''
    });
    const [errors, setErrors] = useState({});
    const [modal, setModal] = useState({ message: null, type: null });
    const [loading, setLoading] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth(app);
    const db = getFirestore(app);

    const validatePassword = (password) => {
        const checks = {
            length: password.length >= 8,
            lower: /(?=.*[a-z])/.test(password),
            upper: /(?=.*[A-Z])/.test(password),
            number: /(?=.*[0-9])/.test(password),
            special: /(?=.*[!@#$%^&*])/.test(password),
        };
        return Object.values(checks).every(Boolean);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!validatePassword(formData.password)) {
            newErrors.password = 'Password does not meet the requirements.';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }
        if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required.';
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
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            const clientData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                businessName: formData.businessName,
                businessType: formData.businessType,
                companyWebsite: formData.companyWebsite,
                registrationYear: new Date().getFullYear(),
                uniqueNumber: new Date().getFullYear().toString() + Math.random().toString().slice(2, 8)
            };

            await setDoc(doc(db, "clients", user.uid), clientData);
            await setDoc(doc(db, "admins", user.uid), clientData); // Also for admin view

            setModal({ message: 'Registration successful! Redirecting to your dashboard...', type: 'success' });
            setTimeout(() => navigate('/client-dashboard'), 2000);

        } catch (error) {
            setModal({ message: 'Failed to register. The email might already be in use.', type: 'error' });
            console.error("Error during registration:", error);
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
            <div className="login-container">
                <div className="login-form">
                    <h2>Create Client Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" name="firstName" onChange={handleChange} />
                            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" name="lastName" onChange={handleChange} />
                            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" onChange={handleChange} />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                onChange={handleChange} 
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                            />
                            <PasswordStrengthValidator password={formData.password} isVisible={isPasswordFocused} />
                            {errors.password && <p className="error-text">{errors.password}</p>}
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirmPassword" onChange={handleChange} />
                            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                        </div>
                        <div className="form-group">
                            <label>Business Name</label>
                            <input type="text" name="businessName" onChange={handleChange} />
                            {errors.businessName && <p className="error-text">{errors.businessName}</p>}
                        </div>
                        <div className="form-group">
                            <label>Business Type</label>
                            <select name="businessType" value={formData.businessType} onChange={handleChange}>
                                <option value="self-entrepreneur">Self-Entrepreneur</option>
                                <option value="small-business">Small Business</option>
                                <option value="startup">Startup</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Company Website (Optional)</label>
                            <input type="text" name="companyWebsite" onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            Register
                        </button>
                    </form>
                    <p className="toggle-form">
                        Already have an account? <Link to="/client-login">Login</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
