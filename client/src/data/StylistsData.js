export const getAllStylists = () => {
    return fetch("/api/stylists").then(res => res.json());
}

export const getStylistById = (id) => {
    return fetch(`/api/stylists/${id}`).then(res => res.json());
}