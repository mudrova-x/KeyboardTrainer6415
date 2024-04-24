import "../../styles/Admin/AdminPage.scss"
import "../../styles/Admin/UderlineStyles.scss"
import { useNavigate } from "react-router-dom"
import { InfoWindow } from "../../components/InfoWindow"

export const AdminPage = () => {
  const history = useNavigate()
  const usersHandler = (event) => {
    event.preventDefault()
    history("/userlist")
  }
  const tasksHandler = (event) => {
    event.preventDefault()
    history("/tasklist")
  }
  const statisticHandler = (event) => {
    event.preventDefault()
    history("/statistic_menu")
  }
  const levelsHandler = (event) => {
    event.preventDefault()
    history("/settings")
  }

  return (
    <div className="admin-page">
      <div className="admin-panel first-layer">
      <div className="Container-usA">
                    <div className="Us">
                        <div className="center-text underline-white">Административная панель</div>
                    </div>
        </div>
        <div className="users">
          <button onClick={usersHandler}>Пользователи</button>
        </div>
      </div>
      <div className="admin-panel second-layers">
        <div className="tasks ">
          <button className="statistic" onClick={tasksHandler}>
            Создание и редактирование упражнений
          </button>
        </div>
        <div className="statistic">
          <button onClick={statisticHandler}>Статистика</button>
        </div>
      </div>
      <div className="admin-panel third-layer">
        <div className="levels">
          <button onClick={levelsHandler}>Уровни сложности</button>
        </div>
        <div className="info ">
          <button className="statistic" onClick={() =>
          (document.getElementById("infoModal").style.display = "block")
        }>Справка</button>
        </div>
      </div>

      <div id="infoModal" className="modal">
        <div className="modal-content" id="modal-content">
                  <div className="window-user" style={{ width: '40%',     height: '78%' }}>
                      <InfoWindow />
          </div>
        </div>
      </div>
    </div>
  )
}