import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getApointmentById } from "../../data/AppointmentsData";
import { Dropdown, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label } from "reactstrap";
import { getAllCustomers } from "../../data/CustomersData";
import { getAllStylists } from "../../data/StylistsData";
import { getAllServices } from "../../data/ServicesData";

export const EditAppointment = () => {
    const appointmentId = useParams().id;
    const [customersOpen, setCustomersOpen] = useState(false);
    const [stylistsOpen, setStylistsOpen] = useState(false);
    const [appointment, setAppointment] = useState({});
    const [allServices, setAllServices] = useState([]);
    const [allCustomers, setAllCustomers] = useState([]);
    const [allStylists, setAllStylists] = useState([]);
    const [checkedState, setCheckedState] = useState([]);
    const [updatedServices, setUpdatedServices] = useState([]);
    const [total, setTotal] = useState(25);
    const [updatedApp, setUpdatedApp] = useState({"id": 0, "customerId": 0, "stylistId": 0, "date": ""});

    useEffect(() => {
        getAndSetCustomers();
        getAndSetStylists();
        getAndSetServices();
    }, [appointmentId]);

    useEffect(() => {
        setCheckedState(new Array(allServices.length).fill(false));
    }, [allServices]);

    useEffect(() => {
        getApointmentById(appointmentId).then((data) => setAppointment(data))
    }, [appointmentId]);

    useEffect(() => {
        setUpdatedApp(
            {
            "id": appointmentId,
            "customerId": appointment?.customerId,
            "stylistId": appointment?.stylistId,
            "date": appointment?.date
            }
        )
    }, [appointmentId])

    const getAndSetCustomers = () => {
        getAllCustomers().then(data => setAllCustomers(data));
    }

    const getAndSetStylists = () => {
        getAllStylists().then(data => setAllStylists(data));
    }

    const getAndSetServices = async () => {
        await getAllServices().then(data => setAllServices(data));
    }
    
    const navigate = useNavigate();

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
            if (currentState === true) 
            {
              return sum + allServices[index].price;
            }
            return sum;
          },
          0
        );
        setTotal(totalPrice + 25);
    };

    return (appointment == null ? null :
    <div className="container">
        <div className="header">
            <h1>Edit Appointment</h1>
        </div>
        <div className="main">
            <h3>{appointment.customer?.name}'s Appointment</h3>
            <Form>
                <FormGroup tag="fieldset">
                    <Label /><h5>Stylist</h5>
                        
                </FormGroup>
            </Form>
        </div>
    </div>)
}