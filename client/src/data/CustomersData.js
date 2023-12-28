export const getAllCustomers = () => {
    return fetch("/api/customers").then(res => res.json());
}

export const getCustomerById = (id) => {
    return fetch(`/api/customers/${id}`).then(res => res.json());
}

export const getCustomerAppointments = (customerId) => {
    return fetch(`/api/appointments/customer/${customerId}`).then(res => res.json());
}

export const postNewCustomer = (customerObj) => {
    return fetch(`/api/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerObj),
    }).then((res) => res.json());
}