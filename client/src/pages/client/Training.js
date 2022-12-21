import "../../styles/client/Training.scss"
import {useState, useEffect, useRef, useCallback, useContext} from "react";
import React from "react";

import tapSound from "../../sound/mixkit-single-key-type-2533 (mp3cut (mp3cut.net).wav"

import composition1 from "../../sound/comp1.mp3"
import composition2 from "../../sound/comp2.mp3"

import {fetchOneExercise, fetchDescriptionLevelVIKA, postResult} from "../../http/mainAPI"
import {setIntervalAsync, clearIntervalAsync} from 'set-interval-async/fixed';
import {useStopwatch} from "react-timer-hook";
import {useNavigate, useParams} from "react-router-dom";
import {Loader} from "../../components/Loader";
import {AuthContext} from "../../context/auth.context";

//import { existsSync } from "node:fs";

export const Training = (props) => {
    const user = useContext(AuthContext);

    const clickingSound = new Audio(tapSound);
    //const music1 = new Audio(composition1);
    //const music2 = new Audio(composition2);
    //console.log(music1)
    //const fs = require('fs')

    const music1 = useRef();
    const music2 = useRef();

    const {
        seconds,
        minutes,
        isRunnung,
        start,
        pause
    } = useStopwatch({autoStart: false})


    let nav = useNavigate()
    const startTime = Date.now();
    const {id} = useParams()

    const [exercises, setExercises] = useState({level_num: 0, text: "default"})

    const [level, setLevel] = useState({max_errors: 0, max_length: 0, max_time: 0, min_length: 0, number: 0, zones: 0});
    const startFlag = useRef(false)
    const typeСharacters = useRef(false)
    const curr = useRef(0)
    const misRef = useRef(0)
    const [end, setEnd] = useState(false)
    const [endFail, setEndFail] = useState(false)
    const [hide, setHide] = useState(false)
    const [hideAudio, setHideAudio] = useState(false)
    const timeRef = useRef(0)

    const first = [{letter: "Ё", color: 4},
        {letter: "1", color: 4},
        {letter: "2", color: 4},
        {letter: "3", color: 3},
        {letter: "4", color: 2},
        {letter: "5", color: 1},
        {letter: "6", color: 1},
        {letter: "7", color: 1},
        {letter: "8", color: 2},
        {letter: "9", color: 3},
        {letter: "0", color: 4},
        {letter: "-", color: 4},
        {letter: "=", color: 4},
    ]
    const second = [{letter: "Й", color: 4},
        {letter: "Ц", color: 3},
        {letter: "У", color: 3},
        {letter: "К", color: 1},
        {letter: "Е", color: 1},
        {letter: "Н", color: 1},
        {letter: "Г", color: 1},
        {letter: "Ш", color: 2},
        {letter: "Щ", color: 2},
        {letter: "З", color: 3},
        {letter: "Х", color: 4},
        {letter: "Ъ", color: 4},
    ]
    const third = [{letter: "Ф", color: 4},
        {letter: "Ы", color: 3},
        {letter: "В", color: 2},
        {letter: "А", color: 1},
        {letter: "П", color: 1},
        {letter: "Р", color: 1},
        {letter: "О", color: 1},
        {letter: "Л", color: 2},
        {letter: "Д", color: 3},
        {letter: "Ж", color: 4},
        {letter: "Э", color: 4},
    ]
    const fourth = [{letter: "Я", color: 4},
        {letter: "Ч", color: 3},
        {letter: "С", color: 2},
        {letter: "М", color: 1},
        {letter: "И", color: 1},
        {letter: "Т", color: 1},
        {letter: "Ь", color: 1},
        {letter: "Б", color: 2},
        {letter: "Ю", color: 3},
        {letter: ".", color: 4},
    ]

    var nowst = ""
    var checkMis = ""
    const dif = useRef(0)
    const [tail, setTail] = useState("")
    const [head, setHead] = useState("")
    const [marginNow, setmarginNow] = useState(50)
    const [spaceNow, setSpaceNow] = useState(0)
    const [currSym, setCurrSym] = useState(0)
    const [mistake, setMistake] = useState(0)
    const maxError = useRef(0)
    const allLenght = useRef(30)
    const stopExc = useRef(true)

    const [colorTrueEff, setColorTrueEff] = useState(`Audio-Effect-true`);
    const [colorFalseEff, setColorFalseEff] = useState(`Audio-Effect-false`);
    const [trueFalseEffect, setTrueFalseEffect] = useState(false)
    const [trueFalseMusic, setTrueFalseMusic] = useState(false)
    const [trueFalseComps, setTrueFalseComps] = useState(true)

    const trueFalseEffectRef = useRef(false)
    const trueFalseEffectMusic = useRef(false)
    const trueFalseEffectComps = useRef(true)
    //const [timeForCheck, setTimeForCheck] = useState(0)
    const [checkMaxTime, setcheckMaxTime] = useState(0)
    const [checkMaxTimeBOOL, setcheckMaxTimeBOOL] = useState(false)

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true)
        return () => document.removeEventListener("keydown", detectKeyDown)
    }, []);

    useEffect(() => {
        console.log("id = ", id)


        fetchOneExercise(id).then(data => {

            setTimeout(() => {

                // console.log(data)
                if (data) {
                    setExercises({text: data.text, level_num: data.level_num})
                    //  console.log(data)
                    // console.log(data.text)
                    nowst = data.text
                    checkMis = data.text
                    setHead(data.text)
                    allLenght.current = nowst.length
                    dif.current = data.level_num
                    //console.log("dif = ", dif)
                }
            }, 500)
        }).then(
            fetchDescriptionLevelVIKA(id).then(data => {
                if (data)
                    setLevel({
                        max_errors: data.max_errors,
                        max_length: data.max_length,
                        max_time: data.max_time,
                        min_length: data.max_time,
                        number: data.number,
                        zones: data.zones
                    })
                maxError.current = data.max_errors;
            }))

    }, []);


    useEffect(() => {

        if (end) {
            postResult({
                time: minutes * 60 + seconds,
                date: Date.now(),
                errors: misRef.current,
                speed: (minutes * 60 + seconds) / (1 + currSym),
                success: !endFail,
                userId: user.userId,
                exerciseId: id
            }).then(data => console.log(data))
        }


    }, [end]);

    // useEffect(() => {
    //     console.log("ААААА")
    //     if (trueFalseMusic) {
    //         if (trueFalseComps) {
    //             music1.current.play()
    //            // music2.pause()
    //         } else {
    //             music1.current.pause()
    //            // music2.play()
    //             console.log("пауза первой")
    //
    //         }
    //     } else {
    //         console.log("Пауза всего")
    //         music1.current.pause()
    //         //music2.pause()
    //     }
    //
    //
    // }, [trueFalseMusic, trueFalseComps])

    useEffect(() => {

        console.log(checkMaxTime)
        if (seconds - checkMaxTime > Math.round(level.max_time)) {
            setMistake(mistake => mistake + 1);
            misRef.current = misRef.current + 1;
            setcheckMaxTime(seconds)
        }
        if (!typeСharacters.current) {
            //console.log(startFlag)
            setMistake(0);
            misRef.current = 0;
            console.log("Зашел сюда")
        }
        if (misRef.current === maxError.current && misRef.current != 0) {
            pause()
            setEndFail(true)
            setEnd(true)
            typeСharacters.current = false
        }

    }, [seconds])

    useEffect(() => {
        setcheckMaxTime(seconds)
        //console.log("seconds = " + seconds)

    }, [checkMaxTimeBOOL])

    const detectKeyDown = useCallback((e) => {
        //console.log("Нажата клавиша")
        setcheckMaxTimeBOOL(checkMaxTimeBOOL => !checkMaxTimeBOOL)
        //console.log(checkMaxTimeBOOL)

        if (trueFalseEffectRef.current) {
            clickingSound.play()
        }

        if (e.key === nowst[curr.current] && typeСharacters.current) {

            setSpaceNow(0)
            curr.current = curr.current + 1
            let now = curr.current
            let st1 = nowst.slice(0, now)
            let st2 = nowst.slice(now, nowst.length)

            setTail(st1)
            setHead(st2)
            setCurrSym(curr.current)

            setmarginNow(marginNow => marginNow - 2.09)
            setCurrSym(curr.current)

            if (nowst[now] === " ") {
                setSpaceNow(2)
            }
        } else if ((e.code === "Space") && (startFlag.current === false)) {
            console.log(head)
            startFlag.current = true;
            typeСharacters.current = true
            start()
            //start2()
            console.log(startFlag)
            console.log(checkMis)
            setHideAudio(false)

        } else {
            if (stopExc.current && typeСharacters.current) {
                console.log("Упражнние идет")
                setMistake(mistake => mistake + 1)
                misRef.current = misRef.current + 1
            }
        }


        if ((allLenght.current - curr.current) === 0 && curr.current != 0) {
            setEnd(true)
            pause()
            //console.log(curr.current)
            // console.log(head.length)
            stopExc.current = false
            typeСharacters.current = false
        }

        if (misRef.current === maxError.current && misRef.current != 0) {
            pause()
            setEndFail(true)
            setEnd(true)
            stopExc.current = false
            typeСharacters.current = false
        }

    });


    const [length, setLength] = useState(head.length)

    useEffect(() => {
        setTimeout(() => {
            console.log("абз")
            setLength(nowst.length)
        }, 500)


    }, []);


    const [isLoading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false)
    }, 2000)

    if (isLoading) {
        return <Loader/>
    }


    const Letter = ({obj}) => {
        const [color, setColor] = useState(`Border-button Color-${obj.color}`);

        useEffect(() => {
            document.addEventListener('keypress', detectKeyDown, true)
            document.addEventListener('keyup', detectKeyUp)
        }, []);

        const detectKeyDown = (e) => {
            if (e.key === obj.letter.toLowerCase()) {
                setColor(`Border-button Color-trueColor`);
            }
        }
        const detectKeyUp = (e) => {
            setColor(`Border-button Color-${obj.color}`);
        }

        return (
            <div className={color}>

                <div className="Letter">{obj.letter}</div>
            </div>
        )
    }


    const Modal = () => {
        return (
            <div className="Modal">
                {endFail ?
                    <div className="Text-modal">ПРОВАЛЬНОЕ ПРОХОЖДЕНИЕ...</div> :
                    <div className="Text-modal">УСПЕШНОЕ ПРОХОЖДЕНИЕ!</div>
                }
                <button onClick={() => {
                    nav('/');window.location.reload(false);
                }} className="Main-page-button underline">Главная
                </button>
                <button onClick={() => {
                    window.location.reload(false)
                }} className="Repeat-button underline">Повторить
                </button>
            </div>
        )
    }

    function ChangeEffect() {
        setTrueFalseEffect(trueFalseEffect => !trueFalseEffect)
        trueFalseEffectRef.current = !trueFalseEffectRef.current
    }


    function ChangeMusic() {

        setTrueFalseMusic(!trueFalseMusic)
        //console.log("trufalseMusic = " + trueFalseMusic)

        //console.log("Включена музыка? " + trueFalseEffectMusic.current)

        setTimeout(() => {
            if (!trueFalseMusic) {
                if (trueFalseComps) {
                    music1.current.play()
                    music2.current.pause()

                }
                else{
                    music2.current.play()
                    music1.current.pause()
                }

            } else {
                music1.current.pause()
                music2.current.pause()
            }
        }, 100)

    }

    function OffMusic() {
        //music1.current.pause()
    }

    function ChangeComps() {
        setTrueFalseComps(!trueFalseComps)
        //trueFalseEffectComps.current = !trueFalseEffectComps.current
        setTimeout(() => {
        if(!trueFalseComps && trueFalseMusic){
            music1.current.play()
            music2.current.pause()
        }
        else if(trueFalseComps && trueFalseMusic){
            music2.current.play()
            music1.current.pause()
        }
        }, 100)
    }

    function PlayMusic() {
        //console.log("Так можно")
        //music1.current.play()
    }

    const ModalAudio = () => {

        return (

            <>
                <div className="Container-Audio">
                    <div className="Container-Audio-text-Effect">Звуковые эффекты</div>
                    <div className="Container-Audio-line">
                        <div className={trueFalseEffect ? colorTrueEff : colorFalseEff} onClick={ChangeEffect}
                             style={{cursor: "pointer"}}>Вкл
                        </div>
                        <div className="Audio-Effect-trait">/</div>
                        <div className={trueFalseEffect ? colorFalseEff : colorTrueEff} onClick={ChangeEffect}
                             style={{cursor: "pointer"}}>Выкл
                        </div>
                    </div>
                    <div className="Container-Audio-text-Effect">Музыка</div>
                    <div className="Container-Audio-line">
                        <div className={trueFalseMusic ? colorTrueEff : colorFalseEff} onClick={() => {
                            ChangeMusic()
                        }}
                             style={{cursor: "pointer"}}>Вкл
                        </div>
                        <div className="Audio-Effect-trait">/</div>
                        <div className={trueFalseMusic ? colorFalseEff : colorTrueEff} onClick={() => {
                            ChangeMusic()
                        }}
                             style={{cursor: "pointer"}}>Выкл
                        </div>
                    </div>
                    <div className="Container-Audio-text-Effect">Выбор музыкального сопровождения</div>
                    <div className="Container-Audio-line">
                        <div className={trueFalseComps ? colorTrueEff : colorFalseEff} onClick={ChangeComps}
                             style={{cursor: "pointer"}}>Композиция 1
                        </div>
                        <div className="Audio-Effect-trait">/</div>
                        <div className={trueFalseComps ? colorFalseEff : colorTrueEff} onClick={ChangeComps}
                             style={{cursor: "pointer"}}>Композиция 2
                        </div>
                    </div>
                </div>
            </>
        )
    }


    function Hide() {
        setHide(!hide)
        if (hide) {
            console.log("Открыто")
        } else {
            console.log("Скрыто")
        }

    }

    function HideAudio() {
        setHideAudio(!hideAudio)
        if (hideAudio) {
            console.log("Открыто аудио")
        } else {
            console.log("Скрыто аудио")
        }

    }


    const StartTest = () => {


        const [st, setSt] = useState("Нажмите пробел")

        return (
            <div>


                <div className="Container">
                    <div className="Container-characteristic">
                        <div className="Number-symbol">Количество символов:</div>
                        <div className="Symbol">{currSym}/{exercises.text.length}</div>
                        <div className="Number-symbol">Количество ошибок:</div>
                        <div className="Symbol">{mistake}/{level.max_errors}</div>
                        <div className="Number-symbol">Таймер:</div>
                        <div type="text" className="Symbol" key={"133423423"}>{minutes}:{seconds}</div>
                        <div className="Number-symbol">Средняя скорость набора:</div>
                        <div
                            className="Symbol">{startFlag.current && curr.current > 0 ? ((minutes * 60 + seconds) / currSym).toFixed(2) : 0}</div>
                    </div>
                </div>

                <div>
                    <div className="Container-Start-Text-training">
                        <div className="Tail-text"
                             style={{margin: "0vw " + spaceNow + "vw 0vw " + marginNow + "vw"}}>{tail}</div>
                        <div className="Head-text">{startFlag.current ? head : st}</div>
                    </div>

                </div>

            </div>

        )
    }


    return (
        <div>
            <audio ref={music1} src={composition1} loop/>
            <audio ref={music2} src={composition2} loop/>

            <StartTest/>

            {
                hide ?
                    <></>
                    :
                    <div>
                        <div className="First-layer" style={{margin: "5vh 0vh 0vh 10vw"}}>
                            {first.map(first => <Letter key={first.letter} obj={first}/>)}
                            <div className="Back-button">
                                <div className="Back">BACK</div>
                            </div>
                        </div>
                        <div className="First-layer">
                            <div className="Back-button">
                                <div className="Back">TAB</div>
                            </div>
                            {second.map(second => <Letter key={second.letter} obj={second}/>)}
                            <div className="Border-button Color-4">
                                <div className="Letter">&#92;</div>
                            </div>
                        </div>
                        <div className="First-layer">
                            <div className="Third-button">
                                <div className="Third">BACK</div>
                            </div>
                            {third.map(third => <Letter key={third.letter} obj={third}/>)}
                            <div className="Third-button">
                                <div className="Third">BACK</div>
                            </div>
                        </div>
                        <div className="First-layer">
                            <div className="Shift-button">
                                <div className="Shift">SHIFT</div>
                            </div>
                            {fourth.map(fourth => <Letter key={fourth.letter} obj={fourth}/>)}
                            <div className="RShift-button">
                                <div className="RShift">R. SHIFT</div>
                            </div>
                        </div>
                    </div>
            }

            <div className="Special-layer">
                {startFlag.current ?
                    <div className="Hide-button" style={{"border-color": "#838383"}}>
                        <div className="Hide" style={{color: "#838383"}}>СКРЫТЬ</div>
                    </div>

                    :
                    <div className="Hide-button" onClick={Hide} style={{cursor: "pointer"}}>
                        <div className="Hide">СКРЫТЬ</div>
                    </div>
                }

                <div className="Space"></div>

                {startFlag.current ?
                    <div className="Audio-button" style={{"border-color": "#838383"}}>
                        <div className="Audio" style={{color: "#838383"}}>АУДИО</div>
                    </div>
                    :
                    <div className="Audio-button">
                        <div className="Audio" onClick={HideAudio} style={{cursor: "pointer"}}>АУДИО</div>
                    </div>
                }

            </div>


            {end ?
                <Modal/>
                :
                <div></div>
            }

            {hideAudio ?
                <ModalAudio/>
                : <div></div>
            }


        </div>


    )
}