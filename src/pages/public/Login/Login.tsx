import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Login/Login.css';
import { useAuth } from '../../../context/AuthContext';
import { FiUser, FiLock, FiLogIn, FiAlertTriangle } from 'react-icons/fi';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(username, password);
            navigate('/buses');
        } catch (error) {
            setError('Usuario o contraseña invalidos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h2 className="login-title">Iniciar sesión</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="error-message">
                            <FiAlertTriangle size={18} />
                            {error}
                        </div>
                    )}
                    <div className="form-group">
                        <FiUser size={18} />
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="form-input"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <FiLock size={18} />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="form-input"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="login-button"
                    >
                        {loading ? (
                            'Iniciando sesión...'
                        ) : (
                            <>
                                <FiLogIn size={18} />
                                Iniciar sesión
                            </>
                        )}
                    </button>

                    <div className="register-link">
                        <p>
                            ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;