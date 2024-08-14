import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';  

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        email: '',
        phoneNumber: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = async (event) => {
        event.preventDefault();

        const userData = {
            ...formData,
            role: 'BUYER' 
        };

        try {
            onSignUpSuccess();
        } catch (error) {
            console.error("Eroare la înregistrare", error);
        }
    };

    const onSignUpSuccess = () => {
        navigate('/recipes');
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp} className="auth-form">
                {['name', 'username', 'password', 'email', 'phoneNumber'].map((field) => (
                    <div className="form-group" key={field}>
                        <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input
                            type={field === 'password' ? 'password' : 'text'}
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            required={field !== 'phoneNumber'}
                        />
                    </div>
                ))}
                <button type="submit" className="auth-button">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
