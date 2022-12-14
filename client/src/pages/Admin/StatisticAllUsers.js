import "../../styles/Admin/StatisticsPage.scss"
import React, { useEffect, useState } from "react"
import Arrow from "../../icons/arrow.png"

import { BarChart } from "../../components/BarChart"
import { MenuItem} from "../../components/MenuItem"
import { getAllUsers } from "../../http/userAPI"
import { getStatisticsByUserId, getStatisticsByUserIdCarton } from "../../http/statisticsAPI"

import data from "../../mock-data.json" // Мокнутые данные для теста. Не забудь удалить. Я сказал НЕЗАБУДЬ!!!

export const userList = ["loading..."]





export const StatisticAllUsers = () => {
   const [statistics, setStatistics] = useState(data);

   const [users, setUsers] = useState(userList)
   const [currentUser, setCurrentUser] = useState("Choose user")
   const [currentId, setId] = useState(1)

   const [list, setList] = useState([{id: 1, userName:"loading..."}])
   

   const getAll = async () => {
      let usersMass = []
      let usersArr = []
      console.log("getAll")
      getAllUsers().then(data => {
         for (var e in data) {
          if(data[e].login!=="admin")
            usersArr.push(data[e].login)
         usersMass.push({
            id: data[e].id,
            userName: data[e].login
         })
        }
        console.log("DEBUG LIST")
        console.log(usersMass)
        setList(usersMass)
        setUsers(usersArr)
      })
    }

   useEffect(()=>{
      let func = async () => { await getAll() }
      func() 
      //setTestName(users[0])
    }, [setUsers])

    /*useEffect(() => {
      setCurrentUser(users[0])
    })*/
   
   console.log("Stats")
   console.log(statistics)

    function getUserIdByName(user) {
      //console.log("getUserIdByName")
      //console.log(list)
      list.map((elem) => {
         console.log(elem.userName)
         if(elem.userName === user) {
            //console.log("SAME")
            setId(elem.id)
            //console.log("Current id: " + currentId)
         }
      })
    }

   function handleClick(userName) {
      console.log(userName)
      setCurrentUser(userName)
      getUserIdByName(userName)
   }

   async function debugClick() {
      console.log("CLIIIIICK!!")
      await getStatisticsByUserId(currentId)
   }
   
   // Rename cool class name "user-chooser" to "user-select"???
   return (
      <div className="admin-page-statistics">
         <div className="nav-panel">
            <div className="user-chooser"> 
               <p>{currentUser}</p>
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
            {/*DEBUG HERE!!!!!! */}
            <button id="back" onClick={debugClick}>Назад</button>
         </div>
         <div className="statistics-container">
            <div className="statistics-chart-container">
               <BarChart />
            </div>
            <div className="statistics-table-container">
               <table>
                  <thead>
                     <tr>
                        <th>Название упражнения</th>
                        <th>Номер уровня сложности</th>
                        <th>Количество символов</th>
                        <th>Количество ошибок %</th>
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
                     /*value={oldUser.userName}*/
                     /*onChange={changeOldUserHandler}*/
                  />
                  {users.map((userElem) => 
                  <MenuItem name={userElem} handleClick={handleClick}/>
                     )};
               </div>
            </div>
         </div>
      </div>
   )
}