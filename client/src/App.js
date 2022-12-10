// import { AdminPage } from "./pages/AdminPage"
// import { StatisticMenu } from "./pages/StatisticMenu"
<<<<<<< Updated upstream
import  ClientMain  from "./pages/client/ClientMain"

function App() {
    return (


            <ClientMain/>

    );
=======
//import { TaskListPage } from "./pages/TaskListPage"
//import { UserListPage } from "./pages/UserListPage"
//import  ClientMain  from "./pages/client/ClientMain"
import Header1 from "./pages/client/Header"
import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import AppRouter from "./components/AppRouter"

function App() {

  return (
        <BrowserRouter>
            <Header1/>
            <AppRouter/>
        </BrowserRouter>
  );
>>>>>>> Stashed changes
}

export default App;