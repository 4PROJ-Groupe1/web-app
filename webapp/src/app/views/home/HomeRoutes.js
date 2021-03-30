import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const HomeDashboard = MatxLoadable({
    loader: () => import("./HomeDashboard.js")
})

const homeRoutes = [
    {
        path: "/home",
        component: HomeDashboard
        // auth: authRoles.admin
    }
];

export default homeRoutes;