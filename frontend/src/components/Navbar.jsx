import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LogOut, User as UserIcon } from "lucide-react";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">

      {/* BRAND */}
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="ParkFlow Logo" className="navbar-logo" />
        ParkFlow
      </Link>

      {/* RIGHT SIDE */}

      {user ? (

        <div className="navbar-user">

          {/* USER NAME */}
          <div className="navbar-username" onClick={toggleDropdown}>
            <UserIcon size={16} />
            {user.name}
          </div>

          {/* DROPDOWN (mobile) */}
          {dropdownOpen && (
            <div className="navbar-dropdown">
              <button onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}

          {/* DESKTOP LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="nav-btn-danger navbar-logout-desktop"
          >
            <LogOut size={16} />
          </button>

        </div>

      ) : (

        <div className="navbar-links">
          <Link to="/" className="nav-btn-secondary">Login</Link>
          <Link to="/register" className="nav-btn-primary">Register</Link>
        </div>

      )}

    </nav>
  );
};

export default Navbar;