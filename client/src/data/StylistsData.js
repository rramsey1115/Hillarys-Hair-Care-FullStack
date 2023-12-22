export const getAllStylists = () => {
    return fetch("/api/stylists").then(res => res.json());
};

export const getStylistById = (id) => {
    return fetch(`/api/stylists/${id}`).then(res => res.json());
};

export const changeActiveStatus = (id) => {
    return fetch(`/api/stylist/${id}/deactivate`,
    {
    method:"PUT",
    headers: {"Content-Type":"application-json"}
    });
};

export const getStylistAppointments = (id) => {
    return fetch(`/api/appointments/stylist/${id}`).then(res => res.json());
}
