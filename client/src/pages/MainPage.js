import "../styles/Main.scss"
import React, { useEffect, useState , useContext} from "react"
import {useHttp} from "../hook"
import {AuthContext} from "../auth.context";

export const MainPage = (props) => {
    const auth = useContext(AuthContext)
   const { request } = useHttp()
    const [newUser, setNewUser] = useState({
        userName: "",
        password: "",
    })

    const changeNewUserHandler = (event) => {
        setNewUser({ ...newUser, [event.target.name]: event.target.value })
    }

    let checkInput = (() => {
        let isDisabled = document.getElementById("password") && document.getElementById("userName")
            ? !(
                document.getElementById("password").checkValidity() &&
                document.getElementById("userName").checkValidity()
            )
            : true
        // console.log("!checkInput="+!isDisabled)
        return isDisabled
    })

  
    useEffect(() => {
        if (document.getElementById("userName") && (newUser.password !== "" || newUser.userName !== "")) {
            console.log("useEffect")
  
            if (newUser.userName !== "" && !document.getElementById("userName").checkValidity())
                document.getElementById("errorLogin").style.display = "block";
            else
                document.getElementById("errorLogin").style.display = "none";
      
            if (newUser.password !== "" && !document.getElementById("password").checkValidity())
                document.getElementById("errorPassword").style.display = "block";
            else
                document.getElementById("errorPassword").style.display = "none";
        }
    }, [newUser])
  
    const login = async () => {
        try {
            const data = await request('/api/user/login',
                'POST',
                { login: newUser.userName, password: newUser.password }
            )
            auth.login(data.token, data.userId, data.accountType);
           // auth.login(data.token, data.userLogin, data.accountType)
          //  console.log(data)
            
        } catch (e)
        {
          console.log("Error: "+e.message)
          //alert("Не удалось войти");
        }
    }

  
  
  
    return (
        <div className="InputСюдаВсеОстальное">
      
    
            <div id="createModal" className="modal-main">
                {/* <div className="modal-content" id="modal-content"> */}
                <div className="window-user">
                    <form className="fields-user" id="window">
                        <input
                            className="input-user"
                            placeholder="Логин"
                            type="text"
                            id="userName"
                            name="userName"
                            value={newUser.userName}
                            onChange={changeNewUserHandler}
                            required
                            pattern="^.{4,16}$"
                        />
                        <input
                            className="input-user"
                            placeholder="Пароль"
                            type="text"
                            id="password"
                            name="password"
                            value={newUser.password}
                            onChange={changeNewUserHandler}
                            required
                            pattern="^.{8,16}$"
                        />
                        <div className="errorsBox">
                            <p className="errorMessage-main" id="errorLogin">
                                Логин должен содержать от 4 до 16 символов.
                            </p>
                            <p className="errorMessage-main" id="errorPassword">
                                Пароль должен содержать от 8 до 16 символов.
                            </p>
                        </div>
                        <input
                            type="submit"
                            className="addButton"
                            value="Войти"
                            disabled={checkInput()}
                            onClick={() => { login() }}
                        ></input>
                    </form>
                </div>
            </div>
        </div>
        

  
    )
}