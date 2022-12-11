// import { AdminPage } from "./pages/AdminPage"
// import { StatisticMenu } from "./pages/StatisticMenu"
import Header from "../src/pages/client/Header"
import { Loader } from "../src/components/Loader"
//import { TaskListPage } from "./pages/TaskListPage"
//import { UserListPage } from "./pages/UserListPage"
//import { useRoutes } from "./routes"
import {AuthContext} from "./context/auth.context"
import { useRoutes } from "./routes"
import {useAuth} from "./hooks/auth.hook"

function App() {
  const { token, login, logout, userId, accountType, ready } = useAuth()
  console.log(useAuth())
  const  isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated, accountType)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token,
      login,
      logout,
      userId,
      isAuthenticated,
      accountType
  }}>
    <div className="container">
      <Header/>
      <div className="container background-test">
                    {
                         routes
                    }
                </div>
       
    </div>
    </AuthContext.Provider >
  );
}

export default App;