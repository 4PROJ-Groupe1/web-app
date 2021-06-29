import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Supply = MatxLoadable({
    loader: () => import("./Supply.js")
})

const supplyRoutes = [
    {
        path: "/supply",
        component: Supply,
        auth: authRoles.producer
    }
];

export default supplyRoutes;