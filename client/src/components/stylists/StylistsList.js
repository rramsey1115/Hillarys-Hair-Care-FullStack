import { Table } from "reactstrap"

export const StylistList = () => {
    return (
    <div className="container">
        <div className="header">
            <h1>Stylists</h1>
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
            </Table>
        </div>
    </div>)
}