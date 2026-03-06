import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { 
  Users, 
  MapPin, 
  CheckCircle, 
  Car, 
  AlertTriangle,
  FileText
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/admin/dashboard');
      setStats(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch stats', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="app-container"><div className="main-content"><h2>Loading Dashboard...</h2></div></div>;

  return (
    <div className="main-content">
      <div className="flex justify-between align-center mb-2">
        <h2>Admin Overview</h2>
        <Link to="/admin/slots" className="btn btn-primary">
          <MapPin size={18} /> Manage Slots
        </Link>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)' }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)' }}>
            <MapPin size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Slots</h3>
            <p>{stats.totalSlots}</p>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>Available Slots</h3>
            <p>{stats.availableSlots}</p>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="stat-info">
            <h3>Occupied Slots</h3>
            <p>{stats.occupiedSlots}</p>
          </div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
            <Car size={24} />
          </div>
          <div className="stat-info">
            <h3>Reserved Teacher Slots</h3>
            <p>{stats.reservedTeacherSlots}</p>
          </div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
            <FileText size={24} />
          </div>
          <div className="stat-info">
            <h3>Active Bookings</h3>
            <p>{stats.activeBookings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
