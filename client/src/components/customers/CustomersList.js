import { useEffect, useState } from "react"
import "./Customers.css"
import { getAllCustomers } from "../../data/CustomersData";
import { Button, Table } from "reactstrap";

export const CustomersList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {getAndSetCustomers()}, []);

    const getAndSetCustomers = () => {
        getAllCustomers().then(data => setCustomers(data));
    }

    return (
    <div className="container">
        <div className="header">
            <h1>Customers</h1>
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
                    {customers?.map((c) => {
                        return(<tr key={c.id}>
                            <th scope="row">{c.id}</th>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td><Button color="secondary">Details</Button></td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        </div>
    </div>)
}