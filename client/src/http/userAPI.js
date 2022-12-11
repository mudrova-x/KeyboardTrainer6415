import { requestCreator } from "../hook"

export const getAllUsers = async () => {
    try{
    const data = await requestCreator('/api/user/getAll')
    console.log(data)
        return data
    } catch (e)
    {
        console.log(e.message)
        alert("Не удалось загрузить список пользователей");
    }
  }

  export const createUser = async (login, password) => {
    try {
        console.log("createUser")
        console.log(login+" - "+password)
    let luser = { login: login, password: password }
    const data = await requestCreator('/api/user/registration', 'POST', luser)
     console.log(luser)
    return data;
    }
    catch (e)
    {
        console.log(e.message)
    }
}
  
//   export const create = async (login, password) => {
//     let luser = { login: login, password: password }
//     const data = await requestCreator('/api/user/registration', 'POST', luser)
//     console.log(luser)
//     return data;
// }

export const updateUser = async (login, password) => {
    console.log("updateUser")
    try {
    const data = await requestCreator('/api/user/update', 'POST', {login, password})
    console.log(data)
    return data;
    }
    catch (e)
    {
      console.log(e.message)
    }
}

export const deleteUser = async (userName) => {
    try {
    const data = await requestCreator('/api/user', 'DELETE',  {login:userName})
        console.log(data)
        return data;
    }
    catch (e)
    {
      console.log(e.message)
    }
  }