export const getAllAppointments = () => {
    return fetch("/api/appointments").then(res => res.json());
}

export const getApointmentById = (id) => {
    return fetch(`/api/appointments/${id}`).then(res => res.json());
}

export const newAppointment = (appointmentObj) => {
    return fetch(`/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentObj),
      }).then((res) => res.json());
}