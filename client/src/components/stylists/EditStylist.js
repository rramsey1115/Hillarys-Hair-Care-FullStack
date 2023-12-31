import { useNavigate, useParams } from "react-router-dom"
import { editStylist, getStylistById } from "../../data/StylistsData";
import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export const EditStylist = () => {
    const id = useParams().id;
    const [stylist, setStylist] = useState({});
    const [updatedStylist, setUpdatedStylist] = useState({});

    useEffect(() => { 
        getStylistById(id).then(data => setStylist(data));
     }, [id]);

     useEffect(() => {
        setUpdatedStylist({
            "id": stylist?.id,
            "name": stylist?.name,
            "email": stylist?.email,
            "bio": stylist?.bio,
            "imgUrl": stylist?.imgUrl,
            "isActive": stylist?.isActive
        });
     }, [stylist]);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        console.log('updatedStylist', updatedStylist);
        await editStylist(updatedStylist);
        navigate( `/stylists/${id}`);
    }

    return(
    <div className="container">
        <div className="header">
            <h1>Edit Stylist</h1>
        </div>
        <div className="main">
            <Form>
                <fieldset><h5>Name</h5>
                    <Input 
                        type="text"
                        value={updatedStylist?.name}
                        onChange={(e) => {
                            const copy = {...updatedStylist};
                            copy.name = e.target.value;
                            setUpdatedStylist(copy);
                        }}/>
                </fieldset>
                <fieldset><h5>Email</h5>
                    <Input 
                        type="email"
                        value={updatedStylist?.email}
                        onChange={(e) => {
                            const copy = {...updatedStylist};
                            copy.email = e.target.value;
                            setUpdatedStylist(copy);
                        }}/>
                </fieldset>
                <fieldset><h5>Image URL</h5>
                    <Input 
                        type="url"
                        value={updatedStylist?.imgUrl}
                        onChange={(e) => {
                            const copy = {...updatedStylist};
                            copy.imgUrl = e.target.value;
                            setUpdatedStylist(copy);
                        }}/>
                </fieldset>
                <fieldset><h5>Bio</h5>
                    <Input 
                        type="textarea"
                        value={updatedStylist?.bio}
                        onChange={(e) => {
                            const copy = {...updatedStylist};
                            copy.bio = e.target.value;
                            setUpdatedStylist(copy);
                        }}/>
                </fieldset>
                <fieldset><h5>Currently</h5>
                    <FormGroup check>
                        <Input 
                                name="active" 
                                type="radio"
                                checked={updatedStylist?.isActive === true}
                                onChange={(e) => {
                                    const copy = {...updatedStylist};
                                    copy.isActive = !updatedStylist.isActive;
                                    setUpdatedStylist(copy);
                                }}/>
                        <Label check>
                            Active
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Input 
                                name="active" 
                                type="radio"
                                checked={updatedStylist?.isActive === false}
                                onChange={(e) => {
                                    const copy = {...updatedStylist};
                                    copy.isActive = !updatedStylist.isActive;
                                    setUpdatedStylist(copy);
                                }}/>
                        <Label check>
                            Inactive
                        </Label>
                    </FormGroup>
                </fieldset>
            </Form>
            <div className="button-container">
                <Button className="header-button" onClick={(e) => handleSubmit()}>Save</Button>
            </div>
        </div>
    </div>)
}