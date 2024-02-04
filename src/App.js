import { BiCalendar } from "react-icons/bi";
import { Search } from "./components/Search";
import { AddAppointment } from "./components/AddAppointment";
import { AppointmentInfo } from "./components/AppointmentInfo";
import { useEffect, useState } from "react";

function App() {
  const [appointmentList,setAppointmentList]=useState([]);
  useEffect(()=>{
    fetch('./data.json')
    .then(res=>res.json())
    .then(setAppointmentList)
  },[])
  const [query,setQuery]=useState("");
  const [sortBy,setSortBy]=useState("petName");
  const [orderBy,setOrderBy]=useState("asc");
  const filteredAppointmentList = appointmentList.filter(
    item=>{return(
      item.petName.toLowerCase().includes(query.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query.toLowerCase())||
      item.aptNotes.toLowerCase().includes(query.toLowerCase())
    )}
  ).sort((a,b)=>{
    let order = (orderBy==="asc" ? 1: -1);
    return (a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? order*-1 : order*1)
  })


  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-600 align-top" />Your Appointments</h1>
        <AddAppointment onSendAppointmentInfo={(formData)=>setAppointmentList([formData,...appointmentList])}
        lastId={appointmentList.reduce((max,item)=>
          Number(item.id) > max ? Number(item.id) : max,0
        )}/>
        <Search sortBy={sortBy} orderBy={orderBy} onchangeSort={(s)=>setSortBy(s)} onchangeOrder={(o)=>setOrderBy(o)} onchangeQuery={(q)=>setQuery(q)}/>
        <ul>{
          filteredAppointmentList.map(appointment=>
            <AppointmentInfo
             appointment={appointment}
             onDeleteAppointment={(id)=>{
                setAppointmentList(appointmentList.filter(appointment=> appointment.id !== id))
             }}/>
            )
        }
        </ul>
            
    </div>
  );
}

export default App;
