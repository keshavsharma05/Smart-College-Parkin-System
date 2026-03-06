import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { QrCode, LogOut, Search, User, Car, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const StaffDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [checkInForm, setCheckInForm] = useState({ bookingId: '', vehicleNumber: '' });
  const [checkOutForm, setCheckOutForm] = useState({ bookingId: '' });

  useEffect(() => {
    fetchTodayBookings();
  }, []);

  const fetchTodayBookings = async () => {
    try {
      const res = await api.get('/staff/today-bookings');
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch today bookings');
      setLoading(false);
    }
  };

  const handleCheckIn = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await api.post('/staff/checkin', checkInForm);
      setSuccess(`Vehicle ${checkInForm.vehicleNumber} checked in successfully!`);
      setCheckInForm({ bookingId: '', vehicleNumber: '' });
      fetchTodayBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Check-in failed');
    }
  };

  const handleCheckOut = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await api.post('/staff/checkout', checkOutForm);
      setSuccess(`Vehicle checked out successfully!`);
      setCheckOutForm({ bookingId: '' });
      fetchTodayBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Check-out failed');
    }
  };

  return (
    <div className="main-content">
      <div className="flex justify-between align-center mb-2">
        <h2><Clock size={28} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Staff Control Panel</h2>
      </div>

      {error && <div className="alert alert-error mb-2"><AlertCircle size={18} /> {error}</div>}
      {success && <div className="alert alert-success mb-2"><CheckCircle size={18} /> {success}</div>}

      <div className="stats-grid animate-fade-in" style={{ gap: '2rem' }}>
        
        {/* CHECK-IN CARD */}
        <div className="card">
          <div className="flex align-center gap-sm mb-1" style={{ color: 'var(--success)', fontWeight: 'bold' }}>
            <QrCode size={24} /> <h3>Vehicle Check-In</h3>
          </div>
          <form onSubmit={handleCheckIn}>
            <div className="form-group">
              <label>Booking ID</label>
              <input 
                type="text" 
                className="form-control" 
                value={checkInForm.bookingId}
                onChange={(e) => setCheckInForm({...checkInForm, bookingId: e.target.value})}
                placeholder="Paste Booking ID here"
                required 
              />
            </div>
            <div className="form-group">
              <label>Vehicle Number</label>
              <input 
                type="text" 
                className="form-control" 
                value={checkInForm.vehicleNumber}
                onChange={(e) => setCheckInForm({...checkInForm, vehicleNumber: e.target.value})}
                placeholder="Verify Vehicle Number"
                required 
              />
            </div>
            <button type="submit" className="btn btn-success btn-block mt-1">Confirm Check-In</button>
          </form>
        </div>

        {/* CHECK-OUT CARD */}
        <div className="card">
          <div className="flex align-center gap-sm mb-1" style={{ color: 'var(--danger)', fontWeight: 'bold' }}>
            <LogOut size={24} /> <h3>Vehicle Check-Out</h3>
          </div>
          <form onSubmit={handleCheckOut}>
            <div className="form-group">
              <label>Booking ID</label>
              <input 
                type="text" 
                className="form-control" 
                value={checkOutForm.bookingId}
                onChange={(e) => setCheckOutForm({ bookingId: e.target.value })}
                placeholder="Paste Booking ID here"
                required 
              />
            </div>
            <div className="form-group">
               <label>Notes (Optional)</label>
               <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Any damage or issues?" 
                  style={{ opacity: 0.7 }}
               />
            </div>
            <button type="submit" className="btn btn-danger btn-block mt-1">Confirm Check-Out</button>
          </form>
        </div>
      </div>

      <div className="card mt-2">
        <h3 className="mb-1">Today's Bookings Overview</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>User</th>
                  <th>Vehicle</th>
                  <th>Slot Details</th>
                  <th>Status</th>
                  <th>Quick Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td><small style={{ userSelect: 'all', cursor: 'pointer', color: 'var(--primary)' }}>{b._id}</small></td>
                    <td>{b.userId?.name}</td>
                    <td><strong>{b.vehicleNumber}</strong></td>
                    <td>{b.slotId?.slotNumber} ({b.slotId?.slotType})</td>
                    <td>
                      <span className={`badge ${
                        b.status === 'BOOKED' ? 'badge-info' : 
                        b.status === 'ACTIVE' ? 'badge-warning' : 
                        b.status === 'COMPLETED' ? 'badge-success' : 'badge-danger'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      {b.status === 'BOOKED' && (
                        <button 
                          className="btn btn-sm btn-success flex align-center gap-sm"
                          onClick={() => { setCheckInForm({ bookingId: b._id, vehicleNumber: b.vehicleNumber }) }}
                        >
                          Fill Check-In
                        </button>
                      )}
                      {b.status === 'ACTIVE' && (
                        <button 
                          className="btn btn-sm btn-danger flex align-center gap-sm"
                          onClick={() => { setCheckOutForm({ bookingId: b._id }) }}
                        >
                          Fill Check-Out
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center">No bookings for today.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
