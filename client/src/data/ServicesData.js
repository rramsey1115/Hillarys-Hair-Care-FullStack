export const getAllServices = () => {
    return fetch("/api/services").then(res => res.json());
}

export const getServiceById = (id) => {
    return fetch(`/api/serivces/${id}`).then(res => res.json());
}