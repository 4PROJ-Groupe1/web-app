import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Supply = MatxLoadable({
    loader: () => import("./Supply.js")
})

const ProductCategory = MatxLoadable({
    loader: () => import("./ProductCategory.js")
})

const supplyRoutes = [
    {
        path: "/supply",
        component: Supply,
        auth: authRoles.producer
    },
    {
        path: "/productCategory",
        component: ProductCategory,
        auth: authRoles.supermarket
    }
];

export default supplyRoutes;