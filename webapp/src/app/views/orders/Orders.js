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
            user: 'consumer',
            userbis: JSON.parse(localStorage.getItem('auth_user'))
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

    switchState = () => {
        if(this.state.user === 'producer') {
            this.setState({
                user: 'consumer'
            });
        } else if(this.state.user === 'consumer') {
            this.setState({
                user: 'supermarket'
            });
        } else {
            this.setState({
                user: 'producer'
            });
        }
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
                    <button onClick={this.switchState}>switch state</button>
                    <SimpleCard title={this.state.user}>
                        {this.state.user === 'supermarket' && 
                            <OrdersSupermarket dataItem={data}/>
                        }
                        {this.state.user === 'consumer' && 
                            <OrdersConsumer dataItem={data}/>
                        }
                        {this.state.user === 'producer' && 
                            <OrdersProducer dataItem={data}/>
                        }
                    </SimpleCard>
                </div>
            </div>
        );
    }
}

export default Orders;
