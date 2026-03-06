import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Plus, Trash2, MapPin, AlertCircle } from 'lucide-react';

const SlotManagement = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [newSlot, setNewSlot] = useState({
    slotNumber: '',
    slotType: 'STUDENT',
    location: ''
  });

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await api.get('/admin/all-slots');
      setSlots(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load slots');
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/admin/create-slot', newSlot);
      setSuccess('Slot created successfully!');
      setNewSlot({ slotNumber: '', slotType: 'STUDENT', location: '' });
      fetchSlots();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create slot');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slot?')) return;
    setError('');
    setSuccess('');
    try {
      await api.delete(`/admin/delete-slot/${id}`);
      setSuccess('Slot deleted successfully!');
      fetchSlots();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete slot');
    }
  };

  return (
    <div className="main-content flex gap-2" style={{ flexDirection: 'column' }}>
      
      <div className="card animate-fade-in mb-2">
        <h2 className="flex align-center gap-sm mb-1"><MapPin size={24} /> Create New Parking Slot</h2>
        
        {error && <div className="alert alert-error"><AlertCircle size={18} /> {error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
        <form onSubmit={handleCreate} className="stats-grid" style={{ marginBottom: 0, alignItems: 'end' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Slot Number</label>
            <input 
              type="text" 
              className="form-control" 
              value={newSlot.slotNumber}
              onChange={(e) => setNewSlot({...newSlot, slotNumber: e.target.value})}
              placeholder="Ex: A-1, B-12"
              required 
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Slot Type</label>
            <select 
              className="form-control"
              value={newSlot.slotType}
              onChange={(e) => setNewSlot({...newSlot, slotType: e.target.value})}
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
            </select>
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Location Area</label>
            <input 
              type="text" 
              className="form-control" 
              value={newSlot.location}
              onChange={(e) => setNewSlot({...newSlot, location: e.target.value})}
              placeholder="Ex: North Parking Area"
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ height: '45px' }}>
            <Plus size={18} /> Add Slot
          </button>
        </form>
      </div>

      <div className="card animate-fade-in">
        <h2 className="mb-1">All Parking Slots</h2>
        
        {loading ? (
          <p>Loading slots...</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Slot Number</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot) => (
                  <tr key={slot._id}>
                    <td><strong>{slot.slotNumber}</strong></td>
                    <td>
                      <span className={`badge ${slot.slotType === 'TEACHER' ? 'badge-info' : 'badge-success'}`}>
                        {slot.slotType}
                      </span>
                    </td>
                    <td>{slot.location}</td>
                    <td>
                      <span className={`badge ${
                         slot.status === 'AVAILABLE' ? 'badge-success' : 
                         slot.status === 'RESERVED' ? 'badge-warning' : 'badge-danger'
                      }`}>
                        {slot.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDelete(slot._id)} 
                        className="btn btn-danger btn-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {slots.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center">No parking slots found.</td>
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

export default SlotManagement;
