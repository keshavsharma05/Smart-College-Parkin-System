import { useState } from "react";
import api from "../../api/axios";
import { UserPlus, AlertCircle, CheckCircle } from "lucide-react";
import "./createStaff.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
const CreateStaff = () => {
const navigate = useNavigate();
const queryClient = useQueryClient();

const [form, setForm] = useState({
name: "",
email: "",
password: ""
});

const [error, setError] = useState("");
const [success, setSuccess] = useState("");

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {
e.preventDefault();

setError("");
setSuccess("");

try {

await api.post("/admin/create-staff", form);

setSuccess("Staff account created successfully!");

setForm({
  name: "",
  email: "",
  password: ""
});

/* instantly update dashboard cache */
queryClient.setQueryData(["adminDashboard"], (old) => {
  if (!old) return old;

  return {
    ...old,
    totalUsers: old.totalUsers + 1
  };
});

/* background sync with server */
queryClient.invalidateQueries(["adminDashboard"]);

} catch (err) {

  setError(
    err.response?.data?.message || 
    "Failed to create staff account"
  );

}

};
return ( <div className="staff-container">

  <div className="staff-card">
  <div className="back-button" onClick={() => navigate("/admin")}>
    <ArrowLeft size={22}/>
    <span>Back</span>
  </div>
    <h2 className="staff-title">
      <UserPlus size={24}/>
      Create Staff Account
    </h2>

    {error && (
      <div className="alert error">
        <AlertCircle size={16}/>
        {error}
      </div>
    )}

    {success && (
      <div className="alert success">
        <CheckCircle size={16}/>
        {success}
      </div>
    )}

    <form onSubmit={handleSubmit} className="staff-form">

      <input
        type="text"
        name="name"
        placeholder="Staff Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Staff Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Temporary Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button type="submit" className="create-btn">
        Create Staff
      </button>

    </form>

  </div>

</div>

);
};

export default CreateStaff;
