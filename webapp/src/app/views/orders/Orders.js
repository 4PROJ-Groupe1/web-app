import React, { Component } from "react";
import {Breadcrumb, SimpleCard} from "../../../matx";
import OrdersSupermarket from "./OrdersSupermarket";
import OrdersConsumer from "./OrdersConsumer";
import OrdersProducer from "./OrdersProducer";
import {apiLinkProd} from "../../constantes.jsx"
import data from "../../database.json";
import UserService from "../../services/UserService";

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('auth_user')),
            consumers: [],
            producers: []
        }
    }

    componentDidMount() {
        UserService.getAllUser().then(
            res => {
                res.json().then(
                    response => {
                        if (res.ok) {
                            console.log('getAllUser response : ', response);
                            let consumerTemp = [];
                            let producerTemp = [];
                            response.users.forEach(user => {
                              if(user.role === "producer") {
                                producerTemp.push(user)
                              } else if (user.role === "consumer") {
                                consumerTemp.push(user)
                              }
                            });
                            this.setState({
                              consumers: consumerTemp,
                              producers: producerTemp
                            });
                        } else {
                            console.log("getAllUser failed : ", response.error);
                            // this.setState({displayError: true});
                            // this.setState({errorMessage: response.error});
                        }
                    },
                    error => {
                        console.log('getAllUser parse error : ', error);
                    }
                );
            },
            err => {
                console.log('getAllUser error : ', err);
            }
        )
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
                        {this.state.user.role === 'supermarket' && this.state.consumers.length !==0 && this.state.producers.length !==0 &&
                            <OrdersSupermarket dataItem={data} user={this.state.user} consumers={this.state.consumers} producers={this.state.producers}/>
                        }
                        {this.state.user.role === 'consumer' && 
                            <OrdersConsumer dataItem={data} user={this.state.user}/>
                        }
                        {this.state.user.role === 'producer' && 
                            <OrdersProducer dataItem={data} user={this.state.user}/>
                        }
                </div>
            </div>
        );
    }
}

export default Orders;
