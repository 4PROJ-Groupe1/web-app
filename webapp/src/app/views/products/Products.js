import React, { Component } from "react";
import {Breadcrumb, SimpleCard} from "../../../matx";
import ProductsConsumer from "./ProductsConsumer";
import ProductsProducer from "./ProductsProducer";
import {apiLinkProd} from "../../constantes.jsx"
import data from "../../database.json";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'consumer'
        }
    }

    componentDidMount() {
        fetch(`${apiLinkProd}/test`)
            .then(
                (response) => {
                    //console.log("AppelOrder / :", response);
                },
                (error) => {
                    //console.log("AppelOrder / erreur :", error);
                }
            ).then(
                (result) => {
                    //console.log("AppelOrder / resultat:", result);
                }
            );
    }

    switchState = () => {
        if(this.state.user === 'producer') {
            this.setState({
                user: 'consumer'
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
                        { name: "Products" }
                    ]}
                />
                <div className="m-sm-30">
                    <button onClick={this.switchState}>switch state</button>
                    <SimpleCard title={this.state.user} >
                        {this.state.user === 'consumer' && 
                            <ProductsConsumer dataItem={data} style={{overflowY: "auto"}}/>
                        }
                        {this.state.user === 'producer' && 
                            <ProductsProducer dataItem={data}/>
                        }
                    </SimpleCard>
                </div>
            </div>
        );
    }
}

export default Products;
