import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Monitoring = MatxLoadable({
    loader: () => import("./Monitoring")
})

const monitoringRoutes = [
    {
        path: "/monitoring",
        component: Monitoring
        // auth: authRoles.admin
    }
];

export default monitoringRoutes;