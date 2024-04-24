import "../../styles/Admin/StatisticsPage.scss"
import React, { useEffect, useState } from "react"
import Arrow from "../../icons/arrow.png"

import { BarChart } from "../../components/BarChart"
import { MenuItem} from "../../components/MenuItem"
import { getAllUsers } from "../../http/userAPI"
import { getAllExercises } from "../../http/exerciseAPI"
import { getAllStatistics, getStatisticsByExerciseId, getStatisticsByUserId, getStatisticsByUserIdCarton } from "../../http/statisticsAPI"

import data from "../../mock-data.json" // Мокнутые данные для теста. Не забудь удалить. Я сказал НЕЗАБУДЬ!!!
import { BarChart2 } from "../../components/BarChart2"
import { BarChart3 } from "../../components/BarChart3"
import { useNavigate } from "react-router-dom"


export const exercisesList = ["loading..."]

export const dataTemplate = []



export const StatisticAllExercisesMean = () => {

   const [list, setList] = useState([{id: 1, name:"loading..."}])
   const [statistics, setStatistics] = useState(dataTemplate);
   const history = useNavigate();
    function getMean(stats) {
      let meanTime = 0.0
      let meanErrors = 0.0
      let meanSpeed = 0.0
      let completion = 0.0
      let counter = 0
      stats.map((stat) => {
         meanTime += stat.time
         meanErrors += stat.errors
         meanSpeed += stat.speed
         completion += stat.success ? 1 : 0
         counter++
      })
      meanTime /= counter
      meanErrors /= counter
      meanSpeed /= counter
      completion /= counter
      console.log("meanTime " + meanTime);
      console.log("meanErrors " + meanErrors);
      console.log("meanSpeed " + meanSpeed);
      console.log("completion " + completion);
      return {
         meanTime: meanTime,
         meanErrors: meanErrors,
         meanSpeed: meanSpeed,
         completion: completion
      }
   }

   const getAll = async () => {
      let exercisesArr = []
      console.log("getAll")
      let exercises = await getAllExercises()
      let stats = await getAllStatistics()
      console.log("EXERCISES");
      console.log(exercises);
      console.log("STATS");
      console.log(stats);
      exercises.map((exercise) => {
         console.log(exercise.name)
         let filteredStats = stats.filter((item) => item.exerciseId === exercise.id)
         console.log(filteredStats);
         let mean = getMean(filteredStats)
         if (!isNaN(mean.meanTime))
         exercisesArr.push({
            name: exercise.name,
            level_num: exercise.level_num,
            mean: mean
         })
      })
      setStatistics(exercisesArr)
      console.log(exercisesArr);
      }

   

   useEffect(()=>{
      let func = async () => { await getAll() }
      func() 
      //setTestName(users[0])
    }, [setStatistics])


   async function debugClick() {
      console.log("CLIIIIICK!!")
      //getAll()
      history('/statisticmenu')
   }

   // Rename cool class name "user-chooser" to "user-select"???
   return (
      <div className="admin-page-statistics">
         <div className="nav-panel">
            <div className="user-chooser"> 
               <p>{"Все упражнения"}</p>
            </div>
            {/*DEBUG HERE!!!!!! 
            УБРАТЬ ПОЗЖЕ НЕ ЗАБУУУУДЬЬ, нужно сделать шаги назад!!!
            */}
            <button id="back" onClick={debugClick}>Назад</button>
         </div>
         <div className="statistics-container">
            <div className="statistics-chart-container">
               {<BarChart3 stats={statistics}/>}
            </div>
            <div className="statistics-table-container">
               <table>
                  <thead>
                     <tr>
                        <th>Название упражнения</th>
                        <th>Номер уровня сложности</th>
                        <th>Среднее время выполнения</th>
                        <th>Среднее количество ошибок</th>
                        <th>Средняя скорость набора</th>
                        <th>Процент выполнения %</th>
                     </tr>
                  </thead>
                  <tbody>
                     {statistics.map((stat) => 
                        <tr>
                           <td>{stat.name}</td>
                           <td>{stat.level_num}</td>
                           <td>{stat.mean.meanTime.toFixed(2)}</td>
                           <td>{stat.mean.meanErrors.toFixed(2)}</td>
                           <td>{stat.mean.meanSpeed.toFixed(2)}</td>
                           <td>{stat.mean.completion.toFixed(2) * 100}</td>
                        </tr>
         )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   )
}