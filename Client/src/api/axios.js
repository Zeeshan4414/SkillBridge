import axios from "axios";

const instance= axios.create({
    baseURL: "https://skill-bridge-server-8xuqp3uhj-zeeshan4414s-projects.vercel.app/",  //Nest Backend URL
})

instance.interceptors.request.use((config) =>{
    const token = localStorage.getItem("token");
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
export default instance;