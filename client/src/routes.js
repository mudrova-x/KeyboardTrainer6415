import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { TaskListPage } from "./pages/Admin/TaskListPage"
import { UserListPage } from "./pages/Admin/UserListPage"
import { StatisticAllUsers } from "./pages/Admin/StatisticAllUsers";
import { StatisticExercise} from "./pages/Admin/StatisticExercise";
import { StatisticAllUsersMean } from "./pages/Admin/StatisticsAllUsersMean";
import { StatisticAllExercisesMean} from "./pages/Admin/StatisticAllExercisesMean"
import { MainPage } from "./pages/MainPage"
import { StatisticMenu } from "./pages/Admin/StatisticMenu"
//  Route.Redirect - старая технология
/*
export const useRoutes = (isAuthenticated, accountType) => {
    
    console.log("accountType", accountType)
    console.log("isAuthenticated", isAuthenticated)

        if (isAuthenticated) {
            if (accountType==="admin") {
                return (
                ///администратор
                <Routes>
                    {/ <Route path="/main" exact element={<MainPage />} /> /}
                    <Route path="/tasklist" exact element={<TaskListPage />} />
                    <Route path="/userlist" exact element={<UserListPage />} />
                    <Route path="/statisticallusers" exact element={<StatisticAllUsers />} />
                    <Route path="*" element={<Navigate replace to="/statisticallusers/" />} />
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
};*/

export const useRoutes = (isAuthenticated, accountType) => {
    return (
    <Routes>
    <Route path="/statisticmenu" exact element={<StatisticMenu />} />
    <Route path="/statisticallusers" exact element={<StatisticAllUsers />} />
    <Route path="/statisticexercise" exact element={<StatisticExercise />} />
    <Route path="/statisticallusersmean" exact element={<StatisticAllUsersMean />} />
    <Route path="/statisticallexercisesmean" exact element={<StatisticAllExercisesMean />} />
    <Route path="/tasklist" exact element={<TaskListPage />} />
    <Route path="/userlist" exact element={<UserListPage />} />
    <Route path="/" exact element={<MainPage />} />
    <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
    );
    };