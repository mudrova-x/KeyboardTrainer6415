import {$host, $authHost} from "./index";

export const getStatisticUser = async (id) => {
    console.log(id)
    const {data} = await  $host.get('http://localhost:5000/api/statistic/getStatistic/user/' + id)
    return data
}

export const getUserById = async (id) => {
    //console.log(id)
    const {data} = await  $host.get('http://localhost:5000/api/user/exploreVIKA/' + id)
    //console.log(data)
    return data
}
