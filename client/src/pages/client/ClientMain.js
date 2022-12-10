import Header1 from "./Header"
import "../../styles/client/ClientMain.scss"

const ClientMain = () => {

    return (
        <div className="container">
            <Header1/>
            <div className="first-layer">
                <div className="blind-printing">
                    <div className="the-most-powerful">Самый мощный</div>
                    <div className="training">Тренажер</div>
                    <div className="prints">Печати</div>
                    <div className="in-the-blind">Вслепую</div>
                </div>

                <div className="Container-us">
                    <div className="Us">
                        <div className="center-text underline-white">Нас выбирают самые быстрые</div>
                    </div>
                </div>

            </div>

            <div className="second-layer">
                <div>
                    <div className="difficulty-levels">
                        <div className="difficulty-levels-text">Уровень сложности:</div>
                        <div className="">
                            <button className="level-1">1</button>
                            <button className="level-2">2</button>
                            <button className="level-3">3</button>
                            <button className="level-4">4</button>
                        </div>

                    </div>
                    <div className="container-all-test">
                        <div className="container-number-test">
                            <div className="test-name">Название теста</div>

                            <div className="text-flex-row">
                                <div className="test-zone">Зона: А</div>
                                <div className="test-time">Время теста: 02:20</div>
                                <div>
                                    <div className="test-max-mistake">Количество допустимых ошибок: 5</div>
                                    <div className="test-symbol">Количество символов: 5</div>
                                </div>
                            </div>

                        </div>
                        <div className="container-number-test">
                            <div className="test-name">Название теста</div>

                            <div className="text-flex-row">
                                <div className="test-zone">Зона: А</div>
                                <div className="test-time">Время теста: 02:20</div>
                                <div>
                                    <div className="test-max-mistake">Количество допустимых ошибок: 5</div>
                                    <div className="test-symbol">Количество символов: 5</div>
                                </div>
                            </div>

                        </div>
                        <div className="container-number-test">
                            <div className="test-name">Название теста</div>
                            <div className="text-flex-row">
                                <div className="test-zone">Зона: А</div>
                                <div className="test-time">Время теста: 02:20</div>
                                <div>
                                    <div className="test-max-mistake">Количество допустимых ошибок: 5</div>
                                    <div className="test-symbol">Количество символов: 5</div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="description-of-difficulty-levels">
                    <div className="the-name-of-the-difficulty-level">Первый уровень сложности</div>
                    <div className="text-description-of-difficulty-levels underline">Мин. количество допустимых ошибок:
                        5
                    </div>
                    <div className="text-description-of-difficulty-levels underline">Макс. количество допустимых ошибок:
                        5
                    </div>
                    <div className="text-description-of-difficulty-levels underline">Макс. время нажатия в секундах: 4
                    </div>
                    <div className="text-description-of-difficulty-levels underline">Макс. количество зон для
                        тренировки: 1
                    </div>
                    <div className="text-description-of-difficulty-levels underline">Maкс. количество символов: 50</div>

                </div>

            </div>


        </div>
    )
}

export default ClientMain;