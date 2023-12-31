export const getAllStylists = () => {
    return fetch("/api/stylists").then(res => res.json());
};

export const getStylistById = (id) => {
    return fetch(`/api/stylists/${id}`).then(res => res.json());
};

export const changeActiveStatus = (id) => {
    return fetch(`/api/stylists/${id}/deactivate`,
    {
        method:"PUT",
        headers: {"Content-Type":"application-json"}
    });
};

export const getStylistAppointments = (id) => {
    return fetch(`/api/appointments/stylist/${id}`).then(res => res.json());
}

export const postNewStylist = (stylistObj) => {
    return fetch(`/api/stylists`,
    {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(stylistObj),
    }).then((res) => res.json());
}

export const editStylist = (stylistObj) => {
    return fetch(`/api/stylists`,
    { 
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(stylistObj),
    });
}
