import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { MapPin, Search, AlertCircle, CheckCircle } from 'lucide-react';

const BookSlot = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const res = await api.get('/slots/available');
      setSlots(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch slots');
      setLoading(false);
    }
  };

  const handleBook = async (slotId) => {
    setError('');
    setSuccess('');
    try {
      await api.post('/bookings/create', { slotId });
      setSuccess('Slot booked successfully!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book slot');
    }
  };

  return (
    <div className="main-content">
      <div className="flex justify-between align-center mb-2">
        <h2><MapPin size={28} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Book a Parking Slot</h2>
      </div>

      {error && <div className="alert alert-error mb-2"><AlertCircle size={18} /> {error}</div>}
      {success && <div className="alert alert-success mb-2"><CheckCircle size={18} /> {success}</div>}

      <div className="card animate-fade-in">
        <h3 className="mb-2">Available Slots for You</h3>
        
        {loading ? (
          <p>Loading available slots...</p>
        ) : (
          <div className="slot-grid">
            {slots.map((slot) => (
              <div 
                key={slot._id} 
                className={`slot-card ${slot.status}`}
                onClick={() => {
                   if(slot.status === 'AVAILABLE') setSelectedSlot(slot);
                }}
                style={{
                  borderWidth: selectedSlot?._id === slot._id ? '3px' : '2px',
                  transform: selectedSlot?._id === slot._id ? 'scale(1.05)' : 'none',
                  boxShadow: selectedSlot?._id === slot._id ? '0 0 20px rgba(79, 70, 229, 0.4)' : 'none'
                }}
              >
                <div className="slot-number">{slot.slotNumber}</div>
                <div className={`badge badge-sm ${slot.slotType === 'TEACHER' ? 'badge-info' : 'badge-success'}`}>
                  {slot.slotType}
                </div>
                <small className="text-muted mt-1" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <MapPin size={12} /> {slot.location}
                </small>
                
                {selectedSlot?._id === slot._id && slot.status === 'AVAILABLE' && (
                  <button 
                    className="btn btn-primary mt-1" 
                    onClick={(e) => { e.stopPropagation(); handleBook(slot._id); }}
                    style={{ width: '100%' }}
                  >
                    Confirm Booking
                  </button>
                )}
              </div>
            ))}
            {slots.length === 0 && (
              <div className="alert alert-info" style={{ gridColumn: '1 / -1' }}>
                <Search size={18} /> No available slots matching your user type.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSlot;
