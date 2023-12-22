import { UpcomingApp } from "./UpcomingApp"
import { PastApp } from "./PastApp"
import { Button } from "reactstrap"
import { getAllAppointments } from "../../data/AppointmentsData"
import { useEffect, useState } from "react"

export const AppointmentsList = () => {
    const [allAppointments, setAllAppointments] = useState([]);

    useEffect(() => { getAndSetAppointments() }, []);

    const getAndSetAppointments = () => {
        getAllAppointments().then(data => setAllAppointments(data))
    }

    return (
    <div className="container">
        <div className="header">
            <h1>Appointments</h1>
            <Button
                className="header-button"
                size="md"
                >New +
            </Button>
        </div>
        <div className="main">
            <div>
                <h3>Upcoming</h3>
                <UpcomingApp allAppointments={allAppointments}/>
            </div>
            <br/>
            <div>
            <h4>Past</h4>
                <PastApp allAppointments={allAppointments}/>
            </div>
        </div>
    </div>)
}