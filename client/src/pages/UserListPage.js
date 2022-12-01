import "../styles/Admin/TaskListPage.scss"
import React, { useState } from "react"
import Add from "../icons/add.png"
import Delete from "../icons/delete.png"
import { useHttp } from "../http.hook";
import {getAllUsers} from "../UserAPI"
export const UserListPage = (props) => {

  const { request } = useHttp()
  
  const [list, setList] = useState([
    {
      userName: "Первый пользователь",
      password: "12345",
    },
    {
      userName: "Второй пользователь",
      password: "12345",
    },
    {
      userName: "Третий пользователь",
      password: "12345",
    },
    {
      userName: "Четвертый пользователь",
      password: "12345",
    },
    {
      userName: "Пятый пользователь",
      password: "12345",
    },
  ])

  const [settings, setSettings] = useState(true)

  const [oldUser, setOldUser] = useState({
    userName: "",
  })

  const [newUser, setNewUser] = useState({
    userName: "",
    password: "",
  })

  const changeOldUserHandler = (event) => {
    //console.log("userName = " + oldUser)
    setOldUser({ ...oldUser, [event.target.name]: event.target.value })
  }

  const changeNewUserHandler = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value })

    // console.log(event.target.name)
    // console.log(event.target.value)
    //console.log(newUser)
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
  //   //   document.getElementById("myModal").style.display = "none"
  //   // }
  // }

  let isDisabled =
    document.getElementById("password") && document.getElementById("userName")
      ? !(
          document.getElementById("password").checkValidity() &&
          document.getElementById("userName").checkValidity()
        )
      : true

 

  const CreateUser = () => {
    console.log("newUser")
    //console.log(user)
    // if (user.userName !== "" && user.password !== "")
    //   setList(
    //     list.concat({
    //       userName: user.userName,
    //       password: user.password,
    //     })
    // )

    console.log(list)
    setNewUser({
      userName: "",
      password: "",
    })
    document.getElementById("createModal").style.display = "none"
  }

  // const UpdateUser = (user) => {
  //   console.log("UpdateUser")
  //   console.log(user)
  //   if (user.userName !== "" && user.password !== "")
  //     setList(
  //       list.concat({
  //         userName: user.userName,
  //         password: user.password,
  //       })
  //   )

  //   console.log(list)
  //   setNewUser({
  //     userName: "",
  //     password: "",
  //   })
  //   document.getElementById("myModal").style.display = "none"
  // }


  const UserRow = (props) => {
    const {
      userName,
      index
    } = props
    //console.log(props)
    return (
      <div className="user-row">
        <div className="left">
          <p id={index}>{userName}</p>
          <button id={index}>Редактировать</button>
        </div>
        <div className="right">
          <button>
            <img
              src={Delete}
              className="add"
              alt="add-button"
              width="35px"
              height="35px"
              // onClick={()=>DeleteUser()} надо делать запрос/изменять состояние через глобальный метод
            ></img>
          </button>
        </div>
      </div>
    )
  }


// (document.getElementById("createModal").style.display = "block")
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
          onClick={() =>getAllUsers()
            
          }
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

      <div id="myModal" className="modal">
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
                disabled={!settings}
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
                disabled={isDisabled}
                onClick={() => {
                  CreateUser(newUser)
                }}
              ></input>
            </form>
          </div>
        </div>
      </div>

      <div id="updateModal" className="modal">
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
                disabled={!settings}
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
                disabled={isDisabled}
                onClick={() => {
                  CreateUser(newUser)
                }}
              ></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
 
