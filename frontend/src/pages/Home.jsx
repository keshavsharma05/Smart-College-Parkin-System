import { Link } from 'react-router-dom';
import { Car, Shield, Clock, Users } from 'lucide-react';

const Home = () => {
  return (
    <div style={{ padding: '0 2rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      <header className="animate-fade-in" style={{ padding: '6rem 0' }}>
        <Car size={80} color="var(--primary)" style={{ marginBottom: '2rem' }} />
        <h1>Smart Campus Parking Management</h1>
        <p className="text-muted mt-1" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto 3rem auto' }}>
          Effortless parking access and real-time management for students, teachers, staff, and administrators.
        </p>
        
        <div className="flex justify-center gap-1">
          <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
            Get Started
          </Link>
          <Link to="/login" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
            Sign In
          </Link>
        </div>
      </header>

      <div className="stats-grid mb-2" style={{ marginTop: '2rem' }}>
        <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Shield size={48} color="var(--info)" className="mb-1" />
          <h3>Role-Based Access</h3>
          <p className="text-muted">Separate portals for Admin, Staff, and Users ensuring optimal data privacy.</p>
        </div>
        
        <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Clock size={48} color="var(--success)" className="mb-1" />
          <h3>Real-time Updates</h3>
          <p className="text-muted">Instant slot booking, check-in validation, and active tracking by parking staff.</p>
        </div>

        <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Users size={48} color="var(--warning)" className="mb-1" />
          <h3>Priority Reservations</h3>
          <p className="text-muted">Dedicated teacher zones and open student spaces defined effectively.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
