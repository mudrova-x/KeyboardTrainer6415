import React from "react"
import "../styles/Main.scss"
import Delete from "../icons/delete.png"

import {FileVIKA} from "../http/mainAPI"



export const InfoWindow = () => {

    function Test() {
        let iffile = false;
        FileVIKA().then(data => {
            iffile = data.result
            console.log("iffile now " + iffile)

        })

        setTimeout(()=>{
        console.log("iffile " + iffile)
        if(iffile){

        var myWindow = document.open("", "MsgWindow", "width=1000,height=1000");

        //console.log(myWindow.document.body)
        var txtFile = new XMLHttpRequest();
        txtFile.open("GET", "../spravkaNew/Help.html", true)
        console.log(txtFile)

        txtFile.onreadystatechange = function () {
            console.log("Тут 1")
            if (txtFile.readyState === 4) {
                console.log("Тут 2")
                if (txtFile.status === 200) {
                    console.log("Тут 3")
                    let allText = txtFile.responseText;
                    //console.log(allText)

                    myWindow.document.body.innerHTML = allText;
                    //document.body.innerHTML = allText;
                }
            }
        }
        txtFile.send(null)
        }
        else {
            alert("Файл не найден")
        }
        },100)

    }
    
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
                <p className="info-main p1">
                    Курсовой проект по дисциплине «Программная инженерия» по теме
                    «Автоматизированная система Клавиатурный тренажер»
                </p>
                <p className="p2">
                    Над проектом работали обучаемые группы 6415-020302D: Гвоздков С.О., Евдокимова
                    В.Д., Мудрова К.Р.
                </p>
            </div>
            <p> Самара, 2022</p>

            <button className="systemButton" onClick={Test}>О системе</button>


        </div>
    )
}
