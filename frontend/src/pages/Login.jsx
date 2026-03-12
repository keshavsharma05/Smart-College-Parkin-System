import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Car, Mail, Lock, AlertCircle } from 'lucide-react';
import './Login.css';
import logo from '../assets/logo.png';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const res = await login(email, password);
    
    if (res.success) {
      if (res.role === 'ADMIN') navigate('/admin');
      else if (res.role === 'STAFF') navigate('/staff');
      else navigate('/dashboard');
    } else {
      setError(res.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade-in">
<div className="auth-header">
  <div className="brand">
    <img src={logo} alt="ParkFlow Logo" className="brand-logo"/>
    <span className="brand-name">ParkFlow</span>
  </div>

  <p>Sign in to your account</p>
</div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="flex align-center gap-sm">
              <Mail size={18} className="text-muted" style={{ position: 'absolute', marginLeft: '1rem' }} />
              <input 
                type="email" 
                className="form-control" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex. john@campus.edu"
                style={{ paddingLeft: '2.5rem' }}
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="flex align-center gap-sm">
              <Lock size={18} className="text-muted" style={{ position: 'absolute', marginLeft: '1rem' }} />
              <input 
                type="password" 
                className="form-control" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                style={{ paddingLeft: '2.5rem' }}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block mt-2" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
