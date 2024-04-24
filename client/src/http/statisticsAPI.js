import { requestCreator } from "../hook"
import {$host, $authHost} from "./index";

export const getStatisticsByUserId = async (userId) => {
   console.log("=============== "+userId)
   const data = await requestCreator('/api/statistics/getStatisticsByUserId/'+userId)
   console.log(data)
   return data;
}

export const getStatisticsByUserIdCarton = async (userId) => {

   const {data} = await $host.get('http://localhost:5000/api/statistics/getStatisticsByUserId/' + userId);
   console.log(data)
   return data
}

export const getStatisticsByExerciseId = async (exerciseId) => {
   const data = await requestCreator('/api/statistics/getStatisticsByExerciseId/'+exerciseId)
   console.log(data)
   return data;
}

export const getAllStatistics = async () => {
   const data = await requestCreator('/api/statistics/getAllStatistics')
   console.log(data)
   return data
}