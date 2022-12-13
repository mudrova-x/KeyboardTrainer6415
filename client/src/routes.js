import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { TaskListPage } from "./pages/Admin/TaskListPage"
import { UserListPage } from "./pages/Admin/UserListPage"
import { MainPage } from "./pages/MainPage"
import { AdminPage } from "./pages/Admin/AdminPage";
import { StatisticMenu } from "./pages/Admin/StatisticMenu"
//  Route.Redirect - старая технология
import { LevelSettings } from "./pages/Admin/LevelSettings";
export const useRoutes = (isAuthenticated, accountType) => {
    
    console.log("accountType", accountType)
    console.log("isAuthenticated", isAuthenticated)

        if (isAuthenticated) {
            if (accountType==="admin") {
                return (
                ///администратор
                <Routes>
                        <Route path="/admin_panel" exact element={<AdminPage />} /> 
                        <Route path="/statistic_menu" exact element={<StatisticMenu />} />
                        <Route path="/tasklist" exact element={<TaskListPage />} />
                        <Route path="/userlist" exact element={<UserListPage />} />
                        <Route path="/settings" exact element={<LevelSettings />} />
                    <Route path="*" element={<Navigate replace to="/admin_panel/" />} />
                </Routes>
            )
            }
            // обучаемый
        if (accountType==="student") {
            return (
                <Routes>
                   
                    <Route path="/" exact element={<MainPage />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            )
        }
    }
    //если не авторизован
    return (
        <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    );
};