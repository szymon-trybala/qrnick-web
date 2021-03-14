import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./common/mainLayout/MainLayout";
import SwitchRoute from "./core/router/SwitchRoute";

function App() {
  return (
    <BrowserRouter>
      <SwitchRoute />
    </BrowserRouter>
  );
}

export default App;
