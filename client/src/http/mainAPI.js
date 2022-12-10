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
    console.log(difficlt)
    const {data} = await $host.get('api/level/explore',{params:{number: difficlt}});
    console.log(difficlt)
    return data;
}