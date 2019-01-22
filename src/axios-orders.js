import axios from 'axios';


const instance = axios.create({
    baseURL:'https://react-myburger-7971f.firebaseio.com/'
});

export default instance;