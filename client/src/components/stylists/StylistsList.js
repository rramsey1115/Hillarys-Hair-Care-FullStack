import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap"
import { changeActiveStatus, getAllStylists } from "../../data/StylistsData";
import { useNavigate } from "react-router-dom";

export const StylistList = () => {
    const [stylists, setStylists] = useState([]);

    useEffect(() => {getAndSetStylists()}, []);

    const getAndSetStylists = () => {
        getAllStylists().then(data => setStylists(data));
    }

    const navigate = useNavigate();

    const handleActivate = async (id) => {
        await changeActiveStatus(id);
        getAndSetStylists();
    }

    return (
    <div className="container">
        <div className="header">
            <h1>Stylists</h1>
            <Button
                className="header-button"
                size="md"
                >New +
            </Button>
        </div>
        <div className="main">
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Active</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {stylists.map((s) => {
                        return(
                        <tr key={s.id}>
                            <th scope="row">{s.id}</th>
                            <td>{s.name}</td>
                            <td>{s.email}</td>
                            <td>{s.isActive 
                                ? <Button 
                                    size="sm" 
                                    color="danger"
                                    value={s.id}
                                    onClick={(e) => handleActivate(e.target.value * 1)}
                                    >Deactivate
                                    </Button>
                                : <Button 
                                size="sm" 
                                color="secondary"
                                value={s.id}
                                onClick={(e) => handleActivate(e.target.value * 1)}
                                >Activate
                                </Button>}
                            </td>
                            <td>
                                <Button 
                                value={s.id} 
                                onClick={(e) => navigate(`${e.target.value * 1}`)} 
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