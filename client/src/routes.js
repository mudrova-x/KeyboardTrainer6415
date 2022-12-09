import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { TaskListPage } from "./pages/Admin/TaskListPage"
import { UserListPage } from "./pages/Admin/UserListPage"
import { MainPage } from "./pages/MainPage"
//  Route.Redirect - старая технология

export const useRoutes = (accountType) => {
    
    console.log("accountType" ,accountType)
        if (accountType === "admin") {
            return (
                <Routes>
                    <Route path="/main" exact element={<MainPage />} />
                    <Route path="/tasklist" exact element={<TaskListPage />} />
                    <Route path="/userlist" exact element={<UserListPage />} />
                    <Route path="*" element={<Navigate replace to="/main/" />} />
                </Routes>
            );
        }
    
        // else if (accountType === false) {
        //     return (
        //         <Routes>
        //            // <Route path="/page" exact element={<Page />} />
        //            // <Route path="*" element={<Navigate replace to="//" />} />
                    
        //         </Routes>
        //     );
        // }
    
    return (
        <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    );
};