import React from "react";
import {Breadcrumb} from "../../../matx";

const Products = () => {
    return (
        <div className="m-sm-30">
            <Breadcrumb
                routeSegments={[
                    { name: "Products" }
                ]}
            />
            <div className="m-sm-30">
                <p>PRODUITS COMPONENT WORKS</p>
            </div>
        </div>
    );
};

export default Products;
