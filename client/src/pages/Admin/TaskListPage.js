import "../../styles/Admin/TaskListPage.scss"
import React, { useEffect, useState } from "react"
import Add from "../../icons/add.png"
import Delete from "../../icons/delete.png"
//import { CheckZone, Decode } from "../../components/FrontFunctions"
import * as functions from "../../components/FrontFunctions"
import {  getAllExercises, createTask, deleteEx } from "../../http/exerciseAPI";
import { fetchDescriptionLevel} from "../../http/mainAPI";

export const TaskListPage = (props) => {
  const [list, setList] = useState([
    {
      name: "loading",
      task: "",
    }
  ])
  const [oldTask, setOldTask] = useState({
    taskName: "",
  })
  const [settings, setSettings] = useState(true)
  const [newTask, setNewTask] = useState({
    taskName: "",
    length: 0,
    level: "3",
    creationType: "2",
    taskText: "",
  })
  const [level, setLevel] = useState({max_length: 0, min_length: 0,number: 0})
  const [windowMode, setWindowMode] = useState("0")

  useEffect(() => {
    console.log("use " + newTask.creationType)

    if (newTask.creationType === "1") setWindowMode("1")
    if (newTask.creationType === "3") setWindowMode("2")
    if (newTask.creationType === "2") setWindowMode("0")
    console.log(windowMode)
  }, [newTask.creationType, windowMode])

  const getAll = async () => {
    let mass = []
    //console.log("getAll")
    getAllExercises().then(data => {
      //console.log(data)
      for (var e in data) {
      mass.push({
        name: data[e].name,
        task: data[e].text
          })
      }
     // console.log(mass)
      setList(mass)
    })
  }
  useEffect(()=>{
    let func = async () => { await setLevel(1) }
    func() 
  }, [])
  useEffect(()=>{
    let func = async () => { await getAll() }
    func() 
  }, [setList])

  useEffect(() => { 
    console.log(newTask.taskName)
    console.log(list)
    console.log(!!list.find(ex => ex.name === newTask.taskName) && (newTask.taskName !== ""))
    if (!!list.find(ex => ex.name === newTask.taskName) && (newTask.taskName !== ""))
    {
      console.log(newTask.taskName)
      document.getElementById("errorExExistence").style.display = "block"
    }
    else 
      document.getElementById("errorExExistence").style.display = "none"
    if (document.getElementById("errorName")&&newTask.taskName!=="")
    {
      //console.log(document.getElementById("taskName").checkValidity())
      if (!document.getElementById("taskName").checkValidity())
       document.getElementById("errorName").style.display = "block"
    else
        document.getElementById("errorName").style.display = "none"
    }
    if (newTask.length>0) document.getElementById("errorLength").style.display = "none"
  }, [newTask])

  const openFile = async function(callback){
    let reader = new FileReader()
    reader.readAsArrayBuffer(document.getElementById('fileInput').files[0])
    reader.onload = function () {
         console.log(reader)
        console.log(reader.result)
        console.log({
        length:newTask.length,
        level:newTask.level,
        r:reader.result
        })
      let text = null
      text = functions.Decode(newTask.length,newTask.level, reader.result)
      if (!checkFields() && text &&text!=="") {
        document.getElementById("errorFile").style.display = "none"
        setNewTask({ ...newTask, taskText: text })
        console.log("newTask")
        console.log(newTask)
        callback(text)
      }
      if (!text||text!=="") document.getElementById("errorFile").style.display = "block"
    }
    reader.onerror = function() {
      console.log("error: " + reader.error)
      return ''
  }
  }
  
  const checkFields = (() => {
    //let text = ''
   // let file = true
    console.log("newTask.creationType "+newTask.creationType)
    
   // if (newTask.creationType !== "3") file = false
    const name = !document.getElementById("taskName").checkValidity()
    if(name)
      document.getElementById("errorName").style.display = "block"
    const length = !(newTask.length >= level.min_length && newTask.length <= level.max_length)
    console.log("length " + newTask.length >= level.min_length)
    console.log("length " + newTask.length <= level.max_length)
    console.log( "length " + newTask.length >= level.min_length && newTask.length <= level.max_length)
    if(length)
      document.getElementById("errorLength").style.display = "block"
    let zone = false
    if (newTask.creationType === "1" && functions.CheckZone(newTask.taskText, newTask.level) < 0) {
      document.getElementById("errorText").style.display = "block"
      zone=true
    }
      console.log({
        name: name,
        length: length,
        zone:zone
      })
   const desabled = name || length || zone
   return desabled
    
  })

const tryToCreate = () => {
  const t =  checkFields()
  console.log("createTask " + !t)
  console.log("newTask.creationType " + !newTask.creationType)
  if (!t&&newTask.creationType === "3" && document.getElementById("fileInput").value.endsWith(".lern"))
    openFile((data) => {
      console.log("callback funck " + data)
      console.log(newTask)
      create({
        taskName: newTask.taskName,
        length: newTask.length,
        level: newTask.level,
        creationType: newTask.creationType,
        taskText: data,
      })
    })
  if (!t && newTask.creationType === "2")
  {
    console.log("AutoCreate")
    const text = functions.AutoCreate(newTask.length, newTask.level)
    setNewTask({ ...newTask, taskText: text })
    console.log(newTask)
    create({
       taskName: newTask.taskName,
       length: newTask.length,
        level: newTask.level,
         creationType: newTask.creationType,
        taskText: text,
       })
   }
  if (!t&&newTask.creationType !== "3"&&newTask.creationType !== "2") create(newTask)
}

  const create = async (ex) => {
    console.log("create")
    createTask(ex.taskName,ex.level, ex.taskText).then(data => {
      console.log(data)
      document.getElementById("myModal").style.display = "none"
      getAll()
    })
    
  }
  const changeLevel = ((level) => {
    console.log("changeLevel")
    fetchDescriptionLevel(level).then(data =>
    {
            console.log(data)
            if(data)setLevel({
                max_length: data.max_length,
                min_length: data.min_length,
                number:level,
            })
        }
    )
})
const del = async (userName) => {
  deleteEx(userName).then(data => {
    console.log(data)
    getAll()
  })
}
  
  const changeOldTaskHandler = (event) => {
 //   console.log("taskName = " + oldTask)
    setOldTask({ ...oldTask, [event.target.name]: event.target.value })
  }

  const changeNewTaskHandler = (event) => {
    const target = event.target
    if (target.name === "level") changeLevel(target.value)
    if (newTask.creationType === "1" && (target.name === "taskText" || target.name === "level")) {
      setNewTask({
        ...newTask,
        [target.name]: target.value,
        length: target.name === "level" ?newTask.taskText.length:target.value.length,
      })
      console.log(newTask.taskText.length)
      if (functions.CheckZone(target.name === "level" ? newTask.taskText : target.value,
      target.name === "level" ?target.value:newTask.level) < 0) {
        document.getElementById("task-text-field").style.color = "red"
        document.getElementById("single-button").disabled = true
        console.log("ошибка набора")
      }
      else {
        document.getElementById("task-text-field").style.color = "black"
        document.getElementById("single-button").disabled = false
      }
      
    }
    else {
     // if (event.target.name === "taskText")
        
      setNewTask({ ...newTask, [target.name]: target.value })
    }
    console.log("event.target.name"+target.name)
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
 
  const selectFile = ((event) => {
    document.getElementById("errorFile").style.display = "none"
    console.log(event)
    //console.log(event.files)
    if (event) {
      if (!event.target.value.endsWith(".lern")) {
        document.getElementById("fileInput").style.color = "red"
        document.getElementById("errorType").style.display = "block"
      }
      else {
        document.getElementById("fileInput").style.color = "black"
        document.getElementById("errorType").style.display = "none"
      }
    }
    console.log(document.getElementById("fileInput").value)

  })

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

  // window.onclick = function (event) {
  // //  console.log(document.getElementById("myModal").style.display)
  //     //console.log(event.target)

  //   if (
  //     event.target === document.getElementById("modal-row")
  //   ) {
  //     document.getElementById("myModal").style.display = "none"
  //   }
  // }
  const TaskRow = (props) => {
    const {
      Name,
      //,index
    } = props
   //  console.log(Name + " --- ")
    return (
      <div className="task-row">
        <div className="left">
          <p>{Name}</p>
          <button>Редактировать</button>
        </div>
        <div className="right" >
          <button onClick={()=>del(Name)}>
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
            id="taskNames"
            name="taskName"
            value={oldTask.taskName}
            onChange={changeOldTaskHandler}
          />
        </div>
        <button
          id="add-task"
          onClick={() => {
            setSettings(true)
            (document.getElementById("myModal").style.display = "block")
          }
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
                id="taskName"
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
                  <div className="block"><input
                    id="fileInput"
                    type="file"
                    name="taskText"
                    value={fileTask}
                    onChange={(value) => (selectFile(value))}
                    accept=".lern"
                  /></div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="errorsBox">
                <p className="errorMessage" id="errorExExistence">
                  Ошибка: упражнение с таким названием уже создано
                </p>
                <p className="errorMessage" id="errorName">
                 Название должно содержать от 4 до 16 символов.
                </p>
              <p className="errorMessage" id="errorLength">
                Длина упражнения должна быть от {level.min_length} до {level.max_length} символов  
              </p>
              <p className="errorMessage" id="errorText">
                  Текст не соответствует уровню.
              </p>
              <p className="errorMessage" id="errorType">
                  Неверный формат файла.
              </p>
              <p className="errorMessage" id="errorFile">
                  Ошибка файла.
              </p>
              </div>
            <div className="single-button">
              <input
                type="submit"
                className="addButton"
                value="Создать"
                id = "single-button"
                onClick={() => {
                  tryToCreate(newTask)
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

// export const TaskRow = (props) => {
//   const {
//     Name,
//     //,index
//   } = props
//  //  console.log(Name + " --- ")
//   return (
//     <div className="task-row">
//       <div className="left">
//         <p>{Name}</p>
//         <button>Редактировать</button>
//       </div>
//       <div className="right" onClick={del(Name)}>
//         <button>
//           <img
//             src={Delete}
//             className="add"
//             alt="add-button"
//             width="35px"
//             height="35px"
//           ></img>
//         </button>
//       </div>
//     </div>
//   )
// }
