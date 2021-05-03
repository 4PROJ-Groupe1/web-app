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
  console.log("environment : ", process.env.NODE_ENV);
  window.API_URL = process.env.NODE_ENV === 'production' ? 'https://api.brilliant-market.com/api' : 'http://localhost:8082/api';
  console.log("api url : ", window.API_URL);
  fetch("https://api.brilliant-market.com/")
      .then(
          (response) => {
            console.log("Appel / :", response);
          },
          (error) => {
            console.log("Appel / erreur :", error);
          }
      ).then(
          (result) => {
              console.log("Appel / resultat:", result);
          }
      );
  fetch("https://api.brilliant-market.com/api/test")
      .then(
          (response) => {
            console.log("Appel /api/test :", response);
          },
          (error) => {
            console.log("Appel /api/test erreur :", error);
          }
      ).then(
          (result) => {
              console.log("Appel /api/test resultat:", result);
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
