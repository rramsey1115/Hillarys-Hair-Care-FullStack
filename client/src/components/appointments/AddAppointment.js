import { useEffect, useState } from "react"
import { Button, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Input } from "reactstrap"
import { getAllCustomers } from "../../data/CustomersData";
import { getAllStylists } from "../../data/StylistsData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllServices, getServiceById } from "../../data/ServicesData";

export const AddAppointment = () => {
    const [customersOpen, setCustomersOpen] = useState(false);
    const [stylistsOpen, setStylistsOpen] = useState(false);
    const [appDate, setAppDate] = useState("");
    const [customerId, setCustomerId] = useState(0);
    const [customerName, setCustomerName] = useState("Customers");
    const [stylistId, setStylistId] = useState(0);
    const [stylistName, setStylistName] = useState("Stylists");
    const [allServices, setAllServices] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [stylists, setStylists] = useState([]);
    const [checkedState, setCheckedState] = useState([]);
    const [total, setTotal] = useState(25);

    useEffect(() => {
        getAndSetCustomers();
        getAndSetStylists();
        getAndSetServices();
    }, [])

    useEffect(() => {
        setCheckedState(new Array(allServices.length).fill(false));
    }, [allServices])

    const getAndSetCustomers = () => {
        getAllCustomers().then(data => setCustomers(data));
    }

    const getAndSetStylists = () => {
        getAllStylists().then(data => setStylists(data));
    }

    const getAndSetServices = async () => {
        await getAllServices().then(data => setAllServices(data));
    }

    const toggleCustomers = () => setCustomersOpen((prevState) => !prevState);

    const toggleStylists = () => setStylistsOpen((prevState => ! prevState));

    const isWeekday = (date) => {
        const date1 = new Date(date);
        var day = date1.getDay();
        return day !== 0 && day !== 6;
    };

    const filterTime = (time) => {
        const startTime = 9;
        const endTime = 17;
        const selectedDate = new Date(time);
        return selectedDate.getHours() <= endTime && selectedDate.getHours() >= startTime;
    }

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
    
        setCheckedState(updatedCheckedState);
    
        const totalPrice = updatedCheckedState.reduce(
          (sum, currentState, index) => {
            if (currentState === true) {
              return sum + allServices[index].price;
            }
            return sum;
          },
          0
        );
        setTotal(totalPrice + 25);
    };

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
                <fieldset>
                    <h5>Select Date and Time</h5>
                    <DatePicker 
                        showIcon
                        showTimeSelect
                        timeIntervals={60}
                        filterDate={isWeekday}
                        filterTime={filterTime}
                        selected={new Date()}
                        onChange={date => setAppDate(date)}
                        />
                </fieldset>
                <fieldset>
                    <h5>Select Services</h5>
                    {allServices.map((service, index) => <div key={service.id}>
                        <Input type="checkbox"
                            id={`custom-checkbox-${index}`}
                            name={service.name}
                            value={service.id}
                            onChange={() => handleOnChange(index)}
                            /> {service.name} - ${service.price}
                    </div>)}
                </fieldset>
            </form>
            <div className="price-container">
                <h5>Total Price: ${total}.00</h5>
            </div>
            <div className="button-container" style={{marginTop:30}}>
                {customerId &&
                stylistId &&
                appDate
                
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