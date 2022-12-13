import "../../styles/Admin/AdminPage.scss"
import { useNavigate } from "react-router-dom"

export const StatisticMenu = () => {
  const history = useNavigate()
  const backHandler = (event) => {
    event.preventDefault()
    history("/admin_panel")
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
          <button>Все упражнения</button>
        </div>
      </div>
      <div className="admin-panel second-layers">
        <div className="st task">
          <button>Конкретное упражнение</button>
        </div>
        <div className="st all-users">
          <button>По всем пользователям</button>
        </div>
      </div>
      <div className="admin-panel third-layer">
        <div className="user">
          <button>Конкретный пользователь</button>
        </div>
        <div className="back">
          <button onClick={backHandler}>Назад</button>
        </div>
      </div>
    </div>
  )
}
