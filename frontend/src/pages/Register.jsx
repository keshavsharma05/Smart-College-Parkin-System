import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Car, Mail, Lock, User, Briefcase, Hash, AlertCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'USER', userType: 'STUDENT', vehicleNumber: '', department: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const res = await register(formData);
    
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
      <div className="auth-card animate-fade-in" style={{ maxWidth: '600px' }}>
        <div className="auth-header">
          <h1><Car size={32} /> CampusPark</h1>
          <p>Create a new account</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="stats-grid" style={{ marginBottom: '0', gap: '1rem' }}>
            <div className="form-group">
              <label>Full Name</label>
              <div className="flex align-center gap-sm">
                <User size={18} className="text-muted" style={{ position: 'absolute', marginLeft: '1rem' }} />
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} style={{ paddingLeft: '2.5rem' }} required />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="flex align-center gap-sm">
                <Mail size={18} className="text-muted" style={{ position: 'absolute', marginLeft: '1rem' }} />
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} style={{ paddingLeft: '2.5rem' }} required />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="flex align-center gap-sm">
              <Lock size={18} className="text-muted" style={{ position: 'absolute', marginLeft: '1rem' }} />
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} style={{ paddingLeft: '2.5rem' }} required />
            </div>
          </div>

          <div className="stats-grid" style={{ marginBottom: '0', gap: '1rem' }}>
            <div className="form-group">
              <label>Role</label>
              <select className="form-control" name="role" value={formData.role} onChange={handleChange}>
                <option value="USER">User (Student/Teacher)</option>
                <option value="STAFF">Parking Staff</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>

            {formData.role === 'USER' && (
              <div className="form-group">
                <label>User Type</label>
                <select className="form-control" name="userType" value={formData.userType} onChange={handleChange}>
                  <option value="STUDENT">Student</option>
                  <option value="TEACHER">Teacher</option>
                </select>
              </div>
            )}
          </div>

          <div className="stats-grid" style={{ marginBottom: '0', gap: '1rem' }}>
            <div className="form-group">
              <label>Vehicle Number</label>
              <div className="flex align-center gap-sm">
                <Hash size={18} className="text-muted" style={{ position: 'absolute', marginLeft: '1rem' }} />
                <input type="text" className="form-control" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} style={{ paddingLeft: '2.5rem' }} placeholder="Ex: ABC-1234" />
              </div>
            </div>

            <div className="form-group">
              <label>Department</label>
              <div className="flex align-center gap-sm">
                <Briefcase size={18} className="text-muted" style={{ position: 'absolute', marginLeft: '1rem' }} />
                <input type="text" className="form-control" name="department" value={formData.department} onChange={handleChange} style={{ paddingLeft: '2.5rem' }} placeholder="Ex: Computer Science" />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block mt-1" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="auth-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
