import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Register/Register.css';
import { useAuth } from '../../../context/AuthContext';
import { FiUser, FiMail, FiFileText, FiLock, FiUserPlus, FiAlertTriangle } from 'react-icons/fi';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register(username, email, nombreCompleto, password);
            navigate('/buses');
        } catch (error) {
            setError('Registro fallido. Por favor intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form-container">
                <h2 className="register-title">Crear una cuenta</h2>
                <form className="register-form" onSubmit={handleSubmit}>
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
                        <FiMail size={18} />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="form-input"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <FiFileText size={18} />
                        <input
                            id="nombreCompleto"
                            name="nombreCompleto"
                            type="text"
                            required
                            className="form-input"
                            placeholder="Nombre completo"
                            value={nombreCompleto}
                            onChange={(e) => setNombreCompleto(e.target.value)}
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
                        className="register-button"
                    >
                        {loading ? (
                            'Registrando...'
                        ) : (
                            <>
                                <FiUserPlus size={18} />
                                Registrarse
                            </>
                        )}
                    </button>

                    <div className="login-link">
                        <p>
                            ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;