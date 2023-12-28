import { useEffect, useState } from "react"
import { Button, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap"
import { getAllCustomers } from "../../data/CustomersData";
import { getAllStylists } from "../../data/StylistsData";

export const AddAppointment = () => {
    const [customersOpen, setCustomersOpen] = useState(false);
    const [stylistsOpen, setStylistsOpen] = useState(false);
    const [appDate, setAppDate] = useState("");
    const [customerId, setCustomerId] = useState(0);
    const [customerName, setCustomerName] = useState("Customers");
    const [stylistId, setStylistId] = useState(0);
    const [stylistName, setStylistName] = useState("Stylists");
    const [services, setServices] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [stylists, setStylists] = useState([]);

    useEffect(() => {
        getAndSetCustomers();
        getAndSetStylists();
    }, [])

    const getAndSetCustomers = () => {
        getAllCustomers().then(data => setCustomers(data));
    }

    const getAndSetStylists = () => {
        getAllStylists().then(data => setStylists(data));
    }

    const toggleCustomers = () => setCustomersOpen((prevState) => !prevState);
    const toggleStylists = () => setStylistsOpen((prevState => ! prevState))

    return (
    <div className="container">
        <div className="header">
            <h1>Add Appointment</h1>
        </div>
        <div className="main">
            <h3>Create A New Appointment</h3>
            <form>
                <fieldset>
                    <label /><h5>Select Customer</h5>
                        <Dropdown isOpen={customersOpen} toggle={toggleCustomers} direction="down">
                            <DropdownToggle caret size="md">{customerName}</DropdownToggle>
                            <DropdownMenu color="dark">
                                {customers.map(c => <DropdownItem 
                                    key={c.id} 
                                    value={c.id}
                                    name={c.name}
                                    onClick={(e) => {setCustomerId(e.target.value * 1);setCustomerName(e.target.name)}}
                                    >{c.name}
                                </DropdownItem>)}
                            </DropdownMenu>
                        </Dropdown>
                </fieldset>
                <fieldset>
                    <label /><h5>Select Stylist</h5>
                    <Dropdown isOpen={stylistsOpen} toggle={toggleStylists} direction="down">
                        <DropdownToggle caret size="md">{stylistName}</DropdownToggle>
                        <DropdownMenu color="dark">
                            {stylists.map(s => <DropdownItem 
                                key={s.id} 
                                value={s.id}
                                name={s.name}
                                onClick={(e) => {setStylistId(e.target.value * 1);setStylistName(e.target.name)}}
                                >{s.name}
                            </DropdownItem>)}
                        </DropdownMenu>
                    </Dropdown>                       
                </fieldset>
            </form>
            <div className="button-container" style={{marginTop:30}}>
                {customerId &&
                stylistId &&
                services 
                ? <Button
                    className="header-button"
                    size="md"
                    >Submit</Button> 
                : <Button
                    disabled
                    className="header-button"
                    size="md"
                    >Submit</Button>
                }
            </div>
        </div>
    </div>)
}