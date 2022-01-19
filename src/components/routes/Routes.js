import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Home from '../views/Home';
import Create from '../views/Create';
import Load from '../views/Load';


const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <Home
                />
            </Route>
         
            <Route path="/create">
                <Create />
            </Route>
            <Route path="/load">
                <Load />
            </Route>

            <Route>
                <Redirect to="/" />
            </Route>
        </Switch>
    );
}

export default Routes;