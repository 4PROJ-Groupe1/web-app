import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Products = MatxLoadable({
    loader: () => import("./Products")
})

const productsRoutes = [
    {
        path: "/products",
        component: Products
        // auth: authRoles.admin
    }
];

export default productsRoutes;