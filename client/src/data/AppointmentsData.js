export const getAllAppointments = () => {
    return fetch("/api/appointments").then(res => res.json());
}

export const getApointmentById = (id) => {
    return fetch(`/api/appointments/${id}`).then(res => res.json());
}

export const newAppointment = (appointmentObj) => {
    console.log('appointmentObj', appointmentObj);
    return fetch(`/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentObj),
      }).then((res) => res.json());
}

export const updateAppointment = (updatedApp) => {
    return fetch(`/api/appointments`, { 
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(updatedApp),
    });
}

export const newAppointmentService = (aps) => {
    return fetch(`/api/appointmentservices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aps),
      }).then((res) => res.json());
}

export const deleteAppServices = (appId) => {
    return fetch(`/api/appointmentservices/${appId}`, {
        method: "DELETE"
    });
}