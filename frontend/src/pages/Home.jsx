import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="home-container">
            <div className="hero-section">
                <h1 className="hero-title">
                    Organize Your Tasks with <span className="highlight">Todo App</span>
                </h1>
                <p className="hero-subtitle">
                    Create boards, manage todos, and boost your productivity
                </p>

                <div className="hero-actions">
                    {isAuthenticated ? (
                        <Link to="/dashboard" className="btn-hero-primary">
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link to="/register" className="btn-hero-primary">
                                Get Started Free
                            </Link>
                            <Link to="/login" className="btn-hero-secondary">
                                Sign In
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <div className="features-section">
                <h2>Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📋</div>
                        <h3>Multiple Boards</h3>
                        <p>Organize your tasks into different boards for work, personal, and more</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">✅</div>
                        <h3>Task Management</h3>
                        <p>Create, edit, and track your todos with ease</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>Priority Levels</h3>
                        <p>Set priority levels and due dates for your tasks</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Secure & Private</h3>
                        <p>Your data is safe and accessible only to you</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
