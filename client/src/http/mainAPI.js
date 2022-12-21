import { requestCreator } from "../hook"
import {$host, $authHost} from "./index";

export const getExerciseByLevel = async (level_num) => {
    let url = '/api/exercise/getExerciseByLevel/' + level_num
    console.log(url)
    const  data  = await requestCreator(url)
    console.log(url)
    return data;
}
export const fetchDescriptionLevel = async (level_num) => {
    let url = '/api/level/explore/' + level_num
    const data = await requestCreator(url)
    //console.log(data)
    return data;
}
export const logiunser = async (login, password) => {
    let luser = { login: login, password: password }
    const data = await requestCreator('/api/user/login', 'POST', luser)
    console.log(luser)
    return data;
}
export const test = async () => {
    let users
    let response = await fetch('/api/user/getAll')
    if (response.ok) {
// если HTTP-статус в диапазоне 200-299
// получаем тело ответа
    users = await response.json();

    console.log(users)
    }
    return users;
}


export const fetchOneExercise = async (id) => {
    const {data} = await $host.get('http://localhost:5000/api/exercise/getOneExercise/' + id);
    //console.log(data)
    return data
}

export const fetchDescriptionLevelVIKA = async (level_num) => {

    const {data} = await $host.get('http://localhost:5000/api/level/exploreVIKA/' + level_num);
    //console.log(data)
    return data
}

export const postResult = async (statistic) => {
    const {data} = await  $host.post('http://localhost:5000/api/user/postStatistic', statistic)
    return data
}


