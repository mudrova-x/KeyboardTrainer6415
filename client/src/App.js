// import { AdminPage } from "./pages/AdminPage"
// import { StatisticMenu } from "./pages/StatisticMenu"
//import { TaskListPage } from "./pages/TaskListPage"
import { UserListPage } from "./pages/UserListPage"
import  ClientMain  from "./pages/client/ClientMain"
function App() {
  return (
    <div className="test">
      {/* hello */}
      {/* <header id="header">
                <div className="title ">
                    Печаточка.
                </div>
                <div className="profile ">
                    <button>Профиль</button>
                </div>
      </header>
      <UserListPage /> */}
      <ClientMain/>
    </div>
  );
}

export default App;