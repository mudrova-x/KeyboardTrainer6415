import "../../styles/client/UserStatistics.scss"

import React, {useContext, useEffect, useRef, useState} from "react"
import {useNavigate} from "react-router-dom"
import {InfoWindow} from "../../components/InfoWindow"
import {getStatisticUser, getUserById} from "../../http/statisticAPI";
import {AuthContext} from "../../context/auth.context";
import {fetchOneExercise} from "../../http/mainAPI";
import {Loader} from "../../components/Loader";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

import {Chart as ChartJS, CategoryScale, LinearScale, BarElement} from "chart.js";
import {Bar} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

export const options = {
    responsive: true,
}


export const UserStatistics = observer(() => {
    const {stat} = useContext(Context)
    const user = useContext(AuthContext)
    const history = useNavigate()
    const statistic = useRef([]);
    //const [statictics, setStatictics] = useState([{errors: 0}])
    const [statictics, setStatictics] = useState([{}])
    const [isLoading, setLoading] = useState(true);
    //const [userName, setUserName] = useState({login: "нет"})
    const [userName, setUserName] = useState({})

    const userRef = useRef("initialValue");
    console.log(user.userId)
    const profileHandler = (event) => {
        event.preventDefault()
        history("/")
    }

    useEffect(() => {
        getStatisticUser(user.userId).then(data => {
            stat.setStatistics2(data)
            //console.log("Присваиваем статистику")
            //console.log(stat.statistics2)
        })
    }, []);


    useEffect(() => {
        getUserById(user.userId).then(data => {
            userRef.current = data.login
            console.log(userRef.current)
        })

    }, []);





    const labels = stat.statistics2.map(statistic => statistic.exerciseId)
    const labelData = stat.statistics2.map(statistic => statistic.errors)
    const data = {
        labels,
        datasets: [
            {
                data: labelData,
                backgroundColor: "#000",
                barPercentage: 1,
                categoryPercentage: 1
            }
        ]
    };


    const HatStatistic = observer(({statistic}) => {

        //console.log(statistic.userId)

        const [length, setLength] = useState(0);
        const [exerciseBlock, setExerciseBlock] = useState({})

        useEffect(() => {
            fetchOneExercise(statistic.exerciseId).then(data => {
                setExerciseBlock(data);
                setLength(data.text.length)
            })
        }, []);

        return (
            <div className="Container-Hat-Test">
                <div className="Name-of-the-exercise-Test">{exerciseBlock.name}</div>
                <div className="Difficulty-level-name-Test">{exerciseBlock.level_num}</div>
                <div className="Characters-Test">{length}</div>
                <div className="Number-of-mistakes-Test">{statistic.errors}</div>
                <div className="Average-dialing-speed-Test">{statistic.speed.toFixed(2)}</div>
                <div className="Data-Test">{statistic.date}</div>
            </div>
        )
    })

    setTimeout(() => {
        setLoading(false)
    }, 1000)

    if (isLoading) {
        return <Loader/>
    }


    return (
        <div>

            <div className="Container-flex">
                <div className="Container-name">
                    <div className="User-Name">{userRef.current}</div>
                </div>
                <button className="Button-ref" onClick={() =>
                    (document.getElementById("infoModal").style.display = "block")}>СПРАВКА
                </button>
                <button className="Button-ref" onClick={profileHandler}>НАЗАД</button>
            </div>
            <div className="Container-Hat">
                <div className="Name-of-the-exercise">Название упражнения</div>
                <div className="Difficulty-level-name">Номер уровня сложности</div>
                <div className="Characters">Количество символов</div>
                <div className="Number-of-mistakes">Количество ошибок</div>
                <div className="Average-dialing-speed">Средняя скорость набора</div>
                <div className="Data">Дата</div>
            </div>
            <div className="container-all-test">
                {stat.statistics2.map(statistic => <HatStatistic key={statistic.id}
                                                                 statistic={statistic}>{}</HatStatistic>)}
            </div>

            <div className="Diag-num-mis">Количество ошибок</div>
            <div className="Container-Gist">
                <Bar options={options} data={data}/>
            </div>
            <div className="Diag-num-exerc">Номер упражнения</div>

            <div id="infoModal" className="modal">
                <div className="modal-content" id="modal-content">
                    <div className="window-user" style={{width: "40%", height: "78%"}}>
                        <InfoWindow/>
                    </div>
                </div>

            </div>


        </div>
    )
})
