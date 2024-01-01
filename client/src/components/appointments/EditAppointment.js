import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getApointmentById } from "../../data/AppointmentsData";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label } from "reactstrap";
import { getActiveStylists, getAllStylists } from "../../data/StylistsData";
import { getAllServices } from "../../data/ServicesData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const EditAppointment = () => {
    const appointmentId = useParams().id;
    const [stylistsOpen, setStylistsOpen] = useState(false);
    const [appointment, setAppointment] = useState({});
    const [allServices, setAllServices] = useState([]);
    const [allStylists, setAllStylists] = useState([]);
    const [checkedState, setCheckedState] = useState([]);
    const [updatedServices, setUpdatedServices] = useState([]);
    const [total, setTotal] = useState(25);
    const [updatedApp, setUpdatedApp] = useState({"id": 0, "customerId": 0, "stylistId": 0, "date": ""});

    useEffect(() => {
        getAndSetStylists();
        getAndSetServices();
    }, [appointmentId]);

    useEffect(() => {
        setCheckedState(new Array(allServices.length).fill(false));
    }, [allServices]);

    useEffect(() => {
        getApointmentById(appointmentId).then((data) => setAppointment(data));
    }, [appointmentId]);

    useEffect(() => {
        setUpdatedApp(
            {
            "id": parseInt(appointmentId),
            "customerId": appointment?.customerId,
            "stylistId": appointment?.stylistId,
            "date": appointment?.date
            }
        );
        // getDate(appointment?.date);
    }, [appointment])

    const getAndSetStylists = () => {
        getActiveStylists().then(data => setAllStylists(data));
    }

    const getAndSetServices = async () => {
        await getAllServices().then(data => setAllServices(data));
    }
    
    const navigate = useNavigate();

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

    console.log('appointment', appointment);

    return (appointment.id === null ? null :
    <div className="container">
        <div className="header">
            <h1>Edit {appointment.customer?.name}'s Appointment</h1>
        </div>
        <div className="main">
            <h5>Appointment Id: {appointment?.id}</h5>
            <Form>
                <FormGroup tag="fieldset">
                    <Label /><h5>Stylist</h5>
                    <Dropdown isOpen={stylistsOpen} toggle={toggleStylists} direction="down">
                        <DropdownToggle caret size="md">{appointment.stylist?.name}</DropdownToggle>
                        <DropdownMenu color="dark">
                            {allStylists.map(s => <DropdownItem
                                key={s.id}
                                value={s.id}
                                name={s.name}
                                onClick={(e) => {const copy = {...updatedApp}; copy.stylistId = e.target.value; setUpdatedApp(copy)}}
                                >{s.name}
                            </DropdownItem>)}
                        </DropdownMenu>
                    </Dropdown>  
                </FormGroup>
                <FormGroup tag="fieldset">
                    <Label /><h5>Date</h5>
                    {updatedApp.date ?
                    <DatePicker
                        showIcon
                        showTimeSelect
                        timeIntervals={60}
                        filterDate={isWeekday}
                        filterTime={filterTime}
                        selected={ new Date(updatedApp.date) }
                        onChange={(date) => {
                            const copy = {...updatedApp};
                            copy.date = new Date(date);
                            setUpdatedApp(copy)}}
                    />
                    : null }  
                </FormGroup>
            </Form>
        </div>
    </div>)
}