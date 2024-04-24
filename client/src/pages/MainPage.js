import "../styles/Main.scss"
import "../styles/client/ClientMain.scss"
import React, {
    useEffect, useState,
    useContext
} from "react"
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/auth.context";
import { getExerciseByLevel, fetchDescriptionLevel, logiunser, test} from "../http/mainAPI";
import {useNavigate} from "react-router-dom";

export const MainPage = (props) => {

   const auth = useContext(AuthContext)
   //const { request } = useHttp()
    const [newUser, setNewUser] = useState({
        userName: "",
        password: "",
    })
    const [exercises, setExercises] = useState([{ id:0, level_num:1, name: "default", time:0}])
    const [levelMy, setLevelMy] = useState({max_errors: 0,max_length: 0,max_time: 0,min_length: 0,number: 0, zones:0})
    const [textLevel, setTextLevel] = useState("Первый уровень сложности")

    const changeNewUserHandler = (event) => {
        setNewUser({ ...newUser, [event.target.name]: event.target.value })
        //console.log(newUser)
    }

    let checkInput = (() => {
        let isDisabled = document.getElementById("password") && document.getElementById("userName")
            ? !(
                document.getElementById("password").checkValidity() &&
                document.getElementById("userName").checkValidity()
            )
            : true
        console.log("!checkInput="+!isDisabled)
        return isDisabled
    })

  
    useEffect(() => {
        if (document.getElementById("userName") && (newUser.password !== "" || newUser.userName !== "")) {
            //console.log("useEffect")
  
            (document.getElementById("errorData").style.display = "none")
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
        logiunser(newUser.userName, newUser.password).then(data => {
           // console.log(data)
            const { status } = data
            console.log(status)
            console.log(data)
            console.log(document.getElementById("errorData"))
            if (status === 400) {
                document.getElementById("errorData").innerText = data.message
                document.getElementById("errorData").style.display = "block"
            }

            auth.login(data.token, data.userId, data.accountType)
            })
    }

    const getLevel = ((level) => {
        fetchDescriptionLevel(level).then(data =>
            //setExerlevel.setLevel(data)
        {
                //console.log(data)
                if(data)setLevelMy({
                    max_errors: data.max_errors,
                    max_length: data.max_length,
                    max_time: data.max_time,
                    min_length: data.min_length,
                    number: data.number ,
                    zones:data.zones
                })

            switch (data.number){
                case 1: setTextLevel("Первый уровень сложности"); break;
                case 2: setTextLevel("Второй уровень сложности"); break;
                case 3: setTextLevel("Третий уровень сложности"); break;
                case 4: setTextLevel("Четвертый уровень сложности"); break;

            }
        }
            ).then(getExerciseByLevel(level).then(data => {
               //console.log(data.rows)
               setExercises(data.rows)
                //console.log("exercises.id= " ,exercises.id)
                //console.log(exercises)
                
            }
            ))

   })

   
    useEffect( () => {

            fetchDescriptionLevel(1).then(data =>
                //setExerlevel.setLevel(data)
            {
                    //console.log(data)
                    if(data)setLevelMy({
                        max_errors: data.max_errors,
                        max_length: data.max_length,
                        max_time: data.max_time,
                        min_length: data.min_length,
                        number: data.number,
                        zones:data.zones
                    })
                }
                ).then(getExerciseByLevel(1).then(data => {
                   // console.log(data.rows)
                    setExercises(data.rows)
                  //  console.log(exercises)
                    
                }
                ))
        
    }, [])


    let nav = useNavigate()
    const ExRow = (props) => {
        const {ex
    } = props
        const {
            id
            ,name,
            text
        } = ex

        //console.log(props)
       // console.log(level)
        return (
            <div onClick={auth.isAuthenticated ? () => {nav('/training/' + id)} : () => {alert("Для прохождения теста войдите в аккаунт")}} style={{cursor: "pointer"}}>
            <div className="container-number-test" key={Math.random() * (100000 - 1) + 1}>
            <div className="test-name">{name}</div>

            <div className="text-flex-row">
                <div className="test-zone">Зона: {levelMy.zones}</div>
                <div className="test-time">Время теста: {text?(levelMy.max_time*text.length).toFixed(1):0}</div>
                <div>
                    <div className="test-max-mistake">Количество допустимых ошибок: {levelMy.max_errors}</div>
                    <div className="test-symbol">Количество символов: {text?text.length:0}</div>
                </div>
            </div>

        </div>
            </div>
        )
    }
    
    return (
        <div className="InputСюдаВсеОстальное">
      
        <div className="container">

            <div className="first-layer">
                <div className="blind-printing">
                    <div className="the-most-powerful">Самый мощный</div>
                    <div className="training">Тренажер</div>
                    <div className="prints">Печати</div>
                    <div className="in-the-blind">Вслепую</div>
                </div>

                <div className="Container-us">
                    <div className="Us">
                        <div className="center-text underline-white">Нас выбирают самые быстрые</div>
                    </div>
                </div>

            </div>

            <div className="second-layer">
                <div>
                    <div className="difficulty-levels">
                        <div className="difficulty-levels-text">Уровень сложности:</div>
                        <div className="">
                            <button  className="level-1" onClick={()=>getLevel(1)} style={{cursor:"pointer"}}>1</button>
                            <button  className="level-2" onClick={()=>getLevel(2)} style={{cursor:"pointer"}}>2</button>
                            <button  className="level-3" onClick={()=>getLevel(3)} style={{cursor:"pointer"}}>3</button>
                            <button  className="level-4" onClick={()=>getLevel(4)} style={{cursor:"pointer"}}>4</button>
                        </div>

                    </div>
                        <div className="container-all-test">
                        { exercises.map((el, index) => (
                            <ExRow ex={el} index={index} key={Math.random() * (100000 - 1) + 1 } />
                        ))
                        }
                        {/* <div className="container-number-test">
                            <div className="test-name">Название теста</div>

                            <div className="text-flex-row">
                                <div className="test-zone">Зона: А</div>
                                <div className="test-time">Время теста: 02:20</div>
                                <div>
                                    <div className="test-max-mistake">Количество допустимых ошибок: 5</div>
                                    <div className="test-symbol">Количество символов: 5</div>
                                </div>
                            </div>

                        </div>
                        <div className="container-number-test">
                            <div className="test-name">Название теста</div>

                            <div className="text-flex-row">
                                <div className="test-zone">Зона: А</div>
                                <div className="test-time">Время теста: 02:20</div>
                                <div>
                                    <div className="test-max-mistake">Количество допустимых ошибок: 5</div>
                                    <div className="test-symbol">Количество символов: 5</div>
                                </div>
                            </div>

                        </div>
                        <div className="container-number-test">
                            <div className="test-name">Название теста</div>
                            <div className="text-flex-row">
                                <div className="test-zone">Зона: А</div>
                                <div className="test-time">Время теста: 02:20</div>
                                <div>
                                    <div className="test-max-mistake">Количество допустимых ошибок: 5</div>
                                    <div className="test-symbol">Количество символов: 5</div>
                                </div>
                            </div>

                        </div> */}

                    </div>
                </div>

                <div className="description-of-difficulty-levels">
                    <div className="the-name-of-the-difficulty-level">{textLevel}</div>
                    <div className="text-description-of-difficulty-levels underline">Максимальное количество допустимых ошибок:{levelMy.max_errors}</div>
                    <div className="text-description-of-difficulty-levels underline">Максимальное время нажатия в секундах: {levelMy.max_time}</div>
                    <div className="text-description-of-difficulty-levels underline">Максимальное количество зон для тренировки: {levelMy.zones}</div>
                    <div className="text-description-of-difficulty-levels underline">Максимальное количество символов:{levelMy.max_length}</div>
                    <div className="text-description-of-difficulty-levels underline">Минимальное количество символов:{levelMy.min_length}</div>
                </div>

            </div>


            </div>
            {(!auth.isAuthenticated)&&
                (<div id="loginCard" className="modal-main">
                    {/* <div className="modal-content" id="modal-content"> */}
                    <div className="window-user">
                        <div className="fields-user" id="window">
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
                                type="password"
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
                                <p className="errorMessage-main" id="errorData">
                                    Некорректные данные
                                </p>
                            </div>
                            <input
                                type="submit"
                                className="addButton"
                                value="Войти"
                                disabled={checkInput()}
                                onClick={() => { login() }}
                            ></input>
                        </div>
                    </div>
                </div>)}
        </div>
        

  
    )
}