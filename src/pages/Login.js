// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import './Login.css'; // Add your styles here

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
        await signInWithEmailAndPassword(auth, email, password);
        // Redirect or do something after successful login
        } catch (err) {
        setError(err.message);
        }
    };


    return (
        <div className="create">
          <h2 className="page-title">LOGIN</h2>
          <form onSubmit={handleSubmit}>
    
            <label>
              <span>Username</span>
              <input 
                type="text"
                placeholder='Username'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </label>
            
            <label>
              <span>Password</span>
              <input 
                type="text"
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </label> 
            {error && <p className="error">{error}</p>}
            <button className="btn">submit</button>
          </form>
        </div>
      );
}
