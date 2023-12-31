import { useState } from "react"
import { useNavigate } from "react-router-dom/dist";
import { Button, Input } from "reactstrap";
import { postNewCustomer } from "../../data/CustomersData";

export const AddCustomer = () => {
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");

const handleSubmit = async () => {
    const newCustomer = {
        "name": customerName,
        "email":customerEmail
    };
    await postNewCustomer(newCustomer);
    navigate('/customers');
}

const navigate = useNavigate();

return (
    <div className="container">
        <div className="header">
            <h1>Add Customer</h1>
        </div>
        <div className="main">
            <h3>Create A New Customer:</h3>
            <div>
                <form>
                    <fieldset>
                        <label />Name
                        <Input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)}/> 
                    </fieldset>
                    <fieldset>
                        <label />Email
                        <Input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)}/> 
                    </fieldset>
                </form>
                <div className="button-container">
                    {customerName &&
                    customerEmail
                    ? <Button
                        className="header-button"
                        size="md"
                        onClick={handleSubmit}
                        >Submit</Button> 
                    : <Button
                        disabled
                        className="header-button"
                        size="md"
                        >Submit</Button>
                    }
                </div>
            </div>
        </div>
    </div>
    )
}