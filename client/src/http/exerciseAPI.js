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