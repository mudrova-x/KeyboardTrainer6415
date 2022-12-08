export async function requestCreator(url, method = 'GET', body = null, headers = {}){
    console.log("request")
    try {
        if (body) {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
        const response = await fetch(url, { method, body, headers })
        console.log(response)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Что-то пошло не так')
        }
        return data
    } catch (e) {
        console.log(e.message)
        throw e
    }
}