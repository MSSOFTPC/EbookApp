import Axios from "axios";


// http://192.168.29.30:3000/api/           // Development
// https://api.thelpr.in          // Production
const BaseApi = Axios.create({
    baseURL: "https://api.thelpr.in/api/",
    timeout:5000,
    headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
    }
});

const BaseToken = (token:string)=>{
    BaseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default BaseApi
export {BaseToken}