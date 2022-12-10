import React, {useContext, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import {publicRoutes} from "../routes"

import {Context} from "../index"

const AppRouter = () => {
    const {exerlevel} = useContext(Context)
    console.log(exerlevel)

    return(
      <Routes>
          {publicRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component/>} exact/>)}
      </Routes>
    );

};

export default AppRouter