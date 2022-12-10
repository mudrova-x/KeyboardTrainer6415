import {$host} from './index'

export const getExerciseByLevel = async (level_num) =>{
    const {data} = await $host.get('api/exercise/getExerciseByLevel', level_num)
    return data;
}

export const getExerciseByLeve111 = async () =>{
    const {data} = await $host.get('api/exercise/explore')
    return data;
}
export const fetchDescriptionLevel = async (difficlt) =>{
    const {data} = await $host.get('api/level/explore',{params:{number: difficlt}});
    return data;
}

export const logiunser = async (login, password) =>{
    //console.log(difficlt)
    const {data} = await $host.post('api/user/login',{login, password});
    //console.log(difficlt)
    return data;
}