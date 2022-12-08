// import { AdminPage } from "./pages/AdminPage"
// import { StatisticMenu } from "./pages/StatisticMenu"
import Header1 from "../src/pages/client/Header"
//import { TaskListPage } from "./pages/TaskListPage"
//import { UserListPage } from "./pages/UserListPage"
//import  ClientMain  from "./pages/client/ClientMain"

//import { useRoutes } from "./routes"
import {AuthContext} from "./auth.context"
import { useRoutes } from "./routes"

import {useAuth} from "./hooks/auth.hook"

function App() {
  //const routes = useRoutes(true)
  const {token, login, logout, userId, accountType} = useAuth()
  const  isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated, accountType)
  return (
    <AuthContext.Provider value={{
      token,
      login,
      logout,
      userId,
      isAuthenticated
  }}>
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
    </div></AuthContext.Provider>
  );
}

export default App;