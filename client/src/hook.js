import {useCallback, useState} from "react";

export async function requestCreator(url, method = 'GET', body = null, headers = {}) {
   console.log("request")
   // console.log(url)
   //console.log(JSON.stringify(body))
    try {
        if ( body) {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
        }
        const response = await fetch(url, { method, body, headers })
        //console.log(response)
        const data = await response.json()
        console.log(data)
        
        if (response.status === 400)
            return {status:400, ...data}
        
        if (!response.ok) {
            throw new Error(data.message || 'Что-то пошло не так')
        }
        return data
    } catch (e) {
        console.log(e.message)
        throw e
    }
}
// export const useHttp = () => {
// const request = useCallback(async (url,method= 'GET', body = null, headers = {}) => {
   
//     try {
//         if (body) {
//             body = JSON.stringify(body)
//             headers['Content-Type'] = "application/json"
//         }
//         const response = await fetch(url, {method, body, headers,  mode: 'no-cors'})
//         const data = await response.json()

//         if(!response.ok) {
//             throw new Error(data.message || 'Что-то пошло не так')
//         }

     

//         return data
//     } catch (e) {
//         throw e
//     }
// }, [])
// return {request}
// }

