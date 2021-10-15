import axios from "axios";


//[POST] register user
export const registerUser=({user})=> axios.post('http://192.168.1.11:3000/users', user);