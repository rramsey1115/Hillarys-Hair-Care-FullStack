import { useState } from "react"
import { useNavigate } from "react-router-dom/dist";
import { Button, Input } from "reactstrap";
import { postNewStylist } from "../../data/StylistsData";

export const AddStylist = () => {
    const [stylistName, setStylistName] = useState("");
    const [stylistEmail, setStylistEmail] = useState("");
    const [stylistImg, setStylistImg] = useState("");
    const [stylistBio, setStylistBio] = useState("");

const handleSubmit = async () => {
    const newStylist = {
        "name": stylistName,
        "email":stylistEmail,
        "imgUrl":stylistImg,
        "bio":stylistBio,
        "isActive": true
    };
    await postNewStylist(newStylist);
    navigate('/stylists');
}

const navigate = useNavigate();

return (
    <div className="container">
        <div className="header">
            <h1>Add Stylist</h1>
        </div>
        <div className="main">
            <h3>Create A New Stylist:</h3>
            <div>
                <form>
                    <fieldset>
                        <label />Name
                        <Input type="text" value={stylistName} onChange={(e) => setStylistName(e.target.value)}/> 
                    </fieldset>
                    <fieldset>
                        <label />Email
                        <Input type="email" value={stylistEmail} onChange={(e) => setStylistEmail(e.target.value)}/> 
                    </fieldset>
                    <fieldset>
                        <label />Image URL
                        <Input type="text" value={stylistImg} onChange={(e) => setStylistImg(e.target.value)}/> 
                    </fieldset>
                    <fieldset>
                        <label />Short Bio
                        <Input type="textarea" value={stylistBio} onChange={(e) => setStylistBio(e.target.value)}/> 
                    </fieldset>
                </form>
                <div className="button-container">
                    {stylistName &&
                    stylistEmail &&
                    stylistImg &&
                    stylistBio 
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