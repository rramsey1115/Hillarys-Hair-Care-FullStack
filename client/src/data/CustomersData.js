export const getAllCustomers = () => {
    return fetch("/api/customers").then(res => res.json());
}

export const getCustomerById = (id) => {
    return fetch(`/api/customers/${id}`).then(res => res.json());
}