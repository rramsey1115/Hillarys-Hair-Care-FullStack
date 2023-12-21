import { UpcomingApp } from "./UpcomingApp"
import { PastApp } from "./PastApp"
import { Button } from "reactstrap"

export const AppointmentsList = () => {

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
                <h4>Upcoming</h4>
                <UpcomingApp />
            </div><br/>
            <div>
            <h4>Past</h4>
                <PastApp />
            </div>
        </div>
    </div>)
}