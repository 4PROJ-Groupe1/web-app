import React from "react";
import {
    Icon,
    Badge,
    MuiThemeProvider,
    IconButton,
    Drawer
} from "@material-ui/core";
import DemoService from "../../services/demoService";

export default class CartDemo extends React.Component {
    constructor(props) {
        super(props);

        //const [panelOpen, setPanelOpen] = React.useState(false);

        this.state = {
            panelOpen: false,
            cartList: [],
            recommendation: ""
        }
    }

    componentDidMount() {
        this.refreshCart();
    }

    refreshRecommendation (nomProduit) {
        DemoService.getRecommendation(nomProduit).then(
            res => {
                res.json().then(
                    response => {
                        if (res.ok) {
                            console.log('getRecommendation response : ', response);
                            this.setState({recommendation: response});
                        } else {
                            console.log("getRecommendation failed : ", response.error);
                        }
                    },
                    error => {
                        console.log('getRecommendation parse error : ', error);
                    }
                );
            },
            err => {
                console.log('getRecommendation error : ', err);
            }
        )
    }

    refreshCart () {
        let user = JSON.parse(window.localStorage.getItem('auth_user'))
        //if (!user.email === 'demoUser@demoUser.demoUser') {
            DemoService.getPanier().then(
                res => {
                    res.json().then(
                        response => {
                            if (res.ok) {
                                console.log('getPanier response : ', response);
                                this.setState({cartList: response.produits});
                                this.refreshRecommendation(response.produits[response.produits.length -1].nomProduit)
                            } else {
                                console.log("getPanier failed : ", response.error);
                            }
                        },
                        error => {
                            console.log('getPanier parse error : ', error);
                        }
                    );
                },
                err => {
                    console.log('getPanier error : ', err);
                }
            )
        //}
    }

    handleDrawerToggle = () => {
        this.setState({panelOpen: !this.state.panelOpen});
        this.refreshCart();
    }

    render() {
        const container = this.props.container;
        const theme = this.props.theme;
        const settings = this.props.settings;
        const getCartList = this.props.getCartList;
        const deleteProductFromCart = this.props.deleteProductFromCart;
        const updateCartAmount = this.props.updateCartAmount;
        const user = this.props.user;

        // const {
        //     container,
        //     theme,
        //     settings,
        //     getCartList,
        //     deleteProductFromCart,
        //     updateCartAmount,
        //     user
        // } = this.props;
        //const parentThemePalette = theme.palette;
        return (
            <div>
                <MuiThemeProvider /*theme={settings.themes[settings.activeTheme]}*/>
                    <IconButton
                        onClick={this.handleDrawerToggle}
                        // style={{
                        //     color:
                        //         parentThemePalette.type === "light"
                        //             ? parentThemePalette.text.secondary
                        //             : parentThemePalette.text.primary
                        // }}
                    >
                        <Badge color="secondary" badgeContent={this.state.cartList.length}>
                            <Icon>shopping_cart</Icon>
                        </Badge>
                    </IconButton>

                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={"right"}
                        open={this.state.panelOpen}
                        onClose={this.handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true
                        }}
                    >
                        <div className="mini-cart">
                            <div className="cart__topbar flex flex-middle p-16 mb-24">
                                <Icon color="primary">shopping_cart</Icon>
                                <h5 className="ml-8 my-0 font-weight-500">Cart</h5>
                            </div>

                            {this.state.cartList.map(product => (
                                <div
                                    key={product.idProduit}
                                    className="mini-cart__item flex flex-middle flex-space-between py-16 px-8"
                                    style={{color: "white"}}
                                >
                                    <div className="mr-8">
                                        {product.company + '  ' + product.nomProduit}
                                    </div>
                                    <div className="mr-8 text-center">
                                        <small className="">
                                            ${product.prix} x {product.quantite}
                                        </small>
                                    </div>
                                </div>
                            ))}
                            <br/>
                            <br/>
                            <br/>
                            <div>According to your cart, we suggest you to look at this article : {this.state.recommendation}</div>
                        </div>
                    </Drawer>
                </MuiThemeProvider>
            </div>
        );
    }
}