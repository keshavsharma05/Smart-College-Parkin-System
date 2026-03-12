import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin
import AdminDashboard from './pages/admin/Dashboard';
import SlotManagement from './pages/admin/SlotManagement';

// Staff
import StaffDashboard from './pages/staff/StaffDashboard';

// User
import UserDashboard from './pages/user/UserDashboard';
import BookSlot from './pages/user/BookSlot';
import CreateStaff from './pages/admin/createStaff';
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/slots" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <SlotManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/create-staff" element={
  <ProtectedRoute allowedRoles={['ADMIN']}>
    <CreateStaff />
  </ProtectedRoute>
} />
            {/* Staff Routes */}
            <Route path="/staff" element={
              <ProtectedRoute allowedRoles={['STAFF']}>
                <StaffDashboard />
              </ProtectedRoute>
            } />
            
            {/* User Routes (both Student and Teacher) */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['USER', 'STUDENT', 'TEACHER']}>
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/book" element={
              <ProtectedRoute allowedRoles={['USER', 'STUDENT', 'TEACHER']}>
                <BookSlot />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
