import { useState, useEffect, useContext } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import {
  Trash2,
  AlertCircle,
  CheckCircle,
  Car,
  MapPin
} from "lucide-react";

import "./UserDashboard.css";

const UserDashboard = () => {

const { user } = useContext(AuthContext);

const [bookings,setBookings] = useState([]);
const [slots,setSlots] = useState([]);
const [loading,setLoading] = useState(true);

const [selectedSlot,setSelectedSlot] = useState(null);

const [error,setError] = useState("");
const [success,setSuccess] = useState("");

useEffect(()=>{
  fetchSlots();
  fetchMyBookings();
},[]);


const fetchSlots = async () =>{
  try{
    const res = await api.get("/slots/available");
    setSlots(res.data);
  }catch(err){
    console.error("Failed to fetch slots");
  }
}

const fetchMyBookings = async ()=>{
  try{
    const res = await api.get("/bookings/my-bookings");
    setBookings(res.data);
    setLoading(false);
  }catch(err){
    setError("Failed to load bookings");
    setLoading(false);
  }
}


const handleBook = async (slotId)=>{

  setError("");
  setSuccess("");

  try{

    await api.post("/bookings/create",{slotId});

    setSuccess("Slot booked successfully");

    setSelectedSlot(null);

    fetchSlots();
    fetchMyBookings();

  }catch(err){
    setError(err.response?.data?.message || "Booking failed");
  }

}


const handleCancel = async (id)=>{

  if(!window.confirm("Cancel this booking?")) return;

  setError("");
  setSuccess("");

  try{

    await api.post(`/bookings/cancel/${id}`);

    setSuccess("Booking cancelled");

    fetchSlots();
    fetchMyBookings();

  }catch(err){
    setError(err.response?.data?.message || "Failed to cancel booking");
  }

}



return(

<div className="dashboard">

<div className="dashboard-container">


{/* HEADER */}

<header className="dashboard-header">

<h1 className="dashboard-title">

<Car size={28}/>
My Parking

</h1>

</header>



{/* ALERTS */}

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



{/* SLOT PANEL */}

<section className="panel">

<h2 className="panel-title">Book Your Slot</h2>

<div className="slot-strip">

{slots.map((slot)=>{

const isSelected = selectedSlot?._id === slot._id;

return(

<div
key={slot._id}
className={`slot-card ${isSelected ? "selected" : ""}`}
onClick={()=>{

if(slot.status==="AVAILABLE"){
setSelectedSlot(slot)
}

}}
>

<Car size={20}/>

<span className="slot-number">
Slot {slot.slotNumber}
</span>

<span className="slot-location">
<MapPin size={12}/> {slot.location}
</span>

<span
className={`slot-status ${isSelected ? "confirm" : ""}`}
onClick={(e)=>{
if(isSelected){
e.stopPropagation();
handleBook(slot._id);
}
}}
>
{isSelected && slot.status==="AVAILABLE" ? "Confirm" : slot.status}
</span>

</div>

)

})}

</div>

</section>




{/* BOOKING HISTORY */}

<section className="panel">

<h2 className="panel-title">Booking History</h2>

<div className="history-list">

{loading ? (

<p className="loading">Loading...</p>

) : bookings.length === 0 ? (

<p className="empty">
No bookings yet
</p>

) : (

bookings.map((b)=>(

<div key={b._id} className="history-card">

<div className="history-info">

<div className="history-slot">
Slot {b.slotId?.slotNumber}
</div>

<div className="history-location">
{b.slotId?.location}
</div>

<div className="history-time">
{new Date(b.bookingTime).toLocaleDateString()} at{" "}
{new Date(b.bookingTime).toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
})}
</div>

</div>


<div className="history-actions">

<span className="status">
{b.status}
</span>

{b.status==="BOOKED" && (

<button
className="cancel-btn"
onClick={()=>handleCancel(b._id)}
>

<Trash2 size={14}/>
Cancel

</button>

)}

</div>

</div>

))

)}

</div>

</section>

</div>

</div>

)

}

export default UserDashboard