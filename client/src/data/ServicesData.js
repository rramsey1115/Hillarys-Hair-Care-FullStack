export const getAllServices = () => {
    return fetch("/api/services").then(res => res.json());
}