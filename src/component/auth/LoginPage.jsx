import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

  const from = location.state?.from?.pathname || '/home';


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        // Check for admin credentials
        if (email === '2300032416@kluniversity.in') {
            if (password === '2300032416') {
                localStorage.setItem('token', 'admin-token');
                localStorage.setItem('role', 'ADMIN');
                localStorage.setItem('user', '2300032416@kluniversity.in');
                navigate('/admin');
                return;
            } else {
                setError('Invalid admin credentials.');
                setTimeout(() => setError(''), 5000);
                return;
            }
        }

        // Normal user login
        try {
            const response = await ApiService.loginUser({email, password});
            if (response.statusCode === 200) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                navigate(from, { replace: true });
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            <p className="register-link">
                Don't have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
}

export default LoginPage;
