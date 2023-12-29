export const getAllServices = () => {
    return fetch("/api/services").then(res => res.json());
}

export const getServiceById = (id) => {
    return fetch(`/api/services/${id}`).then(res => res.json());
}

export const addService = (service) => {
    return fetch(`/api/services`, {
        method: "POST",
        headers:{"Content-Type":"application/json",}, 
    body: JSON.stringify(service),
  }).then((res) => res.json());
}