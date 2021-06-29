import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const AddProducer = MatxLoadable({
    loader: () => import("./AddProducer.js")
})

const Profile = MatxLoadable({
    loader: () => import("./Profile.jsx")
})

const userRoutes = [
    {
        path: "/addProducer",
        component: AddProducer
        // auth: authRoles.admin
    },
    {
        path: "/profile",
        component: Profile
        // auth: authRoles.admin
    }
];

export default userRoutes;