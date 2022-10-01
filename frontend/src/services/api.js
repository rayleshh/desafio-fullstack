const API = {
    baseUrl: "http://localhost:3001",
    getAll: (tableName) =>
        fetch(API.baseUrl + `/${tableName}`, getRequest()),
    post: (tableName, body) =>
        fetch(API.baseUrl + `/${tableName}`, putRequest(body)),
    deleteOne: (tableName, id) =>
        fetch(API.baseUrl + `/${tableName}/${id}`, deleteRequest())
    
    
}

const getRequest = () => ({
    method: "GET",
    headers: new Headers({
        "Content-Type": "application/json"
    })
})

const putRequest = (body) => ({
    method: "POST",
    headers: new Headers({
        "Content-Type": "application/json"
    }),
    body: JSON.stringify(body)
})

const deleteRequest = () => ({
    method: "DELETE"
})

export default API