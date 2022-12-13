import React from "react"
import "../styles/Main.scss"
import Delete from "../icons/delete.png"

export const InfoWindow = () => {
  return (
    <div className="info-box">
      <button
        className="info-close"
        onClick={() =>
          (document.getElementById("infoModal").style.display = "none")
        }
      >
        <img
          src={Delete}
          className="add"
          alt="add-button"
          width="25px"
          height="25px"
        ></img>
      </button>
      <p className="info-title">О разработчиках</p>
      <div className="info-text">
        <p className="p2">
          «Самарский национальный исследовательский университет имени академика
          С.П. Королева (Самарский университет)»
        </p>
        <p className="p2">Институт информатики и кибернетики<br/> Кафедра программных систем</p>
        <p className="info-main p1" >
          Курсовой проект по дисциплине «Программная инженерия» по теме
          «Автоматизированная система Клавиатурный тренажер»
        </p>
        <p className="p2">
          Над проектом работали студенты группы 6415: Гвоздков С.О., Евдокимова
          В.Д., Мудрова К.Р.
        </p>
      </div>
      <p> Самара, 2022</p>
      <button className="systemButton">О системе</button>
    </div>
  )
}
