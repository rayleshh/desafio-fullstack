const API = {
    baseUrl: "http://localhost:3001",
    getAll: (tableName) =>
        fetch(API.baseUrl + `/${tableName}`, getRequest()),
    
    
}

const getRequest = () => ({
    method: "GET",
    headers: new Headers({
        "Content-Type": "application/json"
    })
})

export default API