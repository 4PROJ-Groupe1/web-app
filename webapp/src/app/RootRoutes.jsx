import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import utilitiesRoutes from "./views/utilities/UtilitiesRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";

import materialRoutes from "./views/material-kit/MaterialRoutes";
import dragAndDropRoute from "./views/Drag&Drop/DragAndDropRoute";

import formsRoutes from "./views/forms/FormsRoutes";
import mapRoutes from "./views/map/MapRoutes";
import homeRoutes from "./views/home/HomeRoutes";
import productsRoutes from "./views/products/ProductsRoutes";
import ordersRoutes from "./views/orders/OrdersRoutes";
import supplyRoutes from "./views/supply/SupplyRoutes";
import monitoringRoutes from "./views/monitoring/MonitoringRoutes";
import statsRoutes from "./views/stats/StatsRoutes";
import userRoutes from "./views/user/UserRoutes";
import shelfRoutes from "./views/shelf/ShelfRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />
  }
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />
  }
];

const routes = [
    ...productsRoutes,
    ...ordersRoutes,
    ...monitoringRoutes,
    ...statsRoutes,
    ...supplyRoutes,
    ...homeRoutes,
    ...sessionRoutes,
    ...dashboardRoutes,
    ...materialRoutes,
    ...utilitiesRoutes,
    ...dragAndDropRoute,
    ...formsRoutes,
    ...mapRoutes,
    ...userRoutes,
    ...shelfRoutes,
    ...redirectRoute,
    ...errorRoute,
];

export default routes;
