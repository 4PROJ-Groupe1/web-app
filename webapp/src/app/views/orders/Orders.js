import React, { Component } from "react";
import {Breadcrumb, SimpleCard} from "../../../matx";
import OrdersSupermarket from "./OrdersSupermarket";
import OrdersConsumer from "./OrdersConsumer";
import OrdersProducer from "./OrdersProducer";
import {apiLinkProd} from "../../constantes.jsx"
import data from "../../database.json";

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('auth_user'))
        }
    }

    componentDidMount() {
        fetch(`${apiLinkProd}`)
            .then(
                (response) => {
                    console.log("AppelOrder / :", response);
                },
                (error) => {
                    console.log("AppelOrder / erreur :", error);
                }
            ).then(
                (result) => {
                    console.log("AppelOrder / resultat:", result);
                }
            );
    }

    render() {
        return (
            <div className="m-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Orders" }
                    ]}
                />
                <div className="m-sm-30">
                    <SimpleCard title="Vos commandes">
                        {this.state.user.role === 'supermarket' && 
                            <OrdersSupermarket dataItem={data} user={this.state.user}/>
                        }
                        {this.state.user.role === 'consumer' && 
                            <OrdersConsumer dataItem={data} user={this.state.user}/>
                        }
                        {this.state.user.role === 'producer' && 
                            <OrdersProducer dataItem={data} user={this.state.user}/>
                        }
                    </SimpleCard>
                </div>
            </div>
        );
    }
}

export default Orders;
