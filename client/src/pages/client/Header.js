import "../../styles/client/Header.scss"
import React, { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
//console.log(auth.isAuthenticated)

const Header = () => {
  const location = useLocation()
  console.log(useLocation().pathname)
  const history = useNavigate()
  const auth = useContext(AuthContext)
  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    history("/")
  }
  let openCard = () => {
    const card = document.getElementById("loginCard")
    console.log(document.getElementById("loginCard").style.display)
    if (card) {
      document.getElementById("loginCard").style.display =
        card.style.display === "block" ? "none" : "block"
    }
  }
  const getName = () => {
    if (!auth.isAuthenticated) return "Профиль"
    if (location.pathname.startsWith("/admin_panel")||location.pathname===("/statistics")||location.pathname===("/statistic_menu")) return "Выход"
    return "Профиль"
  }
  const reNavidate = () => {
    if (auth.accountType === "admin") history("/admin_panel")
    if (auth.accountType === "student") history("/statistics") // ДОБАВИТЬ ССЫЛОЧКУ
  }
  const func = () => {
    const f = !auth.isAuthenticated
      ? openCard
      : (auth.isAuthenticated && getName()) === "Выход"
      ? logoutHandler
      : reNavidate 
    return f
  }

  return (
    <div>
      {/* hello */}
      <header id="header">
        <div className="title">Печаточка.</div>
        <div
          className="profile"
           onClick={func()}
        >
          {getName()}
        </div>
      </header>
    </div>
  )
}

export default Header
