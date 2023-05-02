//FOR GLOBAL DEVELOPMENT
export const backendURL = "https://ersbackend.onrender.com" 

//FOR LOCAL DEVELOPMENT
// export const backendURL = "http://localhost:8000"

// export const backendURL = "https://ers-backend.vercel.app"
//CONFIG FOR AXIOS
export const config = {
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
}