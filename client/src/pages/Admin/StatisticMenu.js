import { useNavigate } from "react-router-dom"
import "../../styles/Admin/AdminPage.scss"

export const StatisticMenu = () => {
  const history = useNavigate()
  const backHandler = (event) => {
    event.preventDefault()
    history("/admin_panel")
  }
  const allExHandler = (event) => {
    event.preventDefault()
    history("/statisticallexercisesmean")
  }
  const exHandler = (event) => {
    event.preventDefault()
    history("/statisticexercise")
  }
  const allUsersHandler = (event) => {
    event.preventDefault()
    history("/statisticallusersmean")
  }
  const userHandler = (event) => {
    event.preventDefault()
    history("/statisticallusers")
  }
  return (
    <div className="admin-page">
      <div className="admin-panel first-layer">
        <div className="Container-usA">
          <div className="Us">
            <div className="center-text underline-white">
              Статистика
            </div>
          </div>
        </div>
        {/* <div className="title "><p>Статистика</p></div> */}
        <div className="users ">
          <button  onClick={allExHandler}>Все упражнения</button>
        </div>
      </div>
      <div className="admin-panel second-layers">
        <div className="st task">
          <button  onClick={exHandler}>Конкретное упражнение</button>
        </div>
        <div className="st all-users">
          <button  onClick={allUsersHandler}>По всем пользователям</button>
        </div>
      </div>
      <div className="admin-panel third-layer">
        <div className="user">
          <button  onClick={userHandler}>Конкретный пользователь</button>
        </div>
        <div className="back">
          <button onClick={backHandler}>Назад</button>
        </div>
      </div>
    </div>
  )
}
