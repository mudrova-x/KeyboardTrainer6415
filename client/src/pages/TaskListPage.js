import "../styles/Admin/TaskListPage.scss"
import React, { useState } from "react"
import Add from "../components/add.png"
import Delete from "../components/delete.png"
export const TaskListPage = (props) => {
  //const { list } = props

  const list = [
        {
            name: "Первое Упражнение",
            task: "smth1"
        },
        {
            name: "Второе Упражнение",
            task: "smth2"
        },
        {
            name: "Третье Упражнение",
            task: "smth3"
        },
        {
            name: "4 Упражнение",
            task: "smth4"
        },
        {
            name: "5 Упражнение",
            task: "smth5"
        }
    ]

  const [input, setInput] = useState({
    taskName: "",
  })

  const changeHandler = (event) => {
    console.log("taskName = " + input)
    setInput({ ...input, [event.target.name]: event.target.value })
  }

  return (
    <div className="admin-page-tasks">
      <div className="seach-panel">
        <div className="title ">
          <p>Упражнения</p>
        </div>
        <div className="users ">
          <input
            placeholder="Упражнение.."
            type="text"
            id="taskName"
            name="taskName"
            value={input.taskName}
            onChange={changeHandler}
          />
        </div>
        <button>
          <img
            src={Add}
                      className="add"
                      width="46px"
                      height="46px"
            alt="add-button"
          ></img>
        </button>
      </div>
      <div className="task-list">
        {list.map((el, index) => (
          <TaskRow Name={el.name} index={index} />
        ))}
      </div>
    </div>
  )
}

export const TaskRow = (props) => {
  const { Name, index } = props
  console.log(Name + " --- " + index)
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
                      width="45px"
                      height="46px"
          ></img>
        </button>
      </div>
    </div>
  )
}
