import { useState, useEffect, useContext } from 'react';
import api from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import { Trash2, AlertCircle, CheckCircle, Car } from 'lucide-react';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const res = await api.get('/bookings/my-bookings');
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load bookings');
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    setError('');
    setSuccess('');
    try {
      await api.post(`/bookings/cancel/${id}`);
      setSuccess('Booking cancelled successfully!');
      fetchMyBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  return (
    <div className="main-content">
      <div className="flex justify-between align-center mb-2">
        <h2 className="flex align-center gap-sm">
          <Car size={28} /> My Parking Dashboard
        </h2>
      </div>

      {error && <div className="alert alert-error mb-2"><AlertCircle size={18} /> {error}</div>}
      {success && <div className="alert alert-success mb-2"><CheckCircle size={18} /> {success}</div>}

      <div className="card animate-fade-in mt-1">
        <h3 className="mb-1">My Booking History</h3>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Slot Number</th>
                  <th>Location</th>
                  <th>Vehicle Number</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td>
                        {new Date(b.bookingTime).toLocaleDateString()} at{' '}
                        {new Date(b.bookingTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </td>
                    <td><strong>{b.slotId?.slotNumber}</strong></td>
                    <td>{b.slotId?.location}</td>
                    <td>{b.vehicleNumber}</td>
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
                          className="btn btn-sm btn-danger flex align-center gap-sm"
                          onClick={() => handleCancel(b._id)}
                        >
                          <Trash2 size={16} /> Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center">You don't have any bookings yet.</td>
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

export default UserDashboard;
