import "../styles/Admin/TaskListPage.scss"
import React, { useState } from "react"
import Add from "../icons/add.png"
import Delete from "../icons/delete.png"
export const TaskListPage = (props) => {
  const list = [
    {
      name: "Первое Упражнение",
      task: "smth1",
    },
    {
      name: "Второе Упражнение",
      task: "smth2",
    },
    {
      name: "Третье Упражнение",
      task: "smth3",
    },
    {
      name: "Четвертое Упражнение",
      task: "smth4",
    },
    {
      name: "Пятое Упражнение",
      task: "smth5",
    },
  ]

  const [oldTask, setOldTask] = useState({
    taskName: "",
  })
  const [newTask, setNewTask] = useState({
    taskName: "",
    length: 0,
    level: "3",
    creationType: '1',
  })

  const changeOldTaskHandler = (event) => {
    console.log("taskName = " + oldTask)
    setOldTask({ ...oldTask, [event.target.name]: event.target.value })
  }

  const changeNewTaskHandler = (event) => {
    console.log(event.target.name)
    console.log(event.target.value)
    setNewTask({ ...newTask, [event.target.name]: event.target.value })
    console.log(newTask)
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

  // console.log(oldTask.taskName)

  // window.onclick = function(event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  //   }

  return (
    <div className="admin-page-tasks">
      <div className="seach-panel" id="seach-panel">
        <div className="title ">
          <p>Упражнения</p>
        </div>
        <div className="users ">
          <input
            placeholder="Упражнение.."
            type="text"
            id="taskName"
            name="taskName"
            value={oldTask.taskName}
            onChange={changeOldTaskHandler}
          />
        </div>
        <button
          id="add-task"
          onClick={() =>
            (document.getElementById("myModal").style.display = "block")
          }
        >
          <img
            src={Add}
            className="add"
            width="40px"
            height="40px"
            alt="add-button"
          ></img>
        </button>
      </div>
      <div className="task-list" style={distance}>
        {oldTask.taskName === ""
          ? list.map((el, index) => <TaskRow Name={el.name} index={index} />)
          : list.map((el, index) =>
              el.name.includes(oldTask.taskName) ? (
                <TaskRow Name={el.name} index={index} />
              ) : (
                <></>
              )
            )}
      </div>

      <div id="myModal" className="modal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() =>
              (document.getElementById("myModal").style.display = "none")
            }
          >
            &times;
          </span>
          <div className="window">
            <div className="fields">
              <input
                placeholder="Название"
                type="text"
                name="taskName"
                value={newTask.taskName}
                onChange={changeNewTaskHandler}
              />
              <input
                placeholder="Длина"
                type="number"
                id="length"
                name="length"
                value={newTask.length}
                onChange={changeNewTaskHandler}
              />
              <div className="select">
                <select name="level" value={newTask.level} onChange={changeNewTaskHandler}>
                  <option  value="1">Первый ур. сложности</option>
                  <option  value="2">Второй ур. сложности</option>
                  <option  value="3">Третий ур. сложности</option>
                  <option  value="4">Четвертый ур. сложности</option>
                </select>
              </div>
              <div className="button-row">
                <button
                  name="creationType"
                  className={newTask.creationType === '1' ? "black" : "white"}
                  value='1'
                  onClick={changeNewTaskHandler}
                >
                  Ручной
                </button>
                <button
                  name="creationType"
                  className={newTask.creationType === '2' ? "black" : "white"}
                  value={'2'}
                  onClick={changeNewTaskHandler}
                >
                  Авто
                </button>
                <button
                  name="creationType"
                  className={newTask.creationType === '3' ? "black" : "white"}
                  value={'3'}
                  onClick={changeNewTaskHandler}
                >
                  Файл
                </button>
              </div>
            </div>
            <div className="single-button">
              <button>Создать</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const TaskRow = (props) => {
  const { Name
    //,index
  } = props
  // console.log(Name + " --- " + index)
  return (
    <div className="task-row">
      <div className="left">
        <p>{Name}</p>
        <button>Редактировать</button>
      </div>
      <div className="right">
        <button>
          <img
            src={Delete}
            className="add"
            alt="add-button"
            width="35px"
            height="35px"
          ></img>
        </button>
      </div>
    </div>
  )
}
