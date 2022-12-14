import "../../styles/client/UserStatistics.scss"

import React from "react"
import { useNavigate } from "react-router-dom"
import { InfoWindow } from "../../components/InfoWindow"

export const UserStatistics = (props) => {
  const history = useNavigate()
  const profileHandler = (event) => {
    event.preventDefault()
    history("/")
  }
  return (
    <div>
      <div className="Container-flex">
        <div className="Container-name">
          <div className="User-Name">Имя пользователя</div>
        </div>
              <button className="Button-ref" onClick={() =>
                  (document.getElementById("infoModal").style.display = "block")}>СПРАВКА</button>
        <button className="Button-ref" onClick={profileHandler}>НАЗАД</button>
      </div>
      <div className="Container-Hat">
        <div></div>
      </div>
      <div id="infoModal" className="modal">
        <div className="modal-content" id="modal-content">
          <div className="window-user" style={{ width: "40%", height: "78%" }}>
            <InfoWindow />
          </div>
        </div>
      </div>
    </div>
  )
}
