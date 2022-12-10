import "../../styles/client/Header.scss"
import App from "../../App";
import { LoginCard } from "./LoginCard"

 const Header = () => {

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
                 <div className="title">
                     Печаточка.
                 </div>
                 <div className="profile" onClick={()=>openCard()}>
                        Профиль
                 </div>
             </header>
             {<LoginCard />}
         </div>
     );
}

export default Header;
