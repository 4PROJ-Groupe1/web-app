import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const HomeDashboard = MatxLoadable({
    loader: () => import("./HomeDashboard")
})

const homeRoutes = [
    {
        path: "/home",
        component: HomeDashboard
        // auth: authRoles.admin
    }
];

export default homeRoutes;