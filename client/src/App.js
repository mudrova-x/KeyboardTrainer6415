// import { AdminPage } from "./pages/AdminPage"
//import { StatisticMenu } from "./pages/StatisticMenu"
import { TaskListPage } from "./pages/TaskListPage"

function App() {
  return (
    <div className="test">
      {/* hello */}
      <header>
                <div className="title ">
                    Печаточка.
                </div>
                <div className="profile ">
                    <button>Профиль</button>
                </div>
            </header>
      <TaskListPage/>
    </div>
  );
}

export default App;