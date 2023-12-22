export const getAllCustomers = () => {
    return fetch("/api/customers").then(res => res.json());
}

export const getCustomerById = (id) => {
    return fetch(`/api/customers/${id}`).then(res => res.json());
}

export const getCustomerAppointments = (customerId) => {
    return fetch(`/api/appointments/customer/${customerId}`).then(res => res.json());
}