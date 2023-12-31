import { useNavigate, useParams } from "react-router-dom"
import { editStylist, getStylistById } from "../../data/StylistsData";
import { useEffect, useState } from "react";
import { Button, Form, Input } from "reactstrap";

export const EditStylist = () => {
    const id = useParams().id;
    const [stylist, setStylist] = useState();
    const [updatedStylist, setUpdatedStylist] = useState({});

    useEffect(() => { getStylistById(id).then(data => setStylist(data)); }, [id]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // await editStylist(updatedStylist);
        navigate( `/stylists/${id}`);
    }

    return(
    <div className="container">
        <div className="header">
            <h1>Edit Stylist</h1>
        </div>
        <div className="main">
            <Form>
                <fieldset>Name
                    <Input 
                        type="text"
                        value={stylist?.name}/>
                </fieldset>
                <fieldset>Email
                    <Input 
                        type="email"
                        value={stylist?.email}/>
                </fieldset>
                <fieldset>ImgUrl
                    <Input 
                        type="text"
                        value={stylist?.imgUrl}/>
                </fieldset>
                <fieldset>Bio
                    <Input 
                        type="textarea"
                        value={stylist?.bio}/>
                </fieldset>
            </Form>
            <div className="button-container">
                <Button className="header-button" onClick={(e) => {handleSubmit(e)}}>Submit</Button>
            </div>
        </div>
    </div>)
}