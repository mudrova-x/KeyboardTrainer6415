import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ClientMain } from "./pages/client/ClientMain"
import {MAIN_ROUTE} from "./utils/consts"

//  Route.Redirect - старая технология

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: ClientMain
    },




]