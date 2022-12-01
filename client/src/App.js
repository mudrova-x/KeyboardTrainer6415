// import { AdminPage } from "./pages/AdminPage"
// import { StatisticMenu } from "./pages/StatisticMenu"
import Header1 from "../src/pages/client/Header"
//import { TaskListPage } from "./pages/TaskListPage"
//import { UserListPage } from "./pages/UserListPage"
//import  ClientMain  from "./pages/client/ClientMain"

import { useRoutes } from "./routes"


function App() {
  const routes = useRoutes(true)

  return (
    <div className="container">
      <Header1/>
      {/* hello */}
      {/* <header id="header">
                <div className="title ">
                    Печаточка.
                </div>
                <div className="profile ">
                    <button>Профиль</button>
                </div>
      </header>
      
      <UserListPage/>*/}
      <div className="container background-test">
                    {
                        routes
                    }
                </div>
      {/* <TaskListPage />  */}
    </div>
  );
}

export default App;