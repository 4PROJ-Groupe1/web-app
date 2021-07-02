import React, { Component } from "react";
import {Breadcrumb, SimpleCard} from "../../../matx";
import ProductsConsumer from "./ProductsConsumer";
import ProductsProducer from "./ProductsProducer";
import ProductsSupermarket from "./ProductsSupermarket";
import {apiLinkProd, apiLinkDev} from "../../constantes.jsx"
import data from "../../database.json";
import StockService from "../../services/StockService";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('auth_user')),
            displayError: false,
            products: []
        }
    }

    componentDidMount() {
        StockService.getProducts().then(
            res => {
                res.json().then(
                    response => {
                        if (res.ok) {
                            console.log('getProducts response : ', response);
                            this.setState({products: response.products})
                        } else {
                            console.log("getProducts failed : ", response.error);
                            // this.setState({displayError: true});
                            // this.setState({errorMessage: response.error});
                        }
                    },
                    error => {
                        console.log('getProducts parse error : ', error);
                    }
                );
            },
            err => {
                console.log('getProducts error : ', err);
            }
        )
    }

    switchdisplayError = () => { 
        this.setState({
            displayError: this.state.displayError === true ? false : true
        });
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
                    {/* <button onClick={this.switchdisplayError}>snackbar</button>
                    <SnackbarCustom variant="error" message="test" displayError={this.state.displayError}/> */}

                        {this.state.user.role === 'consumer' && this.state.products.length !== 0 && 
                            <ProductsConsumer dataItem={data} products={this.state.products} style={{overflowY: "auto"}} user={this.state.user}/>
                        }
                        {this.state.user.role === 'producer' && this.state.products.length !== 0 && 
                            <ProductsProducer dataItem={data} products={this.state.products} user={this.state.user}/>
                        }
                        {this.state.user.role === 'supermarket' && this.state.products.length !== 0 &&
                            <ProductsSupermarket dataItem={data} products={this.state.products} style={{overflowY: "auto"}} user={this.state.user}/>
                        }
                </div>
            </div>
        );
    }
}

export default Products;
