import "../../styles/client/Header.scss"
import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context"
import { useNavigate } from 'react-router-dom'

//console.log(auth.isAuthenticated)

const Header = () => {
     
    const history = useNavigate();
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history('/')
    }
    let openCard = () => {
        const card = document.getElementById("loginCard")
        console.log(document.getElementById("loginCard").style.display)
        if (card)
        {
           document.getElementById("loginCard").style.display =  card.style.display === "block"?"none":"block"
       }
    }
     return (
         <div>
             {/* hello */}
             <header id="header">
                 <div className="title" >
                     Печаточка.
                 </div>
                 <div className="profile" onClick={auth.isAuthenticated?logoutHandler:openCard}>
                     {auth.isAuthenticated?'Выход?':'Профиль'}
                 </div>
             </header>
         </div>
     );
}

export default Header;
