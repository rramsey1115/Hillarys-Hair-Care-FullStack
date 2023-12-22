import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getCustomerAppointments, getCustomerById } from "../../data/CustomersData";
import { Button, Table } from "reactstrap";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

export const CustomerDetails = () => {
    const {id} = useParams();
    const [customer, setCustomer] = useState({});
    const [custApps, setCustApps] = useState([]);

    useEffect(() => 
        {
        getAndSetCustomer()
        getAndSetCustApps()
        }
    , [id]);

    const getAndSetCustApps = () => {
        getCustomerAppointments(id * 1).then(data => setCustApps(data));
    }

    const getAndSetCustomer = () => {
        getCustomerById(id * 1).then(data => setCustomer(data));
    }

    const getFormattedDate = (dateString) => {
        const date = new Date(dateString); // {object Date}
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
            <h1>Customer Details</h1>
        </div>
        <div className="main">
            <h3>{customer.name}</h3>
            <Table>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <td>{customer.id}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{customer.email}</td>
                    </tr>
                </tbody>
            </Table>
            <br/>
            <h3>Appointments</h3>
            <Table>
            <thead style={{backgroundColor:"lightgray"}}>
                    <tr>
                        <th>Id</th>
                        <th>Stylist</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Services</th>
                        <th>Price</th>
                        <th>Complete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {custApps?.map(a => {
                        return (
                            <tr key={a.id}>
                                <th scope="row">{a.id}</th>
                                <td>{a.stylist.name}</td>
                                <td>{getFormattedDate(a.date)}</td>
                                <td>{getFormattedTime(a.date)}</td>
                                <td>{a.appointmentServices?.map(s => {return <div>{s.service.name}</div>} )}</td>
                                <td>${a.totalCost}</td>
                                <td>{a.isPast ? <FaCheckSquare size={20}/>:<FaRegSquare size={20}/>}</td>
                                <td>{a.isPast ? " " : <Button size="sm" value={a.id} onClick={(e) => navigate(`/appointments/edit/${e.target.value}`)}>Edit</Button>}</td>
                            </tr>
                        )
                    })}
                </tbody>
        </Table>
        </div>
    </div>)
}