import "../styles/Admin/AdminPage.scss"

export const AdminPage = () => {
   
    return (
        <div className="admin-page"> 
            {/* <header>
                <div className="title ">
                    Печаточка.
                </div>
                <div className="profile ">
                    <button>Профиль</button>
                </div>
            </header> */}
            <div className="admin-panel first-layer">
                <div className="title "><p>Административная панель</p></div>
                <div className="users "><button>Пользователи</button></div>
            </div>
            <div className="admin-panel second-layer">
                <div className="tasks "><button>Создание и редактирование упражнений</button></div>
                <div className="statistic "><button>Статистика</button></div>
            </div>
            <div className="admin-panel third-layer">
                <div className="levels"><button>Уровни сложности</button></div>
                <div className="container"></div>
            </div>
        </div>
    )
}