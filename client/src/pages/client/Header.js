import "../../styles/client/Header.scss"
//import App from "../../App";

 const Header = () => {

     return (
         <div>
             {/* hello */}
             <header id="header">
                 <div className="title">
                     Печаточка.
                 </div>
                 <div className="profile">
                        Профиль
                 </div>
             </header>
         </div>
     );
}

export default Header;
