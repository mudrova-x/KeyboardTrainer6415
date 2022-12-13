import "../../styles/client/Training.scss"
import {useState, useEffect, useRef} from "react";
import React from "react";

import {fetchOneExercise, fetchDescriptionLevel} from "../../http/mainAPI"


export const Training = (props) => {


    const [exercises, setExercises] = useState({text: "default"})

    const [level, setLevel] = useState({max_errors: 0, max_length: 0, max_time: 0, min_length: 0, number: 0, zones: 0});
    const [maxSymbol, setmaxSymbol] = useState(0)
    const startFlag = useRef(false)
    const curr = useRef(0)
    const [correctCharacter, setCorrectCharacter] = useState(false)
    const [end, setEnd] = useState(false)
    const [hide, setHide] = useState(false)
    const [ples, setPlease] = useState(0)
    const [seconds, setSeconds] = useState(0);


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
    const [tail, setTail] = useState("")
    const [head, setHead] = useState("")
    const [marginNow, setmarginNow] = useState(50)
    const [spaceNow, setSpaceNow] = useState(0)



    useEffect(() => {


        fetchOneExercise(1).then(data => {
            if (data) {
                setExercises({text: data.text})
                console.log(data.text)
                nowst = data.text
                setHead(data.text)
            }
        }).then(
            fetchDescriptionLevel(1).then(data => {
                if (data)
                    setLevel({
                        max_errors: data.max_errors,
                        max_length: data.max_length,
                        max_time: data.max_time,
                        min_length: data.max_time,
                        number: data.number,
                        zones: data.zones
                    })

            }))


        //console.log(exercises)

    }, []);



    // useEffect( ()=>{
    //     Test();
    //
    // }, [flag])


    const [length, setLength] = useState(head.length)

    useEffect(() => {
        setTimeout(() => {
            console.log("абз")
            setLength(nowst.length)
        },500)

    }, []);

    const Timer = () => {

        //const [seconds, setSeconds] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                startFlag.current && !end &&
                    setSeconds(seconds => seconds + 1);

            }, 1000);
            return () => clearInterval(interval);
        }, []);

        // if(end) {
        //     console.log(seconds)
        //
        //     setTime(seconds)
        // }

        return (
            <div type="text" className="Symbol">{seconds}</div>
        )
    }




    const Letter = ({obj}) => {
        const [color, setColor] = useState(`Border-button Color-${obj.color}`);

        useEffect(() => {
            document.addEventListener('keypress', detectKeyDown, true)
            document.addEventListener('keyup', detectKeyUp)
        }, []);

        const detectKeyDown = (e) => {
            //console.log(e.key)
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

    /*const Train = () => {

        const [start, setStart] = useState("Нажмите пробел, чтобы начать упражнение")

        useEffect(() => {
            document.addEventListener('keypress', detectKeyDown, true)
        }, []);

        const st = exercises.text
        var curr = 0

        const [tail, setTail] = useState("")
        const [head, setHead] = useState(st)
        const [marginNow, setmarginNow] = useState(50)


        const detectKeyDown = (e) => {
            if (e.code === "Space") {
                setStart(exercises.text)
                setFlag(!flag)

            }

            if (e.key === st[curr]) {

                curr = curr + 1
                const st1 = st.slice(0, curr)
                const st2 = st.slice(curr, st.length)
                setTail(st1)
                setHead(st2)
                //console.log("tail = ", tail)
                //console.log("head = ", head)
                //console.log(st1)
               //console.log(st2)
                setmarginNow(marginNow => marginNow - 2.09)
                //setCurrSym(currSym => marginNow - 2.09)
                //console.log("Я тут все ненавижу")
            }

            // if(curr === st.length){
            //     console.log("ffff")
            //     setFlag(false)
            // }

        }

        return (
            <>
                {flag
                    ?
                    <div>
                        <div className="Container-Start-Text-training">
                            <div className="Tail-text" style={{margin: "0vw 0vw 0vw " + marginNow + "vw"}}>{tail}</div>

                            <div className="Head-text">{head}</div>
                        </div>

                    </div>

                    :
                    <div className="Container-Text-training">
                        <div className="Text-training">{start}</div>
                    </div>

                }
            </>
        )
    }*/


    /*const СharacterSet = () => {
        const [currSym, setCurrSym] = useState(0)


        useEffect(() => {
            document.addEventListener('keypress', detectKeyDown, true)
        }, []);

        const st = exercises.text
        let curr = 0

        const detectKeyDown = (e) => {
            if (e.key === st[curr]) {
                curr = curr + 1
                setCurrSym(curr)
                console.log("Я тут считаю символы")
            }

            if (curr === st.length) {
                setEnd(true)
            }

        }

        return (
            <div className="Symbol">{currSym}/{exercises.text.length}</div>
        )
    }*/

    // function Test(){
    //
    //
    // }
    const Modal = () =>{
        console.log()


        return(
            <div className="Modal">
                <div className="Text-modal">УСПЕШНОЕ ПРОХОЖДЕНИЕ!</div>
                <button className="Main-page-button underline">Главная</button>
                <button className="Repeat-button underline">Повторить</button>
            </div>
        )
    }

    function Hide(){
        setHide(!hide)
        if(hide){
            console.log("Открыто")
        }
        else {
            console.log("Скрыто")
        }

    }


    const StartTest = () =>{


        const [st, setSt] = useState("Нажмите пробел")

        useEffect(() => {
            document.addEventListener('keydown', detectKeyDown, true)
        }, []);

        const [currSym, setCurrSym] = useState(0)


        const detectKeyDown = (e) => {
            console.log("Нажата клавиша")

            if (e.key === nowst[curr.current]) {

                setSpaceNow(0)

                curr.current = curr.current + 1
                let now = curr.current
                let st1 = nowst.slice(0, now)
                let st2 = nowst.slice(now, nowst.length)

                setTail(st1)
                setHead(st2)

                setmarginNow(marginNow => marginNow - 2.09)
                setCurrSym(curr.current)
                if(nowst[now] === " "){
                    //console.log("Пробел")
                    setSpaceNow(2)
                }
            }
            else if ((e.code === "Space") && (startFlag.current === false)){
                console.log("ыафыаыуа")
                //setmarginNow(50)
                //setHead(nowst)
                console.log(head)
                startFlag.current = true;
                console.log(startFlag)

            }

            if((length - curr.current) === 0 && curr.current != 0){
                setEnd(true)
                console.log(curr.current)
                console.log(head.length)
            }

        }

        return(
            <div>

            <div className="Container">
                <div className="Container-characteristic">
                    <div className="Number-symbol">Количество символов:</div>
                    <div className="Symbol">{currSym}/{exercises.text.length}</div>
                    <div className="Number-symbol">Количество ошибок:</div>
                    <div className="Symbol">0/{level.max_errors}</div>
                    <div className="Number-symbol">Таймер:</div>
                    <Timer/>
                    <div className="Number-symbol">Средняя скорость набора:</div>
                    <div className="Symbol">2.1с</div>
                </div>
            </div>

            <div>
                <div className="Container-Start-Text-training">
                    <div className="Tail-text" style={{margin: "0vw " + spaceNow +"vw 0vw " + marginNow + "vw"}}>{tail}</div>
                    <div className="Head-text">{startFlag.current?head:st}</div>
                </div>

            </div>


                {/*<div className="Container-Text-training">
                <div className="Text-training">{start}</div>
            </div>*/}
            </div>



        )
    }

    return (
        <div>

            {/*<div className="Container">

                <div className="Container-characteristic">
                    <div className="Number-symbol">Количество символов:</div>
                    {<СharacterSet/>}
                    <div className="Number-symbol">Количество ошибок:</div>
                    <div className="Symbol">0/{level.max_errors}</div>
                    <div className="Number-symbol">Таймер:</div>
                    {<Timer/>}
                    <div className="Number-symbol">Средняя скорость набора:</div>
                    <div className="Symbol">2.1с</div>
                </div>
            </div>

            <Train/>*/}
            <StartTest/>



            {
                hide?
                    <></>
                :
                    <div>
                        <div className="First-layer">
                            {first.map(first => <Letter obj={first}/>)}
                            <div className="Back-button">
                                <div className="Back">BACK</div>
                            </div>
                        </div>
                        <div className="First-layer">
                            <div className="Back-button">
                                <div className="Back">TAB</div>
                            </div>
                            {second.map(second => <Letter obj={second}/>)}
                            <div className="Border-button Color-4">
                                <div className="Letter">&#92;</div>
                            </div>
                        </div>
                        <div className="First-layer">
                            <div className="Third-button">
                                <div className="Third">BACK</div>
                            </div>
                            {third.map(third => <Letter obj={third}/>)}
                            <div className="Third-button">
                                <div className="Third">BACK</div>
                            </div>
                        </div>
                        <div className="First-layer">
                            <div className="Shift-button">
                                <div className="Shift">SHIFT</div>
                            </div>
                            {fourth.map(fourth => <Letter obj={fourth}/>)}
                            <div className="RShift-button">
                                <div className="RShift">R. SHIFT</div>
                            </div>
                        </div>
                    </div>
            }

            <div className="Special-layer">
                <div className="Hide-button" onClick={Hide}>
                    <div className="Hide">СКРЫТЬ</div>
                </div>
                <div className="Space"></div>
                <div className="Audio-button">
                    <div className="Audio">АУДИО</div>
                </div>
            </div>


            {/*end?
                <Modal/>
                :
                <div></div>
            */}


        </div>


    )
}