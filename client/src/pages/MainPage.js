import "../styles/Main.scss"
import "../styles/client/ClientMain.scss"
import React, {
    useEffect, useState,
    useContext
} from "react"
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/auth.context";
import { getExerciseByLevel, fetchDescriptionLevel, logiunser, test} from "../http/mainAPI";

export const MainPage = (props) => {

   const auth = useContext(AuthContext)
   //const { request } = useHttp()
    const [newUser, setNewUser] = useState({
        userName: "",
        password: "",
    })
    const [exercises, setExercises] = useState([{level_num:1, name: "default", time:0}])
    const [level, setLevel] = useState({max_errors: 0,max_length: 0,max_time: 0,min_length: 0,number: 0, zones:0})

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

            if (status === 400) document.getElementById("errorData").style.display = "block"

            auth.login(data.token, data.userId, data.accountType)
            })
    }

    const getLevel = ((level) => {
        fetchDescriptionLevel(level).then(data =>
            //setExerlevel.setLevel(data)
        {
                //console.log(data)
                if(data)setLevel({
                    max_errors: data.max_errors,
                    max_length: data.max_length,
                    max_time: data.max_time,
                    min_length: data.max_time,
                    number: data.number ,
                    zones:data.zones
                })
            }
            ).then(getExerciseByLevel(level).then(data => {
               // console.log(data.rows)
               setExercises(data.rows)
                //console.log(exercises)
                
            }
            ))
   })

   
    useEffect( () => {
            fetchDescriptionLevel(1).then(data =>
                //setExerlevel.setLevel(data)
            {
                    //console.log(data)
                    if(data)setLevel({
                        max_errors: data.max_errors,
                        max_length: data.max_length,
                        max_time: data.max_time,
                        min_length: data.max_time,
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
    
   

    const ExRow = (props) => {
        const {ex
    } = props
        const {
            name,
            text
        } = ex

        //console.log(props)
       // console.log(level)
        return (
            <div className="container-number-test" key={Math.random() * (100000 - 1) + 1}>
            <div className="test-name">{name}</div>

            <div className="text-flex-row">
                <div className="test-zone">Зона: {level.zones}</div>
                <div className="test-time">Время теста: {text?level.max_time*text.length:0}</div>
                <div>
                    <div className="test-max-mistake">Количество допустимых ошибок: {level.max_errors}</div>
                    <div className="test-symbol">Количество символов: {text?text.length:0}</div>
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
                            <button  className="level-1" onClick={()=>getLevel(1)}>1</button>
                            <button  className="level-2" onClick={()=>getLevel(2)}>2</button>
                            <button  className="level-3">3</button>
                            <button  className="level-4">4</button>
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
                    <div className="the-name-of-the-difficulty-level">Первый уровень сложности</div>
                    <div className="text-description-of-difficulty-levels underline">Мин. количество допустимых ошибок:

                    </div>
                    <div className="text-description-of-difficulty-levels underline">
                    </div>
                    <div className="text-description-of-difficulty-levels underline">Макс. время нажатия в секундах: 4
                    </div>
                    <div className="text-description-of-difficulty-levels underline">Макс. количество зон для
                        тренировки: 1
                    </div>
                    <div className="text-description-of-difficulty-levels underline">Maкс. количество символов: 50</div>

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