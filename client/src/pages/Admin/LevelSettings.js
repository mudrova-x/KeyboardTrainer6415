import "../../styles/Admin/LevelSettings.scss"
import React, { useEffect, useState } from "react"
import { getLevel, updateLevel } from "../../http/SettingAPI"

export const LevelSettings = () => {

  const [setting, setSetting] = useState({
    max_len: 0,
    min_len: 0,
    time: 0,
    errors: 0,
    zones: 0,
  })
  const [level, setLevel] = useState({number:1, name:"Первый"})
  
  const getLevelInfo = async (num, callback) => {
    getLevel(num).then(data => {
      setSetting({
        max_len: data.max_len,
        min_len: data.min_len,
        time: data.time,
        errors: data.errors,
        zones: data.zones
      })
      console.log(data)
      callback(num)
      console.log(setting)
    })
  }

  useEffect(() => {
   // let func = async () => { await changeLevelHandler(1) }
    let func = async () => { await changeLevelHandler(level.number??1) }
    func() 
  }, [])
  
  const changeLevel = (async (l) => {
    console.log("changeLevel " + checkFields())
    if (!checkFields()) return
    console.log(level.number)
    await updateLevel(level.number, l).then(data =>
    {
      console.log(data)
      setLevel(level.number)
      changeLevelHandler(level.number)
    }
    )
  })
  
  const checkFields = () => {
    // const min_len = document.getElementById("minLen")
    // const errors = document.getElementById("errors")
    // const zones = document.getElementById("zones")
    // const max_len = document.getElementById("maxLen")
    // const time = document.getElementById("time")
   
    // console.log({ min_len: min_len.value, errors:errors.value, zones:zones.value, max_len:max_len.value, time:time.value })

    // return min_len.checkValidity() && isInteger(min_len.value) && min_len.value >= 30 && min_len.value <= 199
    //   && errors.checkValidity() && isInteger(errors.value) && errors.value >= 1 && errors.value <= 10
    //   && zones.checkValidity() && isInteger(zones.value) && zones.value >= 1 && zones.value <= 4
    //   && max_len.checkValidity() && isInteger(max_len.value) && max_len.value >= 31 && max_len.value <= 200
    //   && time.checkValidity() && time.value >= 0.5 && time.value <= 4
      return isInteger(setting.min_len) && setting.min_len >= 30 && setting.min_len <= 199
      && isInteger(setting.errors) && setting.errors >= 1 && setting.errors <= 10
      && isInteger(setting.zones) && setting.zones >= 1 && setting.zones <= 4
      && isInteger(setting.max_len) && setting.max_len >= 31 && setting.max_len <= 200
      && setting.time >= 0.5 && setting.time <= 4
    &&setting.min_len<setting.max_len
  }
  const changeStyle = ((errorName, cardNum, valid) => {
    if (!valid) {
      document.getElementById(errorName).style.display = "block"
      document.getElementById(cardNum).className = "invalid"
    }
    else {
      document.getElementById(errorName).style.display = "none"
      document.getElementById(cardNum).className = "field-name"
    }
})
  useEffect(() => {
    const min_len = document.getElementById("minLen")
    const errors = document.getElementById("errors")
    const zones = document.getElementById("zones")
    const max_len = document.getElementById("maxLen")
    const time = document.getElementById("time")
    // console.log({
    //   check:time.checkValidity(),
    //   0.5:parseNum(time.value) >= 0.5,
    //   4:parseNum(time.value)<= 4
    // }
    // )
    console.log(setting)
    if (!(min_len.checkValidity() && min_len.value >= 30 && min_len.value <= 199)) 
      changeStyle("errorLength", "card1", false)
    else changeStyle("errorLength", "card1", true)
    if (!(errors.checkValidity() && errors.value >= 1 && errors.value <= 10))
      changeStyle("errorErrors", "card2", false)
    else changeStyle("errorErrors", "card2", true)    
      if (!(zones.checkValidity() && zones.value >= 1 && zones.value <= 4))
      changeStyle("errorZones", "card4", false)
    else changeStyle("errorZones", "card4", true)
      if (!(max_len.checkValidity() && max_len.value >= 31 && max_len.value <= 200))
      changeStyle("errorMaxLength", "card5", false)
    else changeStyle("errorMaxLength", "card5", true)  
    if (!(time.checkValidity() && parseNum(time.value) >= 0.5 && parseNum(time.value) <= 4))
    changeStyle("errorTime", "card3", false)
    else  changeStyle("errorTime", "card3", true) 
    if (parseInt(max_len.value) < parseInt(min_len.value))
      document.getElementById("errorWindow").style.display = "block"
    else 
      document.getElementById("errorWindow").style.display = "none"  
      
  }, [setting])
  
  const resetStyle = () => {
    for (let i = 1; i < 5; i++){
      let id = "button" + i
      document.getElementById(id).style.fontWeight="400"
    }
  }
  const changeSettingHandler = (event) => {
    //console.log(event)
    const target = event.target
   // console.log(target.value)
    let num
    if (target.name === "time")
      num = parseNum(target.value)
    else num = parseInt(target.value)
      if (!isNaN(num))
    setSetting({
      ...setting,
      [target.name]: num,
    })
   // console.log(setting)
   // console.log(checkFields())
  }
  const changeLevelHandler = async (n) => {
    await getLevelInfo(n,
      (num) => {
        resetStyle()
        console.log("num="+num)
    let name
    switch (num) {
      case (1): {
        name = "Первый"
        break
      }
      case (2): {
        name = "Второй"
        break
      }
      case (3): {
        name = "Третий"
        break
      }
      case (4): {
        name = "Четвертый"
        break
      }
      default: { name = "Первый" }
    }
    setLevel({ number: num, name: name })
    // console.log(level)
    checkFields("num " + num)
    let id = "button" + num
    document.getElementById(id).style.fontWeight = "800"
  })
    //req for level
  }

  return (
    <div className="level-settigs">
      <div className="level-switch">
        <p className="title">Уровень сложности</p>
        <div className="level-row">
          <button className="level-button" id="button1" onClick={()=>changeLevelHandler(1)}>
            1
          </button>
          <button className="level-button" id="button2" onClick={()=>changeLevelHandler(2)}>
            2
          </button>
          <button className="level-button" id="button3" onClick={()=>changeLevelHandler(3)}>
            3
          </button>
          <button className="level-button" id="button4" onClick={()=>changeLevelHandler(4)}>
            4
          </button>
        </div>
      </div>
      <p className="level-name">{level.name??"loading"} уровень сложности</p>
      <div className="block">
        <div className="fields">
          <div className="card" >
            <div className="field" >
              <p className="field-name" id="card1">Минимальное количество символов</p>
              <input
                // placeholder="Символов"
                type="text"
                name="min_len"
                id="minLen"
                value={setting.min_len}
                onChange={changeSettingHandler}
                required
                pattern="^[0-9]+$"
              />
            </div>
            <p className="errMessage" id="errorLength">
              Минимальное число символов в диапазоне 30..199
            </p>
          </div>
          <div className="card" >
            <div className="field" >
              <p className="field-name" id="card2">Максимальное количество ошибок</p>
              <input
                // placeholder="Колишибок"
                type="number"
                id="errors"
                name="errors"
                value={setting.errors}
                onChange={changeSettingHandler}
                required
                pattern="^[0-9]+$"
              />
            </div>
            <p className="errMessage" id="errorErrors">
              Максимальное количество ошибок в диапазоне 1..10
            </p>
          </div>

          <div className="card" >
            <div className="field">
              <p className="field-name" id="card3">Максимальное время нажатия</p>
              <input
                // placeholder="Время нажатия"
                type="number"
                id="time"
                name="time"
                value={setting.time}
                onChange={changeSettingHandler}
                step="any"
                required
                pattern="^[0-9]+(?:[\.|\,][0-9]*)?$"
              />
            </div>
            <p className="errMessage" id="errorTime">
              Максимальное время нажатия в диапазоне 0,5..4
            </p>
          </div>
          <div className="card">
            <div className="field">
              <p className="field-name"  id="card4">Количество зон для тренировки</p>
              <input
                // placeholder="Длина"
                type="number"
                id="zones"
                name="zones"
                value={setting.zones}
                onChange={changeSettingHandler}
                required
                pattern="^[0-9]+$"
              />
            </div>
            <p className="errMessage" id="errorZones">
              Максимальное количество зон в диапазоне 1..4
            </p>
          </div>
          <div className="card" >
            <div className="field">
              <p className="field-name" id="card5">Максимальное количество символов</p>
              <input
                // placeholder="Длина"
                type="number"
                id="maxLen"
                name="max_len"
                value={setting.max_len}
                onChange={changeSettingHandler}
                required
                pattern="^[0-9]+$"
              />
            </div>
            <p className="errMessage" id="errorMaxLength">
              Максимальное количество символов в диапазоне 31..200
            </p>
            <p className="errMessage" id="errorWindow">
              Максимальное количество символов должно превышать минимальное
            </p>
          </div>
              </div>
              <div className="btnPart"><button className="saveButton" id="saveBtn" onClick={()=>changeLevel(setting)}>
            Сохранить
          </button></div>
      </div>
    </div>
  )
}

function isInteger(num) {
  return (num ^ 0) === num;
}

function parseNum(num) {
  const res = num.replace(",", ".")
  console.log("parse = "+parseFloat(res))
  return parseFloat(res).toString();
}

// useEffect(() => {
//   const min_len = document.getElementById("minLen")
//   const errors = document.getElementById("errors")
//   const zones = document.getElementById("zones")
//   const max_len = document.getElementById("maxLen")
//   const time = document.getElementById("time")
//   // console.log({
//   //   check:time.checkValidity(),
//   //   0.5:parseNum(time.value) >= 0.5,
//   //   4:parseNum(time.value)<= 4
//   // }
//   // )
//   console.log(setting)
//   if (!(min_len.checkValidity() && min_len.value >= 30 && min_len.value <= 199)) {
//     changeStyle("errorLength", "card1", false)
//     // document.getElementById("errorLength").style.display = "block"
//     // document.getElementById("card1").className = "invalid"
//   }
//   else {changeStyle("errorLength", "card1", true)
//     // document.getElementById("errorLength").style.display = "none"
//     // document.getElementById("card1").className = "field-name"
//   }
//     if (!(errors.checkValidity() && errors.value >= 1 && errors.value <= 10))
//       document.getElementById("errorErrors").style.display = "block"
//     else 
//     document.getElementById("errorErrors").style.display = "none"      
//     if (!(zones.checkValidity() && zones.value >= 1 && zones.value <= 4))
//     document.getElementById("errorZones").style.display = "block"
//   else 
//     document.getElementById("errorZones").style.display = "none"   
//     if (!(max_len.checkValidity() && max_len.value >= 31 && max_len.value <= 200))
//     document.getElementById("errorMaxLength").style.display = "block"
//   else 
//     document.getElementById("errorMaxLength").style.display = "none"   
//   if (!(time.checkValidity() && parseNum(time.value) >= 0.5 && parseNum(time.value) <= 4))
//     document.getElementById("errorTime").style.display = "block"
//   else 
//     document.getElementById("errorTime").style.display = "none"   
//   if (parseInt(max_len.value) < parseInt(min_len.value))
//     document.getElementById("errorWindow").style.display = "block"
//   else 
//     document.getElementById("errorWindow").style.display = "none"  
    
// }, [setting])