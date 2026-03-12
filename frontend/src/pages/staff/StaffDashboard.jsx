import { useState, useEffect } from "react";
import api from "../../api/axios";
import {
  QrCode,
  LogOut,
  Clock,
  AlertCircle,
  CheckCircle
} from "lucide-react";

import "./StaffDashboard.css";

const StaffDashboard = () => {

const [bookings,setBookings] = useState([]);
const [loading,setLoading] = useState(true);

const [error,setError] = useState("");
const [success,setSuccess] = useState("");

const [checkInForm,setCheckInForm] = useState({
bookingId:"",
vehicleNumber:""
});

const [checkOutForm,setCheckOutForm] = useState({
bookingId:""
});


useEffect(()=>{
fetchTodayBookings();
},[]);


const fetchTodayBookings = async ()=>{

try{

const res = await api.get("/staff/today-bookings");

setBookings(res.data);
setLoading(false);

}catch(err){

setError("Failed to fetch today's bookings");
setLoading(false);

}

};


const handleCheckIn = async (e)=>{

e.preventDefault();

setError("");
setSuccess("");

try{

await api.post("/staff/checkin",checkInForm);

setSuccess(`Vehicle ${checkInForm.vehicleNumber} checked in`);

setCheckInForm({
bookingId:"",
vehicleNumber:""
});

fetchTodayBookings();

}catch(err){

setError(err.response?.data?.message || "Check-in failed");

}

};


const handleCheckOut = async (e)=>{

e.preventDefault();

setError("");
setSuccess("");

try{

await api.post("/staff/checkout",checkOutForm);

setSuccess("Vehicle checked out");

setCheckOutForm({
bookingId:""
});

fetchTodayBookings();

}catch(err){

setError(err.response?.data?.message || "Check-out failed");

}

};


const getStatusClass = (status)=>{

if(status==="BOOKED") return "status-booked";
if(status==="ACTIVE") return "status-active";
if(status==="COMPLETED") return "status-completed";
return "status-error";

};


return(

<div className="staff-dashboard">

<header className="staff-header">

<h1 className="staff-title">

<Clock size={26}/>
Staff Control Panel

</h1>

</header>


{error && (

<div className="alert alert-error">
<AlertCircle size={18}/> {error}
</div>

)}

{success && (

<div className="alert alert-success">
<CheckCircle size={18}/> {success}
</div>

)}



{/* CONTROL CARDS */}

<div className="control-grid">

<div className="panel">

<div className="panel-header">

<QrCode size={22}/>
<h3>Vehicle Check-In</h3>

</div>

<form onSubmit={handleCheckIn}>

<div className="form-group">

<label>Booking ID</label>

<input
type="text"
className="input"
value={checkInForm.bookingId}
onChange={(e)=>setCheckInForm({...checkInForm,bookingId:e.target.value})}
placeholder="Paste booking ID"
required
/>

</div>

<div className="form-group">

<label>Vehicle Number</label>

<input
type="text"
className="input"
value={checkInForm.vehicleNumber}
onChange={(e)=>setCheckInForm({...checkInForm,vehicleNumber:e.target.value})}
placeholder="Verify vehicle number"
required
/>

</div>

<button className="btn btn-primary">
Confirm Check-In
</button>

</form>

</div>



<div className="panel">

<div className="panel-header">

<LogOut size={22}/>
<h3>Vehicle Check-Out</h3>

</div>

<form onSubmit={handleCheckOut}>

<div className="form-group">

<label>Booking ID</label>

<input
type="text"
className="input"
value={checkOutForm.bookingId}
onChange={(e)=>setCheckOutForm({bookingId:e.target.value})}
placeholder="Paste booking ID"
required
/>

</div>

<button className="btn btn-secondary">
Confirm Check-Out
</button>

</form>

</div>

</div>



{/* BOOKINGS TABLE */}

<div className="panel">

<h3 className="panel-title">Today's Bookings</h3>

{loading ? (

<p className="loading">Loading bookings...</p>

) : (

<div className="table-container">

<table className="booking-table">

<thead>

<tr>
<th>Booking ID</th>
<th>User</th>
<th>Vehicle</th>
<th>Slot</th>
<th>Status</th>
<th>Quick Action</th>
</tr>

</thead>

<tbody>

{bookings.map((b)=>(

<tr key={b._id}>

<td className="booking-id">{b._id}</td>

<td>{b.userId?.name}</td>

<td className="vehicle">{b.vehicleNumber}</td>

<td>
{b.slotId?.slotNumber} ({b.slotId?.slotType})
</td>

<td>
<span className={`status ${getStatusClass(b.status)}`}>
{b.status}
</span>
</td>

<td>

{b.status==="BOOKED" && (

<button
className="btn btn-small"
onClick={()=>setCheckInForm({
bookingId:b._id,
vehicleNumber:b.vehicleNumber
})}
>
Fill Check-In
</button>

)}

{b.status==="ACTIVE" && (

<button
className="btn btn-small"
onClick={()=>setCheckOutForm({
bookingId:b._id
})}
>
Fill Check-Out
</button>

)}

</td>

</tr>

))}

{bookings.length===0 &&(

<tr>
<td colSpan="6" className="empty">
No bookings today
</td>
</tr>

)}

</tbody>

</table>

</div>

)}

</div>

</div>

)

}

export default StaffDashboard;