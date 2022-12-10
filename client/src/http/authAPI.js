import { $host } from './index'

export const loginUser = async (login, password) => {
    console.log(login + " - " + password)
    // const { data } = await $host.post('api/user/login', {
    //     login: login,
    //     password:password
    // })
    // console.log("data")
let result = {}
    let data= await $host.post('api/user/login/',
        {
        login: login,
        password:password
        }
    ).then(res => {
        console.log(res)
        console.log(JSON.parse(data))
        result = res
    }
    ).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
          });
    console.log("then")
    console.log(data)
    
      return result;
}

export const login = async (login, password) => {
   
    try{
       


    let headers ={}
    headers['Content-Type'] = "application/json"
    const response=await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            login: login,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
        //.then(res => console.log(res)).catch((e) => console.log(e))
   const data = await response.json()
   console.log(data)
   localStorage.setItem('token', data.token)
} catch (error) {
        console.error(error)
      
  }
  const {data} = await $host.post('api/user/login', { login:login, password:password })
  console.log(data)
  return (data)
}


export const createUser = async (login, password) => {
    const { data } = await $host.post('api/user/registration', { login, password })
    console.log(data)
   // localStorage.setItem('token', data.token)
    return (data)
}