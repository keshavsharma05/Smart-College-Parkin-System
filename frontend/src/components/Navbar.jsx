import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Car, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <Car size={28} />
        CampusPark
      </Link>
      
      {user ? (
        <div className="navbar-links">
          {user.role === 'ADMIN' && <Link to="/admin">Dashboard</Link>}
          {user.role === 'ADMIN' && <Link to="/admin/slots">Slots</Link>}
          
          {user.role === 'STAFF' && <Link to="/staff">Staff Dashboard</Link>}
          
          {user.role === 'USER' && <Link to="/dashboard">My Bookings</Link>}
          {user.role === 'USER' && <Link to="/book">Book Slot</Link>}
          
          <div className="flex align-center gap-1 ml-2" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1.5rem', marginLeft: '1rem' }}>
            <span className="flex align-center gap-sm text-muted" style={{ fontSize: '0.9rem' }}>
              <UserIcon size={16} />
              {user.name} ({user.role})
            </span>
            <button onClick={handleLogout} className="btn btn-danger btn-sm flex align-center gap-sm">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="navbar-links">
          <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
          <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
