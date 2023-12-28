import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getApointmentById } from "../../data/AppointmentsData";

export const EditAppointment = () => {
    const appointmentId = useParams().id;
    const [appointment, setAppointment] = useState({});

    useEffect(() => {
        getApointmentById(appointmentId).then((data) => setAppointment(data))
    }, [appointmentId])

    return (appointment == null ? null :
    <div className="container">
        <div className="header">
            <h1>Edit Appointment</h1>
        </div>
        <div className="main">
            <h1>Form Here</h1>
        </div>
    </div>)
}