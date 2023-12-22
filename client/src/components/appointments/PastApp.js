import { Table } from "reactstrap"


export const PastApp = ({getAndSetAppointments}) => {
    return (
        <Table>
            <thead>
                    <tr>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Stylist</th>
                        <th>Date</th>
                        <th>Services</th>
                        <th>Price</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
        </Table>
    )
}