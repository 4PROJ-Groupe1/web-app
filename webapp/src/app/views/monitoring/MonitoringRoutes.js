import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Monitoring = MatxLoadable({
    loader: () => import("./Monitoring.js")
})

const monitoringRoutes = [
    {
        path: "/monitoring",
        component: Monitoring
        // auth: authRoles.admin
    }
];

export default monitoringRoutes;