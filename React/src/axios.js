import axios from 'axios';


const instance = axios.create({
    baseURL :'http://127.0.0.1:8000/api'   
});


//instance.defaults.headers.common['Access-Control-Allow-Origin']='*';
//instance.defaults.headers.common["Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"];
//instance.defaults.headers.common['Authorization']='AUTH TOKN 22';

export default instance;