import "../../styles/Admin/TaskListPage.scss"
import React, { useEffect, useState } from "react"
import Add from "../../icons/add.png"
import Delete from "../../icons/delete.png"
import {requestCreator} from "../../hook"

export const UserListPage = (props) => {
  
 // const { request } = useHttp()
  const [list, setList] = useState([{userName:"loading"}])
  const [settings, setSettings] = useState(true)
  const [oldUser, setOldUser] = useState({
    userName: "",
  })
  const [newUser, setNewUser] = useState({
    userName: "",
    password: "",
  })

  const getAllUsers = async () => {
    let usersMass = []
    console.log("getAllUsers")
    try{
    let response = await requestCreator('/api/user/getAll')
    console.log(response)
      for (var e in response) {
          if(response[e].login!=="admin")
            usersMass.push({
                    userName: response[e].login
            })
        }
        console.log(usersMass)
        setList(usersMass)
        console.log(list)
    } 
    catch (e)
    {
      console.log(e.message)
      alert("Ошибка HTTP");
    }
  }

  const createUser = async (user) => {
    console.log("createUser")
    const localUser={
      login:user.userName,
      password:user.password
    }
    try{
    let response = await requestCreator('/api/user/registration',
      'POST',
      localUser
      );
    console.log(response)
    document.getElementById("createModal").style.display = "none"
    }
    catch (e)
    {
      console.log(e.message)
    }
  }

  const updateUser = async (user) => {
    console.log("updateUser")
    try{
    let response = await requestCreator('/api/user/update',
      'POST',
      {
        login:user.userName,
        password:user.password
      }
      );
      console.log(response)

    document.getElementById("updateModal").style.display = "none"
    }
    catch (e)
    {
      console.log(e.message)
    }
  }

  const deleteUser = async (userName) => {
    let response = await requestCreator('/api/user',
        'DELETE',
       {login:userName}
      );
    console.log(response)
    getAllUsers()
  }
  
  useEffect(()=>{
    let func = async () => { await getAllUsers() }
    func() 
  }, [setList])
  
  const changeOldUserHandler = (event) => {
    console.log("userName = " + oldUser.userName)
    setOldUser({ ...oldUser, [event.target.name]: event.target.value })
  }

  const changeNewUserHandler = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value })
  }

  const changePasswordHandler = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value })
    console.log(event.target.name)
    console.log(newUser)
  }

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
    console.log("useEffect")
    if (document.getElementById("userName") && (newUser.password !== "" || newUser.userName !== "")) {
      console.log("useEffect")
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
    }
    // console.log("checkInput() = "+checkInput())
    // console.log(("list.find() = "+!!list.find(person=>person.userName===newUser.userName)))
    // console.log(checkInput()||(!!list.find(person=>person.userName===newUser.userName)))
  }, [newUser])

  let checkPassword = (() => {
    // let password = document.getElementById("passwordu")
     let isDisabled = document.getElementById("passwordu") ?
     !(document.getElementById("passwordu").checkValidity())
     : true
     // if (password && isDisabled) {
     //   console.log("wrong")
     //   password.style={}
     // }
     return isDisabled
  })
  
  const UserRow = (props) => {
    const {
      userName,
      index
    } = props
    //console.log(props)
    //onClick={()=>deleteUser(userName)}
    return (
      <div className="user-row" key={index}>
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
              onClick={()=>deleteUser(userName)}
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
            (document.getElementById("createModal").style.display = "block")
            setSettings(true)
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
              <UserRow userName={el.userName} index={index} />
            ))
          : list.map((el, index) =>
              el.userName.includes(oldUser.userName) ? (
                <UserRow userName={el.userName} index={index} />
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
              <input
                type="submit"
                className="addButton"
                value="Создать"
                disabled={checkInput()||(!!list.find(person=>person.userName===newUser.userName))}
                onClick={() => {
                  createUser(newUser)
                }}
              ></input>
            </form>
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
            <form className="fields-user" id="windowu">
              <input
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
              <input
                type="submit"
                className="addButton"
                value="Сохранить"
                disabled={checkPassword()}
                onClick={() => { updateUser(newUser) }}
              ></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
 

  //const { request } = useHttp()
  
  // const [list, setList] = useState([
  //   {
  //     userName: "Первый пользователь",
  //     password: "12345",
  //   },
  //   {
  //     userName: "Второй пользователь",
  //     password: "12345",
  //   },
  //   {
  //     userName: "Третий пользователь",
  //     password: "12345",
  //   },
  //   {
  //     userName: "Четвертый пользователь",
  //     password: "12345",
  //   },
  //   {
  //     userName: "Пятый пользователь",
  //     password: "12345",
  //   },
  // ])