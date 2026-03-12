import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Car, LogOut, User as UserIcon } from "lucide-react";
import "./Navbar.css";
import logo from "../assets/logo.png";
const Navbar = () => {
const { user, logout } = useContext(AuthContext);
const navigate = useNavigate();

const handleLogout = () => {
logout();
navigate("/");
};

return ( <nav className="navbar">

  {/* BRAND */}

<Link to="/" className="navbar-brand">
  <img src={logo} alt="ParkFlow Logo" className="navbar-logo" />
  ParkFlow
</Link>

  {/* RIGHT SIDE */}

  {user ? (
    <div className="navbar-links">


      {/* STAFF LINK */}


      {/* USER INFO + LOGOUT */}

      <div className="navbar-user">

        <span className="navbar-username">
          <UserIcon size={16} />
          {user.name}
        </span>

        <button onClick={handleLogout} className="nav-btn-danger">
          <LogOut size={16} />
          
        </button>

      </div>

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
