import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { TaskListPage } from "./pages/Admin/TaskListPage"
import { UserListPage } from "./pages/Admin/UserListPage"
import { StatisticAllUsers } from "./pages/Admin/StatisticAllUsers";
import { StatisticExercise} from "./pages/Admin/StatisticExercise";
import { StatisticAllUsersMean } from "./pages/Admin/StatisticsAllUsersMean";
import { StatisticAllExercisesMean} from "./pages/Admin/StatisticAllExercisesMean"
import { MainPage } from "./pages/MainPage"
import { AdminPage } from "./pages/Admin/AdminPage";
import { StatisticMenu } from "./pages/Admin/StatisticMenu"
import {Training} from "./pages/client/Training";

//  Route.Redirect - старая технология
import { LevelSettings } from "./pages/Admin/LevelSettings";
import {UserStatistics} from "./pages/client/UserStatistics"
export const useRoutes = (isAuthenticated, accountType) => {


/*
        var myWindow = document.open("", "MsgWindow", "width=1000,height=1000");

        //console.log(myWindow.document.body)
        var txtFile = new XMLHttpRequest();
        txtFile.open("GET", "./spravkaNew/Help2.html", true)
        console.log(txtFile)
        let allText;

        txtFile.onreadystatechange = function () {
            console.log("Тут 1")
            if (txtFile.readyState === 4) {
                console.log("Тут 2")
                if (txtFile.status === 200) {
                    console.log("Тут 3")
                     allText = txtFile.responseText;
                    console.log(allText)

                    //myWindow.document.body.innerHTML = allText;
                    //document.body.innerHTML = allText;
                }
            }
        }
    var __html = require('./spravkaNew/Help2.html');
    var template = { __html: __html };*/


    
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
                        <Route path="/statisticmenu" exact element={<StatisticMenu />} />
                        <Route path="/statisticallusers" exact element={<StatisticAllUsers />} />
                        <Route path="/statisticexercise" exact element={<StatisticExercise />} />
                        <Route path="/statisticallusersmean" exact element={<StatisticAllUsersMean />} />
                        <Route path="/statisticallexercisesmean" exact element={<StatisticAllExercisesMean />} />
                    <Route path="*" element={<Navigate replace to="/admin_panel/" />} />
                </Routes>
            )
            }
            // обучаемый
        if (accountType==="student") {
            return (
                <Routes>
                    <Route path="/statistics" exact element={<UserStatistics />} />
                    <Route path="/" exact element={<MainPage />} />
                    <Route path="/training/:id" exact element={<Training />} />
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
