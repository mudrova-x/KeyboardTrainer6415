import "../../styles/Admin/TaskListPage.scss"
import React, { useEffect, useState } from "react"
import Add from "../../icons/add.png"
import Delete from "../../icons/delete.png"
import {requestCreator} from "../../hook"
import { createUser, getAllUsers, updateUser, deleteUser } from "../../http/userAPI";

export const UserListPage = (props) => {
  
 // const { request } = useHttp()
  const [list, setList] = useState([{ userName: "loading" }])
  const [dis, setDis] = useState(true)
  const [max, setMax] = useState(0)
  const [settings, setSettings] = useState(true)
  const [oldUser, setOldUser] = useState({
    userName: "",
  })
  const [newUser, setNewUser] = useState({
    userName: "",
    password: "",
  })
  const changeOldUserHandler = (event) => {
    //console.log("userName = " + oldUser.userName)
    setOldUser({ ...oldUser, [event.target.name]: event.target.value })
  }

  const changeNewUserHandler = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value })
  }
  const clearFields = () => {
    setNewUser({userName: "", password: ""})
  }

  const checkInput = (() => {
    if (settings) {
      let isDisabled = document.getElementById("password") && document.getElementById("userName")
        ? !(
          document.getElementById("password").checkValidity() &&
          document.getElementById("userName").checkValidity()
        )
        : true
      return isDisabled
    }
    else return document.getElementById("passwordu") ? !(document.getElementById("password").checkValidity() ): true
  })

  const check_disable = (() =>{
    let listIn = !!list.find(person => person.userName === newUser.userName)
    //console.log("list= " + listIn)
    let admin = newUser.userName === "admin"
    //console.log("admin= " + admin)
    //console.log("settings= " + settings)
    if (!settings) listIn = false
    
    let input = checkInput()
   // console.log("checkInput= " + input)
    //console.log("result = = = "+(input||admin||listIn))
    if (input || admin || listIn)
     return true;
    else
      return false;
  })

  const changePasswordHandler = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value })
    //console.log(event.target.name)
    //console.log(newUser)
    //check_disable()
  }
  // function checkUser(){
  //   // есть в списке или админ
  //   console.log("AAAAAAAAAAAAAAAA-")

  //   console.log()
  //   console.log(newUser.userName)
  //   return (!!list.find(person => person.userName === newUser.userName) || ())
  // }

  const getAll = async () => {
    let usersMass = []
    console.log("getAll")
    getAllUsers().then(data => {
      for (var e in data) {
        if(data[e].login!=="admin")
          usersMass.push({
                  userName: data[e].login
          })
      }
      //console.log(usersMass)
      setList(usersMass)
      setMax(list.length)
      //console.log(list)
    })
  }

  const create = async (user) => {
    //if (check_disable)return
    console.log("createUser")
    createUser(user.userName,user.password).then(data => {
      console.log(data)
      document.getElementById("createModal").style.display = "none"
      getAll()
      clearFields()
    })
    
  }

  const update = async (user) => {
    console.log("updateUser")
    updateUser(user.userName, user.password).then(data => {
      console.log(data)
      document.getElementById("updateModal").style.display = "none"
      getAll()
      clearFields()
    })
  }

  const del = async (userName) => {
    deleteUser(userName).then(data => {
      console.log(data)
      getAll()
    })
  }
  
  useEffect(()=>{
    let func = async () => { await getAll() }
    func() 
  }, [setList])
  
 
  let distance = {
    height:
      window.innerHeight +
      20 -
      ((document.getElementById("header") === null
        ? 157
        : document.getElementById("header").offsetHeight) +
        (document.getElementById("seach-panel") === null
          ? 97
          : document.getElementById("seach-panel").offsetHeight)) +
      "px",
  }

  // window.onclick = function (event) {
  //   console.log(document.getElementById("createModal").style.display)
  //   console.log(event.target)

  //   // if (
  //   //   event.target === document.getElementById("myModal") ||
  //   //   event.target === document.getElementById("modal-content")
  //   // ) {
  //   //   document.getElementById("createModal").style.display = "none"
  //   // }
  // }

  

  useEffect(() => {
    //console.log("useEffect")
    if (document.getElementById("userName") && (newUser.password !== "" || newUser.userName !== "")) {
     // console.log("useEffect")
      if (settings){ 
      if (newUser.userName !== "" && !document.getElementById("userName").checkValidity())
        document.getElementById("errorLogin").style.display = "block";
      else
        document.getElementById("errorLogin").style.display = "none";
      
      if (newUser.password !== "" && !document.getElementById("password").checkValidity())
        document.getElementById("errorPassword").style.display = "block";
      else
        document.getElementById("errorPassword").style.display = "none";
    }
      else {
        if (newUser.password !== "" && !document.getElementById("passwordu").checkValidity())
        document.getElementById("errorPasswordu").style.display = "block";
      else
        document.getElementById("errorPasswordu").style.display = "none";
      }
      if (!check_disable()) {
        //console.log("saveButton() = ")
        setDis(false)
      }else setDis(true)
    }
    
    // console.log("checkInput() = "+checkInput())
    // console.log(("list.find() = "+!!list.find(person=>person.userName===newUser.userName)))
   // console.log((!!list.find(person => person.userName === newUser.userName) || (newUser.userName === "admin"))  && checkInput())
  }, [newUser])

  // let checkPassword = (() => {
  //   // let password = document.getElementById("passwordu")
  //    let isDisabled = document.getElementById("passwordu") ?
  //    !(document.getElementById("passwordu").checkValidity())
  //    : true
  //    // if (password && isDisabled) {
  //    //   console.log("wrong")
  //    //   password.style={}
  //    // }
  //    return isDisabled
  // })
 
  const UserRow = (props) => {
    const {
      userName,
      index
    } = props
    //console.log(props)
    //onClick={()=>deleteUser(userName)}
    return (
      <div className="user-row" key={Math.random() * (100000 - 1) + 1}>
        <div className="left">
          <p id={index}>{userName}</p>
          <button 
           id={index}
            onClick={() => {
              (document.getElementById("updateModal").style.display = "block")
              setNewUser({
                userName: userName,
                password:""
              })
              setSettings(false)
             
          }}
          >Редактировать</button>
        </div>
        <div className="right">
          <button >
            <img
              src={Delete}
              className="add"
              alt="add-button"
              width="35px"
              height="35px"
              onClick={()=>del(userName)}
            ></img>
          </button>
        </div>
      </div>
    )
  }


  return (
    <div className="admin-page-tasks">
      <div className="seach-panel" id="seach-panel">
        <div className="title ">
          <p >Пользователи</p>
        </div>
        <div className="users ">
          <input
            autocomplete="off"
            placeholder="Пользователь.."
            type="text"
            name="userName"
            value={oldUser.userName}
            onChange={changeOldUserHandler}
          />
        </div>
        <button
          id="add-task"
          onClick={() => {
            if (max !== 10) {
              (document.getElementById("createModal").style.display = "block")
              setSettings(true)
            }
            else alert("Максимальное число пользователей");
          }}
        >
          <img
            id="add-task-img"
            src={Add}
            className="add"
            width="40px"
            height="40px"
            alt="add-button"
          ></img>
        </button>
      </div>
      <div className="task-list" style={distance}>
        {oldUser.userName === ""
          ? list.map((el, index) => (
              <UserRow userName={el.userName} index={index} key={Math.random() * (100000 - 1) + 1}/>
            ))
          : list.map((el, index) =>
              el.userName.includes(oldUser.userName) ? (
                <UserRow userName={el.userName} index={index} key={Math.random() * (100000 - 1) + 1}/>
              ) : (
                <></>
              )
            )}
      </div>

      <div id="createModal" className="modal">
        <div className="modal-content" id="modal-content">
          {/* <span
            className="close"
            onClick={() =>
              (document.getElementById("myModal").style.display = "none")
            }
          >
            &times;
          </span> */}
          <div className="window-user">
            <div className="fields-user" id="window">
              <input
                autocomplete="off"
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
                autocomplete="off"
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
                {((!!list.find(person => person.userName === newUser.userName)|| newUser.userName === "admin") && newUser.userName !== "" ) &&
                (<p className="errorMessage" id="errorExistence">
                  Ошибка: пользователь с таким логином уже создан
                </p>)}
                <p className="errorMessage" id="errorLogin">
                 Логин должен содержать от 4 до 16 символов.
                </p>
              <p className="errorMessage" id="errorPassword">
                  Пароль должен содержать от 8 до 16 символов.
                  </p>
              </div>
              <input
                id='createButton'
                type="submit"
                className="addButton"
                value="Создать"
                disabled={dis}
                onClick={() => {
                  create(newUser)
                }}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div id="updateModal" className="modal">
        <div className="modal-content" id="modal-contentu">
          {/* <span
            className="close"
            onClick={() =>
              (document.getElementById("myModal").style.display = "none")
            }
          >
            &times;
          </span> */}
          <div className="window-user">
            <div className="fields-user" id="windowu">
              <input
                autocomplete="off"
                className="input-user"
                placeholder="Логин"
                type="text"
                id="userNameu"
                name="userName"
                value={newUser.userName}
                disabled={!settings}
                readOnly
              />
              <input
                autocomplete="off"
                className="input-user"
                placeholder="Пароль"
                type="text"
                id="passwordu"
                name="password"
                value={newUser.password}
                onChange={changePasswordHandler}
                required
                pattern="^.{8,16}$"
              />
              <div className="errorsBox">
              <p className="errorMessage" id="errorPasswordu">
                  Пароль должен содержать от 8 до 16 символов.
                  </p>
              </div>
              <input
                type="submit"
                id="saveButton"
                className="addButton"
                value="Сохранить"
                disabled={dis}
                onClick={() => { update(newUser) }}
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}