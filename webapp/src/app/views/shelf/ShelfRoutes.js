import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Shelf = MatxLoadable({
    loader: () => import("./Shelf.js")
})

const shelfRoutes = [
    {
        path: "/shelf",
        component: Shelf,
        auth: authRoles.supermarket
    }
];

export default shelfRoutes;