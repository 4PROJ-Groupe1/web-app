import "../fake-db";
import "../styles/_app.scss";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import MatxTheme from "./MatxLayout/MatxTheme/MatxTheme";
import AppContext from "./appContext";
import history from "history.js";

import routes from "./RootRoutes";
import { Store } from "./redux/Store";
import Auth from "./auth/Auth";
import MatxLayout from "./MatxLayout/MatxLayout";
import AuthGuard from "./auth/AuthGuard";

const App = () => {
  fetch("http://web-api:8082/")
      .then(
          (response) => {
            console.log("Appel / :", response);
          },
          (error) => {
            console.log("Appel / erreur :", error);
          }
      );
  fetch("http://web-api:8082/api/test")
      .then(
          (response) => {
            console.log("Appel /api/test :", response);
          },
          (error) => {
            console.log("Appel /api/test erreur :", error);
          }
      );
  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
        <MatxTheme>
          <Auth>
            <Router history={history}>
              <AuthGuard>
                <MatxLayout />
              </AuthGuard>
            </Router>
          </Auth>
        </MatxTheme>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;
