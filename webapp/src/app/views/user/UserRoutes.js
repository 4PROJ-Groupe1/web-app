import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const AddProducer = MatxLoadable({
    loader: () => import("./AddProducer.js")
})

const userRoutes = [
    {
        path: "/addProducer",
        component: AddProducer
        // auth: authRoles.admin
    }
];

export default userRoutes;