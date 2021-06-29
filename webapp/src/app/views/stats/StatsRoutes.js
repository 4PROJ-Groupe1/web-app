import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Stats = MatxLoadable({
    loader: () => import("./Stats.js")
})

const statsRoutes = [
    {
        path: "/stats",
        component: Stats,
        auth: authRoles.supermarket
    }
];

export default statsRoutes;