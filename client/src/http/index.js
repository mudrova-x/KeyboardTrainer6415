import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json'


const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


export {
    $host,
    $authHost
}