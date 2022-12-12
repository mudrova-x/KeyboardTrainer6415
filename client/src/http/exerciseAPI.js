import { requestCreator } from "../hook"

export const getAllExercises= async () => {
    const  data  = await requestCreator('/api/exercise/getAll' )
    console.log(data)
    return data;
}

export const createTask = async (name, level, text) => {
    try {
        console.log("createTask")
        console.log(name+" - "+level)
    let task = {name, level, text}
    const data = await requestCreator('/api/exercise/create', 'POST', task)
    console.log(task)
    return data;
    }
    catch (e)
    {
        console.log(e.message)
    }
}

export const updateExercise = async (name, level, text) => {
    try {
        console.log("createTask")
        console.log(name+" - "+level)
    let task = {name, level, text}
    const data = await requestCreator('/api/exercise/update', 'POST', task)
    console.log(task)
    return data;
    }
    catch (e)
    {
        console.log(e.message)
    }
}

export const deleteEx = async (exerciseName) => {
    try {
    const data = await requestCreator('/api/exercise', 'DELETE',  {name:exerciseName})
        console.log(data)
        return data;
    }
    catch (e)
    {
      console.log(e.message)
    }
}
  
export const getExercise = async (name) => {
    let url = '/api/exercise/explore/' + name
    console.log(url)
    const  data  = await requestCreator(url)
    console.log(url)
    return data;
}