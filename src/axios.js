import axios from "axios";

let instance = axios.create({
    baseURL:"http://api.themoviedb.org/3",
});

export default instance;