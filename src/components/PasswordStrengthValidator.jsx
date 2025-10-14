import React from 'react';
import './PasswordStrengthValidator.css';

const PasswordStrengthValidator = ({ password, isVisible }) => {
    const checks = {
        length: password.length >= 8,
        lower: /(?=.*[a-z])/.test(password),
        upper: /(?=.*[A-Z])/.test(password),
        number: /(?=.*[0-9])/.test(password),
        special: /(?=.*[!@#$%^&*])/.test(password),
    };

    return (
        <div className={`password-strength-validator ${isVisible ? 'visible' : ''}`}>
            <p className={checks.length ? 'valid' : 'invalid'}>
                {checks.length ? '✓' : '✗'} At least 8 characters
            </p>
            <p className={checks.upper ? 'valid' : 'invalid'}>
                {checks.upper ? '✓' : '✗'} At least one uppercase letter
            </p>
            <p className={checks.lower ? 'valid' : 'invalid'}>
                {checks.lower ? '✓' : '✗'} At least one lowercase letter
            </p>
            <p className={checks.number ? 'valid' : 'invalid'}>
                {checks.number ? '✓' : '✗'} At least one number
            </p>
            <p className={checks.special ? 'valid' : 'invalid'}>
                {checks.special ? '✓' : '✗'} At least one special character (!@#$%^&*)
            </p>
        </div>
    );
};

export default PasswordStrengthValidator;
