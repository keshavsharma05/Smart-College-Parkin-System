import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
Mail,
Lock,
User,
Briefcase,
Hash,
AlertCircle
} from "lucide-react";
import logo from "../assets/logo.png";
import "./Register.css";

const Register = () => {

const { register } = useContext(AuthContext);
const navigate = useNavigate();

const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
userType: "STUDENT",
vehicleNumber: "",
department: ""
});

const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleChange = (e) =>
setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {

e.preventDefault();
setError("");
setLoading(true);

const res = await register(formData);

if (res.success) {
  navigate("/dashboard");
} else {
  setError(res.error);
}

setLoading(false);

};

return (

<div className="register-page">

  <div className="register-card">

    <div className="register-header">

      <div className="brand">
    <img src={logo} alt="ParkFlow Logo" className="brand-logo"/>
      </div>

      <p className="subtitle">
        Create your parking account
      </p>

    </div>

    {error && (
      <div className="form-alert">
        <AlertCircle size={18}/>
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="register-form">

      <div className="form-section">

        <h3 className="section-title">
          Account Information
        </h3>

        <div className="form-grid">

          <div className="form-group">

            <div className="input-wrapper">
              <User size={18}/>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>
          </div>

          <div className="form-group">

            <div className="input-wrapper">
              <Mail size={18}/>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@campus.edu"
                required
              />
            </div>
          </div>

        </div>

        <div className="form-group">
          <label>Password</label>

          <div className="input-wrapper">
            <Lock size={18}/>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
        </div>

      </div>


      <div className="form-section">

        <h3 className="section-title">
          User Details
        </h3>

        <div className="form-grid">

          <div className="form-group">

            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
            </select>
          </div>

          <div className="form-group">

            <div className="input-wrapper">
              <Briefcase size={18}/>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Enter Your Department"
              />
            </div>
          </div>

        </div>

      </div>


      <div className="form-section">

        <h3 className="section-title">
          Vehicle Information
        </h3>

        <div className="form-group">

          <div className="input-wrapper">
            <Hash size={18}/>
            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="ABC-1234"
            />
          </div>

        </div>

      </div>


      <button
        type="submit"
        className="register-btn"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>

    </form>

    <div className="login-link">
      Already have an account?
      <Link to="/"> Sign in</Link>
    </div>

  </div>

</div>

);
};

export default Register;
