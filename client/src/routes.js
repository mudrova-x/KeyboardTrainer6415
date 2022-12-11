import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { TaskListPage } from "./pages/Admin/TaskListPage"
import { UserListPage } from "./pages/Admin/UserListPage"
import { StatisticAllUsers } from "./pages/Admin/StatisticAllUsers";

//  Route.Redirect - старая технология

export const useRoutes = (accountType) => {
    
    console.log("accountType" ,accountType)
        if (accountType === true) {
            return (
                <Routes>
                    <Route path="/tasklist" exact element={<TaskListPage />} />
                    <Route path="/userlist" exact element={<UserListPage />} />
                    <Route path="/statisticallusers" exact element={<StatisticAllUsers />} />
                    <Route path="*" element={<Navigate replace to="/userlist/" />} />
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
    
    // return (
    //     <Routes>
    //         <Route path="/" exact element={<AuthorizationPage />} />
    //         <Route path="*" element={<Navigate replace to="/" />} />
    //     </Routes>
    // );
};