import "../../styles/client/LoginCard.scss"
import React, { useEffect, useState , useContext} from "react"
import {login, loginUser, createUser} from "../../http/authAPI";

export const LoginCard = (props) => {

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

  
    // useEffect(() => {
    //     if (document.getElementById("userName") && (newUser.password !== "" || newUser.userName !== "")) {
    //         console.log("useEffect")
  
    //         if (newUser.userName !== "" && !document.getElementById("userName").checkValidity())
    //             document.getElementById("errorLogin").style.display = "block";
    //         else
    //             document.getElementById("errorLogin").style.display = "none";
      
    //         if (newUser.password !== "" && !document.getElementById("password").checkValidity())
    //             document.getElementById("errorPassword").style.display = "block";
    //         else
    //             document.getElementById("errorPassword").style.display = "none";
    //     }
    // }, [newUser])
  
    const clickLogin = async () => {
        await login(newUser.userName, newUser.password).then(data =>
            console.log(data)
        )
        // await createUser(newUser.userName, newUser.password).then(data =>
        //     console.log(data)
        // )
// var requestOptions = {
//   method: 'POST',
//     headers: { 'Content-Type': 'application/json;charset=utf-8' },
//   body: JSON.stringify(newUser)
// }
//          //   console.log(newUser)
//         await fetch('/api/auth/login', requestOptions).then(async res => {
//             console.log("res"+res)
//                 if (!res.ok) {
//                     throw Error("fuck")
//                 }
                
//                let result = await res.json();
//                console.log(result)
//             })

        
            // console.log(newUser)
            // fetch('/api/auth/login',{
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json;charset=utf-8'
            //       },
            //       body: JSON.stringify(newUser)
            // }).then(res => {
            //     if (!res.ok) {
            //         throw Error("fuck")
            //     }
            //     return res.json()
            // }).then(data => {
            //     console.log(data)
            // }).catch(err => {
            //     console.log(err)
            // })
        //let res = request('/api/auth/login', 'POST', newUser)
        
           // let result = await response.json();
           
           // auth.login(data.token, data.userLogin, data.accountType)
    }

  
  
  
    return (
            <div id="loginCard" className="modal-main">
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
                            onClick={() => { clickLogin() }}
                        ></input>
                    </form>
                </div>
            </div>
        

  
    )
}