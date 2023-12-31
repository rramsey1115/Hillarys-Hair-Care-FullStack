import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Button, Table } from "reactstrap";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { getStylistAppointments, getStylistById } from "../../data/StylistsData";
import "./Stylist.css";

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
            <div className="main-top">
                <div className="top-left">
                    <h3>{stylist.name}</h3>
                    <img className="profile-img" src={stylist.imgUrl} alt="stylist headshot"/>
                </div>
                <div className="top-right">
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
                            <tr>
                                <th>About</th>
                                <td>{stylist.bio}</td>
                            </tr>
                            <tr>
                                <th>Active</th>
                                <td>{stylist.isActive ? "Yes" : "No"}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button className="header-button" value={stylist.id} onClick={(e) => navigate(`/stylists/edit/${e.target.value}`)}>Edit Stylist</Button>
                </div>
            </div>
            <div className="main-bottom">
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
    </div> 
   ) 
} 