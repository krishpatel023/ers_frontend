//FOR GLOBAL DEVELOPMENT
export const backendURL = "https://ersbackend.onrender.com" 

//FOR LOCAL DEVELOPMENT
// export const backendURL = "http://localhost:8000"

//CONFIG FOR AXIOS
export const config = {
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    credentials: "include"
}