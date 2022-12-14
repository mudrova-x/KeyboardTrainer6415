// import { AdminPage } from "./pages/AdminPage"
// import { StatisticMenu } from "./pages/StatisticMenu"
import Header from "../src/pages/client/Header"
import {Loader} from "../src/components/Loader"
//import { TaskListPage } from "./pages/TaskListPage"
//import { UserListPage } from "./pages/UserListPage"
//import { useRoutes } from "./routes"
import {AuthContext} from "./context/auth.context"
import {useRoutes} from "./routes"
import {useAuth} from "./hooks/auth.hook"
import {useState, createContext} from "react";

 export const StatisticsContext = createContext(0);

function App() {
    const {token, login, logout, userId, accountType, ready} = useAuth()
    const [time, setTime] = useState()
    //console.log(useAuth())
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated, accountType)
    const [isLoading, setLoading] = useState(true);

    if (!ready) {
        return <Loader/>
    }


    return (
        <StatisticsContext.Provider value={{time, setTime}}>
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
            </AuthContext.Provider>
        </StatisticsContext.Provider>
    );
}

export default App;