import { Table } from "reactstrap"

export const AppointmentsList = () => {
    return (
    <div className="container">
        <div className="header">
            <h1>Appointments</h1>
        </div>
        <div className="main">
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Details</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </Table>
        </div>
    </div>)
}