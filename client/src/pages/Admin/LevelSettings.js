import "../../styles/Admin/LevelSettings.scss"
import React, { useEffect, useState } from "react"

export const LevelSettings = () => {
  const [setting, setSetting] = useState({
    max_len: 0,
    min_len: 0,
    time: 0,
    errors: 0,
    zones: 0,
  })

  const changeSettingHandler = (event) => {
    const target = event.target
    setSetting({
      ...setting,
      [target.name]: target.value,
    })
  }

  return (
    <div className="level-settigs">
      <div className="level-switch">
        <p className="title">Уровень сложности</p>
        <div className="level-row">
          <button className="level-button" id="button1">
            1
          </button>
          <button className="level-button" id="button2">
            2
          </button>
          <button className="level-button" id="button3">
            3
          </button>
          <button className="level-button" id="button4">
            4
          </button>
        </div>
      </div>
      <p className="level-name">Какой-то уровень сложности</p>
      <div className="block">
        <div className="fields">
          <div className="card">
            <div className="field">
              <p className="field-name">Минимальное количество символов</p>
              <input
                // placeholder="Символов"
                type="text"
                name="minLen-field"
                id="minLen"
                value={setting.min_len}
                onChange={changeSettingHandler}
                //   required
                //   pattern="^.{4,16}$"
              />
            </div>
            <p className="errMessage" id="errorLength">
              Минимальное число символов в диапазоне 30..199
            </p>
          </div>
          <div className="card">
            <div className="field">
              <p className="field-name">Максимальное количество ошибок</p>
              <input
                // placeholder="Колишибок"
                type="number"
                id="errors"
                name="errors-field"
                value={setting.errors}
                onChange={changeSettingHandler}
              />
            </div>
            <p className="errMessage" id="errorLength">
              Максимальное количество ошибок в диапазоне 2..9
            </p>
          </div>

          <div className="card">
            <div className="field">
              <p className="field-name">Максимальное время нажатия</p>
              <input
                // placeholder="Время нажатия"
                type="number"
                id="time"
                name="time-field"
                value={setting.time}
                onChange={changeSettingHandler}
              />
            </div>
            <p className="errMessage" id="errorLength">
              Максимальное время нажатия в диапазоне 0,5..4
            </p>
          </div>
          <div className="card">
            <div className="field">
              <p className="field-name">Количество зон для тренировки</p>
              <input
                // placeholder="Длина"
                type="number"
                id="zones"
                name="zones-field"
                value={setting.zones}
                onChange={changeSettingHandler}
              />
            </div>
            <p className="errMessage" id="errorLength">
              Максимальное количество зон в диапазоне 1..4
            </p>
          </div>
          <div className="card">
            <div className="field">
              <p className="field-name">Максимальное уоличество символов</p>
              <input
                // placeholder="Длина"
                type="number"
                id="maxLen"
                name="maxLen-field"
                value={setting.max_len}
                onChange={changeSettingHandler}
              />
            </div>
            <p className="errMessage" id="errorLength">
              Максимальное количество символов в диапазоне 31..200
            </p>
          </div>
              </div>
              <div className="btnPart"><button className="saveButton" id="saveBtn">
            Сохранить
          </button></div>
      </div>
    </div>
  )
}
