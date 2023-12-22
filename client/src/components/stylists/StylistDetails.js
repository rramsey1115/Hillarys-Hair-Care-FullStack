import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getCustomerAppointments, getCustomerById } from "../../data/CustomersData";
import { Button, Table } from "reactstrap";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { getStylistAppointments, getStylistById } from "../../data/StylistsData";

export const StylistDetails = () => {
    const {id} = useParams();
    const [stylist, setStylist] = useState({});
    const [stylistApps, setStylistApps] = useState([]);

    useEffect(() => 
        {
        getAndSetStylist()
        getAndSetStylistApps()
        }
    , []);

    const getAndSetStylistApps = () => {
        getStylistAppointments(id * 1).then(data => setStylistApps(data));
    }

    const getAndSetStylist = () => {
        getStylistById(id * 1).then(data => setStylist(data));
    }

    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate() + 1;
        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;
        const formatted = mm + "-" + dd + "-" + yyyy;
        return formatted;
    };

    const getFormattedTime = (dateStr) => {
        const date = new Date(dateStr);
        let hh = date.getHours();
        if(hh >= 12) {return (hh - 12 + ':00 PM')}
        if (hh < 12) {return (hh + ':00 AM')}
    }

    const navigate = useNavigate();

    return( 
    <div className="container">
        <div className="header">
            <h1>Stylist Details</h1>
        </div>
        <div className="main">
            <h3>{stylist.name}</h3>
            <Table>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <td>{stylist.id}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{stylist.email}</td>
                    </tr>
                </tbody>
            </Table><br/>
            {stylist.isActive ? 
            <>
            <h3>Appointments</h3>
            <Table>
                <thead style={{backgroundColor:"lightgray"}}>
                    <tr>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Services</th>
                        <th>Price</th>
                        <th>Complete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {stylistApps.map(a => {
                        return (
                            <tr key={a.id}>
                                <th scope="row">{a.id}</th>
                                <td>{a.customer.name}</td>
                                <td>{getFormattedDate(a.date)}</td>
                                <td>{getFormattedTime(a.date)}</td>
                                <td>{a.appointmentServices?.map(s => {return <div key={s.id}>{s.service?.name}</div>} )}</td>
                                <td>${a.totalCost}</td>
                                <td>{a.isPast ? <FaCheckSquare size={20}/>:<FaRegSquare size={20}/>}</td>
                                <td>{a.isPast ? " " : <Button size="sm" value={a.id} onClick={(e) => navigate(`/appointments/edit/${e.target.value}`)}>Edit</Button>}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table></>: <h3>Inactive</h3> }
        </div>
    </div> 
   ) 
} 