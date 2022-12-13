import { requestCreator } from "../hook"

export const getLevel = async (level_num) => {
    let url = '/api/level/explore/' + level_num
    const data = await requestCreator(url)
    //console.log(data)
    return {
        max_len: data.max_length,
    min_len: data.min_length,
    time: data.max_time,
    errors: data.max_errors,
    zones: data.zones
    };
}

export const updateLevel = async (num, level) => {
    try {
        console.log(num)
        console.log("updateLevel")
        console.log(level)
    const upd = { number:num, max_errors:level.errors, max_time:level.time, zones:level.zones,  min_length:level.min_len, max_length:level.max_len }
    const data = await requestCreator('/api/level/update', 'POST', upd)
    console.log(data)
    return data;
    }
    catch (e)
    {
        console.log(e.message)
    }
}