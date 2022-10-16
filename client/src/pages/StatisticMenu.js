import "../styles/Admin/AdminPage.scss"

export const StatisticMenu = () => {
   
    return (
        <div className="admin-page">
            <div className="admin-panel first-layer">
                <div className="title "><p>Статистика</p></div>
                <div className="users "><button>Все упражнения</button></div>
            </div>
            <div className="admin-panel second-layer">
                <div className="st task"><button>Конкретное упражнение</button></div>
                <div className="st all-users"><button>По всем пользователям</button></div>
            </div>
            <div className="admin-panel third-layer">   
                <div className="user"><button>Конкретный пользователь</button></div>
                <div className="back"><button>Назад</button></div>
            </div>
        </div>
    )
} 