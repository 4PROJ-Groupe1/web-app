import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const OrdersList = MatxLoadable({
    loader: () => import("./Orders")
})

const ordersRoutes = [
    {
        path: "/orders",
        component: OrdersList
        // auth: authRoles.admin
    }
];

export default ordersRoutes;