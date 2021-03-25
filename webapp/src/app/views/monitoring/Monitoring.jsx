import React from "react";
import {Breadcrumb} from "../../../matx";

const Monitoring = () => {
    return (
        <div className="m-sm-30">
            <Breadcrumb
                routeSegments={[
                    { name: "Monitoring" }
                ]}
            />
            <div className="m-sm-30">
                <p>VISUALISATION GLOBALE COMPONENT WORKS</p>
            </div>
        </div>
    );
};

export default Monitoring;
