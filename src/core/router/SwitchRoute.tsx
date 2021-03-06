import React from "react";
import { Route, Switch } from "react-router";
import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register";
import GamesList from "../../features/gamesList/GamesList";
import GameView from "../../features/gameView/GameView";
import { routes } from "./routes";

const SwitchRoute: React.FC = () => {
  return (
    <Switch>
      <Route path={routes.login}>
        <Login />
      </Route>
      <Route path={routes.register}>
        <Register />
      </Route>
      <Route path={routes.games}>
        <GamesList />
      </Route>
      <Route path={routes.gameView}>
        <GameView />
      </Route>
      <Route path={routes.home}>
        <GamesList />
      </Route>
    </Switch>
  );
};

export default SwitchRoute;
