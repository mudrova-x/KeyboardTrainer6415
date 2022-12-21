import "../../styles/Admin/StatisticsPage.scss"
import React, { useEffect, useState } from "react"
import Arrow from "../../icons/arrow.png"

import { BarChart } from "../../components/BarChart"
import { MenuItem} from "../../components/MenuItem"
import { getAllUsers } from "../../http/userAPI"
import { getStatisticsByUserId, getStatisticsByUserIdCarton } from "../../http/statisticsAPI"

import data from "../../mock-data.json" // Мокнутые данные для теста. Не забудь удалить. Я сказал НЕЗАБУДЬ!!!
import { getAllExercises } from "../../http/exerciseAPI"
import { useNavigate } from "react-router-dom"

export const userList = ["loading..."]

export const dataTemplate = []



export const StatisticAllUsers = () => {
   
   const [list, setList] = useState([{id: 1, name:"loading..."}])
   const [currentUser, setCurrentUser] = useState({id: 1, name:"loading..."})
   const [statistics, setStatistics] = useState(dataTemplate);

   const [searchUser, setSearchUser] = useState({userName: ""})

   const changeSearchUserHandler = (event) => {
      console.log("userName = " + searchUser.userName)
      setSearchUser({ ...searchUser, [event.target.name]: event.target.value })
    }
   
   const history = useNavigate();

   const getAll = async () => {
      let usersArr = []
      console.log("getAll")
      getAllUsers().then(data => {
         for (var e in data) {
            if (data[e].login !== "admin")
               usersArr.push({
                  id: data[e].id,
                  name: data[e].login
               })
         }
        console.log("DEBUG LIST")
        setList(usersArr)
        setCurrentUser(usersArr[0])
        formStat(usersArr[0])
      })
    }

   useEffect(()=>{
      let func = async () => { await getAll() }
      func() 
      //setTestName(users[0])
    }, [setList])

   function handleClick(name) {
      console.log(name)
      let newName = list.find(obj => obj.name === name)
      console.log("newName: " + newName);
      console.log(newName);
      setCurrentUser(newName)
      formStat({id: newName.id, name:newName.name})
      document.getElementById("createModalMenu").classList.toggle("active")
   }

   async function formStat(user) {
      let statsArr = []
      let stats = await getStatisticsByUserId(user.id)
      let exercises = await getAllExercises()

      console.log("Form stat")
      console.log(stats)
      console.log(exercises)

      stats.map((stat) => {
         let exercise = exercises.find(obj => obj.id === stat.exerciseId)
         statsArr.push({
            errors: stat.errors,
            typeSpeed: stat.speed.toFixed(2),
            date: stat.date,
            exerciseId: stat.exerciseId,
            exName: exercise.name,
            level: exercise.level_num,
            charCount: exercise.text.length
         })
      })
      console.log(statsArr)
      setStatistics(statsArr)
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
               <p>{currentUser.name}</p>
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
               <BarChart stats={statistics}/>
            </div>
            <div className="statistics-table-container">
               <table>
                  <thead>
                     <tr>
                        <th>Название упражнения</th>
                        <th>Номер уровня сложности</th>
                        <th>Количество символов</th>
                        <th>Количество ошибок</th>
                        <th>Средняя скорость набора</th>
                        <th>Дата</th>
                     </tr>
                  </thead>
                  <tbody>
                     {statistics.map((stat) => 
                        <tr>
                           <td>{stat.exName}</td>
                           <td>{stat.level}</td>
                           <td>{stat.charCount}</td>
                           <td>{stat.errors}</td>
                           <td>{stat.typeSpeed}</td>
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
                     value={searchUser.userName}
                     onChange={changeSearchUserHandler}
                  />
                  {/*users.map((userElem) => 
                  <MenuItem name={userElem} handleClick={handleClick}/>
                     )*/}

                  {searchUser.userName === ""
                     ? list.map((elem) => (
                        <MenuItem name={elem.name} handleClick={handleClick}/>
                     ))
                     : list.filter((item) => item.name.includes(searchUser.userName)).map((elem) => (
                        <MenuItem name={elem.name} handleClick={handleClick}/>
                     ))
                     }

                  {/*searchUser.userName === ""
                     ? users.map((el) => (
                        <MenuItem name={el} handleClick={handleClick} key={Math.random() * (100000 - 1) + 1} />
                     ))
                     : users.map((el) =>
                        el.userName.includes(searchUser.userName) ? (
                           <MenuItem name={el} handleClick={handleClick} key={Math.random() * (100000 - 1) + 1} />
                        ) : (
                           <></>
                        )
                        )*/}
               </div>
            </div>
         </div>
      </div>
   )
}