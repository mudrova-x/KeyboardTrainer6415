import "../styles/Admin/TaskListPage.scss"
import React, { useEffect, useState } from "react"
import Add from "../icons/add.png"
import Delete from "../icons/delete.png"
import { CheckZone } from "../components/FrontFunctions"

export const TaskListPage = (props) => {
  const [list, setList] = useState([
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
  ])

  const [oldTask, setOldTask] = useState({
    taskName: "",
  })

  const [newTask, setNewTask] = useState({
    taskName: "",
    length: 0,
    level: "3",
    creationType: "0",
    taskText: "",
  })

  const CreateTask = (newTaskTest) => {
    //  console.log("newTaskTest")
    console.log({name: newTaskTest.taskName,
      task: newTaskTest.taskText})
    setList(
      list.concat(
        {
      name: newTaskTest.taskName,
      task: newTaskTest.taskText,
        }
      ))
    console.log(list)
    setNewTask({
      taskName: "",
      length: 0,
      level: "3",
      creationType: "0",
      taskText: "",
    })
    setWindowMode("0")
    document.getElementById("myModal").style.display = "none"
  }

  const changeOldTaskHandler = (event) => {
 //   console.log("taskName = " + oldTask)
    setOldTask({ ...oldTask, [event.target.name]: event.target.value })
  }

  const changeNewTaskHandler = (event) => {
    if (newTask.creationType === "1" && event.target.name === "taskText")
    {
      setNewTask({
        ...newTask,
        [event.target.name]: event.target.value,
        length: event.target.value.length,
      })
      if (CheckZone(event.target.value, newTask.level) < 0) {
        document.getElementById("task-text-field").style.color = "red"
        document.getElementById("single-button").disabled = true
        console.log("хрень!")
      }
      else {
        document.getElementById("task-text-field").style.color = "black"
        document.getElementById("single-button").disabled = false
      }
    }
      
    // console.log(event.target.name)
    // console.log(event.target.value)
    else setNewTask({ ...newTask, [event.target.name]: event.target.value })
   // console.log(newTask)
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
 
  const [windowMode, setWindowMode] = useState("0")

  useEffect(() => {
    console.log("use " + newTask.creationType)

    if (newTask.creationType === "1") setWindowMode("1")
    if (newTask.creationType === "3") setWindowMode("2")
    if (newTask.creationType === "2") setWindowMode("0")
    console.log(windowMode)
  }, [newTask.creationType, windowMode])

  let fileTask

  let a = (windowMode === "1") ?
    {
      margin: '0',
      borderRight: '2.5px black solid',
      marginTop: '2%'
    } :
    {
      width: '50 %',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '2 %'
}
  //console.log(a)

  window.onclick = function (event) {
  //  console.log(document.getElementById("myModal").style.display)
      //console.log(event.target)

    if (
      event.target === document.getElementById("modal-row")
    ) {
      document.getElementById("myModal").style.display = "none"
    }
  }

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
{/* передалать на форму блок - выбрасывает при нажатии на кнопку выбора закполнения */}
      <div id="myModal" className="modal">
        <div id="modal-row" className="modal-row">
          <div className="window"
            style={a}
          >
            <div className="fields">
              <input
                placeholder="Название"
                type="text"
                name="taskName"
                value={newTask.taskName}
                onChange={changeNewTaskHandler}
                required
                pattern="^.{4,16}$"
                
              />
              <input
                placeholder="Длина"
                type="number"
                id="length"
                name="length"
                value={
                  newTask.creationType === "1"
                    ? newTask.taskText.length
                    : newTask.length
                }
                disabled={newTask.creationType === "1" ? true : false}
                onChange={changeNewTaskHandler}
                
              />
              <div className="select">
                <select
                  name="level"
                  value={newTask.level}
                onChange={changeNewTaskHandler}
                
                >
                  <option value="1">Первый ур. сложности</option>
                  <option value="2">Второй ур. сложности</option>
                  <option value="3">Третий ур. сложности</option>
                  <option value="4">Четвертый ур. сложности</option>
                </select>
              </div>
              <div className="button-row">
                <button
                  name="creationType"
                  className={newTask.creationType === "1" ? "black" : "white"}
                  value="1"
                  onClick={changeNewTaskHandler}
                >
                  Ручной
                </button>
                <button
                  name="creationType"
                  className={newTask.creationType === "2" ? "black" : "white"}
                  value={"2"}
                  onClick={changeNewTaskHandler}
                >
                  Авто
                </button>
                <button
                  name="creationType"
                  className={newTask.creationType === "3" ? "black" : "white"}
                  value={"3"}
                  onClick={changeNewTaskHandler}
                >
                  Файл
                </button>
              </div>
              {windowMode === "2" ? (
                <div className="file-field">
                  <input
                    type="file"
                    name="taskText"
                    value={fileTask}
                    onChange={(value) => (fileTask = value)}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="single-button">
              <input
                type="submit"
                className="addButton"
                value="Создать"
                id = "single-button"
                onClick={() => {
                  CreateTask(newTask)
                }}
              >
              </input>
            </div>
          </div>
          {windowMode === "1" ? (
            <div className="task-text-field">
              <textarea
                name="taskText"
                id="task-text-field"
                rows="4"
                cols="30"
                value={newTask.taskText}
                onChange={changeNewTaskHandler}
                placeholder="Текст упражнения.."
              >
                {" "}
              </textarea>
            </div>
          ) : (
            <></>
          )}</div>
      </div>
    </div>
  )
}

export const TaskRow = (props) => {
  const {
    Name,
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
