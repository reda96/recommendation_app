import axios from "axios";
const instance = axios.create({
  baseURL:"https://recommend-movie-app.onrender.com"
  //"http://localhost:5000/",
//   "https://cryptic-harbor-56450.herokuapp.com/",
});

export default instance;
