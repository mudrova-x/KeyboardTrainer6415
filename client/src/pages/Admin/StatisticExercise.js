import "../../styles/Admin/StatisticsPage.scss"
import React, { useEffect, useState } from "react"
import Arrow from "../../icons/arrow.png"

import { BarChart } from "../../components/BarChart"
import { MenuItem} from "../../components/MenuItem"
import { getAllUsers } from "../../http/userAPI"
import { getAllExercises } from "../../http/exerciseAPI"
import { getStatisticsByExerciseId, getStatisticsByUserId, getStatisticsByUserIdCarton } from "../../http/statisticsAPI"

import data from "../../mock-data.json" // Мокнутые данные для теста. Не забудь удалить. Я сказал НЕЗАБУДЬ!!!
import { BarChart2 } from "../../components/BarChart2"
import { useNavigate } from "react-router-dom"


export const exercisesList = ["loading..."]

export const dataTemplate = []



export const StatisticExercise = () => {

   const [list, setList] = useState([{id: 1, name:"loading..."}])
   const [currentExercise, setCurrent] = useState({id: 1, name:"loading..."})
   const [statistics, setStatistics] = useState(dataTemplate);

   const [searchExercise, setSearchExercise] = useState({name: ""})

   const changeSearchExerciseHandler = (event) => {
      console.log("exerciseName = " + searchExercise.name)
      setSearchExercise({ ...searchExercise, [event.target.name]: event.target.value })
    }

   const history = useNavigate();
   
   const getAll = async () => {
      let exerciseArr = []
      console.log("getAll")
      getAllExercises().then(data => {
         console.log(data)
         for (var e in data) {
            exerciseArr.push({
               id: data[e].id,
               name: data[e].name
            })
        }
        console.log("DEBUG LIST")
        console.log(exerciseArr);
        setList(exerciseArr)
        setCurrent(exerciseArr[0])
        formStat()
      })
    }

   useEffect(()=>{
      let func = async () => { await getAll() }
      func() 
      //setTestName(users[0])
    }, [setList])


   async function handleClick(name) {
      console.log(name)
      let newName = list.find(obj => obj.name === name)
      console.log("newName: " + newName);
      console.log(newName);
      setCurrent(newName)
      formStat()
   }

   async function formStat() {
      let statsArr = []
      let stats = await getStatisticsByExerciseId(currentExercise.id)
      let users = await getAllUsers()
      let filteredUsers = users.filter((item) => item.login !== "admin")

      console.log("STATS GO HERE!!!!");
      console.log(stats);
      console.log(filteredUsers);
      /*
      filteredUsers.map((user) => {
         let stat = stats.find(obj => (obj.userId === user.id) && (obj.exerciseId === currentExercise.id))
         statsArr.push({
            login: user.login,
            time: stat.time,
            errors: stat.errors,
            typeSpeed: stat.speed,
            status: stat.success,
            date: stat.date
         })
      })*/
      
      stats.map((stat) => {
         let user = filteredUsers.find(obj => obj.id === stat.userId)
         console.log(user);
         if(user === undefined)
            user = {login: "Удалённый пользователь"}
         statsArr.push({
            login: user.login,
            time: stat.time,
            errors: stat.errors,
            typeSpeed: stat.speed.toFixed(2),
            status: stat.success,
            date: stat.date
         })
      })

      setStatistics(statsArr)
      console.log(statsArr);
   }

   function statusString(status){
      if(status)
         return "Пройдено"
      else
         return "Не пройдено"
   }

   async function debugClick() {
      console.log("CLIIIIICK!!")
      //formStat()
      history('/statisticmenu')
   }
   
   // Rename cool class name "user-chooser" to "user-select"???
   return (
      <div className="admin-page-statistics">
         <div className="nav-panel">
            <div className="user-chooser"> 
               <p>{currentExercise.name}</p>
               <button>
                  <img
                     src={Arrow}
                     className="arrow"
                     width="36px"
                     height="20px"
                     alt="arrow-button"
                     onClick={() => {
                        document.getElementById("createModalMenu").classList.toggle("active")
                     }}
                     ></img>
               </button>
            </div>
            {/*DEBUG HERE!!!!!! 
            УБРАТЬ ПОЗЖЕ НЕ ЗАБУУУУДЬЬ, нужно сделать шаги назад!!!
            */}
            <button id="back" onClick={debugClick}>Назад</button>
         </div>
         <div className="statistics-container">
            <div className="statistics-chart-container">
               {<BarChart2 stats={statistics}/>}
            </div>
            <div className="statistics-table-container">
               <table>
                  <thead>
                     <tr>
                        <th>Логин</th>
                        <th>Время выполнения</th>
                        <th>Количество ошибок %</th>
                        <th>Средняя скорость набора</th>
                        <th>Статус</th>
                        <th>Дата</th>
                     </tr>
                  </thead>
                  <tbody>
                     {statistics.map((stat) => 
                        <tr>
                           <td>{stat.login}</td>
                           <td>{stat.time}</td>
                           <td>{stat.errors}</td>
                           <td>{stat.typeSpeed}</td>
                           <td>{statusString(stat.status)}</td>
                           <td>{stat.date}</td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
            <div className="modal-menu" id="createModalMenu">
               <div className="modal-menu-content" id="modal-menu-content">
                  <input
                     placeholder="Пользователь.."
                     type="text"
                     name="userName"
                     value={searchExercise.name}
                     onChange={changeSearchExerciseHandler}
                  />
                  {list.map((exerciseElem) => 
                  <MenuItem name={exerciseElem.name} handleClick={handleClick}/>
                     )}
                  {/*searchExercise.name === ""
                     ? list.map((elem) => (
                        <MenuItem name={elem} handleClick={handleClick} />
                     ))
                     : list.filter((elem) => elem.name.includes(searchExercise.name)).map((elem) => (
                        <MenuItem name={elem} handleClick={handleClick} />
                     ))
                     */}
               </div>
            </div>
         </div>
      </div>
   )
}