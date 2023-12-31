import { useEffect, useState } from "react"
import { getAllCustomers } from "../../data/CustomersData";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const CustomersList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {getAndSetCustomers()}, []);

    const getAndSetCustomers = () => {
        getAllCustomers().then(data => setCustomers(data));
    }

    const navigate = useNavigate();

    return (
    <div className="container">
        <div className="header">
            <h1>Customers</h1>
            <Button
                className="header-button"
                size="md"
                onClick={(e) => navigate('add')}
                >New +
            </Button>
        </div>
        <div className="main">
            <Table>
                <thead style={{backgroundColor:"lightgray"}}>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {customers?.map((c) => {
                        return(
                        <tr key={c.id}>
                            <th scope="row">{c.id}</th>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>
                                <Button 
                                value={c.id} 
                                onClick={e => navigate(`${e.target.value}`)} 
                                size="sm" 
                                color="secondary"
                                >Details
                                </Button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        </div>
    </div>)
}