export const getAllAppointments = () => {
    return fetch("/api/appointments").then(res => res.json());
}

export const getApointmentById = (id) => {
    return fetch(`/api/appointments/${id}`).then(res => res.json());
}