import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Stats = MatxLoadable({
    loader: () => import("./Stats")
})

const statsRoutes = [
    {
        path: "/stats",
        component: Stats
        // auth: authRoles.admin
    }
];

export default statsRoutes;