import "../../styles/Admin/StatisticsPage.scss"
import React, { useState } from "react"
import Arrow from "../../icons/arrow.png"

import { BarChart } from "../../components/BarChart"

import {Bar} from "react-chartjs-2"
import data from "../../mock-data.json" // Мокнутые данные для теста. Не забудь удалить. Я сказал НЕЗАБУДЬ!!!

export const StatisticAllUsers = () => {
   //const [statistics, setStatistics] = useState(data);
   let statistics = data
   let currentUser = "PlaceHolderUser" // PLACE HOLDER USER
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
                     ></img>
               </button>
            </div>
            <button id="back">Назад</button>
         </div>
         <div className="statistics-container">
            <div className="statistics-chart-container">
               <BarChart/>
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
         </div>
      </div>
   )
}