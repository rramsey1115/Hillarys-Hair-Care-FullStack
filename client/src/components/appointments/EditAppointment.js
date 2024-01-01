import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { deleteAppServices, deleteAppointment, getApointmentById, newAppointmentService, updateAppointment } from "../../data/AppointmentsData";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, Label } from "reactstrap";
import { getActiveStylists } from "../../data/StylistsData";
import { getAllServices, getServiceById } from "../../data/ServicesData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const EditAppointment = () => {
    const appointmentId = useParams().id;
    const navigate = useNavigate();
    const [appServices, setAppServices] = useState([]);
    const [stylistsOpen, setStylistsOpen] = useState(false);
    const [appointment, setAppointment] = useState({});
    const [allServices, setAllServices] = useState([]);
    const [allStylists, setAllStylists] = useState([]);
    const [checkedState, setCheckedState] = useState([]);
    const [total, setTotal] = useState(25);
    const [updatedApp, setUpdatedApp] = useState({"id": 0, "customerId": 0, "stylistId": 0, "date": ""});
    
    // sets services and available stylists
    useEffect(() => {
        getAndSetStylists();
        getAndSetServices();
    }, [appointmentId]);

    // sets which checkboxes should be checked
    useEffect(() => {
        setCheckedState(new Array(allServices.length).fill(false));
    }, [allServices]);

    // sets appointment object by id
    useEffect(() => {
        getApointmentById(appointmentId).then((data) => setAppointment(data));
    }, [appointmentId]);

    useEffect(() => {
        const arr = [];
        appointment.appointmentServices?.map(aserv => arr.push(aserv));
        setAppServices(arr)
    }, [appointment])

    useEffect(() => {
        // sets initial value of object we will edit on form
        setUpdatedApp(
            {
            "id": parseInt(appointmentId),
            "stylistId": appointment?.stylistId,
            "date": appointment?.date
            }
        );
        getCheckedValues();
    }, [appointment]);

    const getCheckedValues = () => { 
        if (appServices.length > 0)
        {
            let arr = [...checkedState];
            for (let appS of appServices)
                {
                    arr[appS.serviceId - 1] = true;
                }
        setCheckedState(arr);
        getAndSetTotal(arr);
        }
    }

    // available stylists for dropdown
    const getAndSetStylists = () => {
        getActiveStylists().then(data => setAllStylists(data));
    }

    // services for checkboxes
    const getAndSetServices = async () => {
        await getAllServices().then(data => setAllServices(data));
    }

    const getAndSetTotal = (arr) => {
        const totalPrice = arr.reduce(
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
    }

    // controls stylists dropdown
    const toggleStylists = () => setStylistsOpen((prevState => ! prevState));

    // allows only weekdays on datepicker
    const isWeekday = (date) => {
        const date1 = new Date(date);
        var day = date1.getDay();
        return day !== 0 && day !== 6;
    };
    // allows only business hours on datepicker
    const filterTime = (time) => {
        const startTime = 9;
        const endTime = 17;
        const selectedDate = new Date(time);
        return selectedDate.getHours() <= endTime && selectedDate.getHours() >= startTime;
    }

    // checkbox changes
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
          );

        setCheckedState(updatedCheckedState);
    
        getAndSetTotal(updatedCheckedState);
    };

    const handleSubmitForm = async () => {
        // delete previous services for this appointment
        await deleteAppServices(appointment.id * 1);

        // find new services based on checkedState booleans
        let matchArr = [];
        for (let i = 0; i < checkedState.length; i++) {
            if (checkedState[i] === true) {
                let int = checkedState.indexOf(true, i);
                // Check if the index is found and call the getServiceById method
                if (int !== -1) {
                    await getServiceById(int + 1).then(res => matchArr.push(res));
                }
            }
        }

        // add new services to database
        matchArr.map(matchService => 
        {
            let appointmentService = 
            {
                'appointmentId': appointment.id,
                'serviceId': matchService.id
            }
            newAppointmentService(appointmentService);
        });

        // updated appointment details based on updatedApp object
        await updateAppointment(updatedApp);

        // navigate back to see all appointments view
        navigate('/appointments');
    }

    return (appointment.id === null ? null :
    <div className="container">
        <div className="header">
            <h1>Edit {appointment.customer?.name}'s Appointment</h1>
        </div>
        <div className="main">
            <h5>Appointment Id: {appointment?.id}</h5>
            <Form>
                <fieldset>
                    <Label /><h5>Stylist</h5>
                    <Dropdown isOpen={stylistsOpen} toggle={toggleStylists} direction="down">
                        <DropdownToggle caret size="md">{appointment.stylist?.name}</DropdownToggle>
                        <DropdownMenu color="dark">
                            {allStylists.map(s => <DropdownItem
                                key={s.id}
                                value={s.id}
                                name={s.name}
                                onClick={(e) => {const copy = {...updatedApp}; copy.stylistId = e.target.value * 1; setUpdatedApp(copy)}}
                                >{s.name}
                            </DropdownItem>)}
                        </DropdownMenu>
                    </Dropdown>  
                </fieldset>
                <fieldset>
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
                </fieldset>
                <fieldset>
                    <label /><h5>Select Services</h5>
                    {checkedState.includes(true) ? allServices.map((service, index) => {
                    return (
                    <div key={service.id}>
                        <Input type="checkbox"
                            id={`custom-checkbox-${index}`}
                            defaultChecked={checkedState[index] ? true : false}
                            name={service.name}
                            value={service.id}
                            onChange={(e) => handleOnChange(index, e.target.value)}
                            />  {service.name} - ${service.price}
                    </div>)}) : null }
                    <div className="price-container" style={{marginTop:8}}>
                        <h5>Total Price: ${total}.00</h5>
                    </div>
                </fieldset>
            </Form>
            <div className="button-container">
                {
                total > 25
                ? <Button
                    className="header-button"
                    size="md"
                    onClick={(e) => handleSubmitForm()}
                    >Save</Button>
                : <Button
                    disabled
                    className="header-button"
                    size="md"
                    >Save</Button>
                }
                <Button 
                    className="cancel-button"
                    size="md"
                    color="danger"
                    value={appointmentId * 1}
                    onClick={(e) => deleteAppointment(e.target.value).then(navigate('/appointments'))}
                    >Cancel Appointment
                </Button>
            </div>
        </div>
    </div>)
}