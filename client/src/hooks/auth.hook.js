import {useCallback, useEffect, useState} from "react";

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [accountType, setAccountType] = useState(null)
    //console.log(localStorage)

    const login = useCallback((jwtToken, id, type) => {
        //console.log("accountType", type)
        setToken(jwtToken)
        setUserId(id)
        setAccountType(type)

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken,
            userId: id,
            accountType: type
        }))
    }, [])

    useEffect(() => {
        //console.log("check")
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token && data.accountType) {
          login(data.token, data.userId, data.accountType)
        }
        setReady(true)
    }, [login])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setAccountType(null)
        localStorage.removeItem(storageName)
    }, [])
    
    return {
        login, logout, token, userId, accountType, ready}
}