import React, { Component } from "react";
import {Breadcrumb, SimpleCard} from "../../../matx";
import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    Button
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import {makeStyles} from "@material-ui/core/styles";
import {amber, green} from "@material-ui/core/colors";
import {PropTypes} from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import {AgGridReact} from "ag-grid-react";
import ShelfService from "../../services/ShelfService";
import StockService from "../../services/StockService";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";


const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.main
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1)
    },
    message: {
        display: "flex",
        alignItems: "center"
    }
}));

function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span style={{color: "white"}} id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
        </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            {...other}
        />
    );
}

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const useStyles2 = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1)
    }
}));


class Shelf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomRayon: "",
            nomRayonSelectionne: "",
            produitSelectionne: "",
            quantiteMax: 0,
            produits: [],
            displayError: false,
            errorMessage: "",
            rowData: [],
            rowDataDetails: [],
            rowDataDialog: [],
            dialogOpen: false
        }
    }

    componentDidMount() {
        ShelfService.getInfosRayons().then(
            res => {
                res.json().then(
                    response => {
                        if (res.ok) {
                            console.log('getInfosRayons response : ', response);
                            this.setState({rowData: response.rayons})
                        } else {
                            console.log("getInfosRayons failed : ", response.error);
                            this.setState({displayError: true});
                            this.setState({errorMessage: response.error});
                        }
                    },
                    error => {
                        console.log('getInfosRayons parse error : ', error);
                    }
                );
            },
            err => {
                console.log('getInfosRayons error : ', err);
            }
        );

        StockService.getProducts().then(
            res => {
                res.json().then(
                    response => {
                        if (res.ok) {
                            console.log('getProducts response : ', response);
                            this.setState({produits: response.products})
                        } else {
                            console.log("getProducts failed : ", response.error);
                            this.setState({displayError: true});
                            this.setState({errorMessage: response.error});
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

    handleChange = event => {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleChangeShelfName = event => {
        const nomRayonSelectionne = event.target.value;
        let shelfItems = this.state.rowData.find(shelf => nomRayonSelectionne === shelf._id);
        this.setState({nomRayonSelectionne: nomRayonSelectionne, rowDataDetails: shelfItems.items});
    };

    handleChangeProduit = event => {
        const produitSelectionne = event.target.value;
        this.setState({produitSelectionne: produitSelectionne});
    };

    handleFormSubmit = event => {
        ShelfService.addRayon(this.state.nomRayon).then(
            res => {
                res.json().then(
                    response => {
                        if (res.ok) {
                            console.log('addRayon response : ', response);
                            this.setState({rowData: response.rayons, nomRayon: ""})
                        } else {
                            console.log("addRayon failed : ", response.error);
                            this.setState({displayError: true});
                            this.setState({errorMessage: response.error});
                        }
                    },
                    error => {
                        console.log('addRayon parse error : ', error);
                    }
                );
            },
            err => {
                console.log('addRayon error : ', err);
            }
        )
    };

    handleFormProduitSubmit = event => {
        ShelfService.addProduitRayon(this.state.nomRayonSelectionne, this.state.produitSelectionne, this.state.quantiteMax.toString()).then(
            res => {
                res.json().then(
                    response => {
                        if (res.ok) {
                            console.log('getProducts response : ', response);
                            this.setState({rowData: response.rayons});
                            let shelfItems = this.state.rowData.find(shelf => this.state.nomRayonSelectionne === shelf._id);
                            this.setState({nomRayonSelectionne: this.state.nomRayonSelectionne, rowDataDetails: shelfItems.items, produitSelectionne: '', quantiteMax: 0});
                        } else {
                            console.log("getProducts failed : ", response.error);
                            this.setState({displayError: true});
                            this.setState({errorMessage: response.error});
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
    };

    handleFill = event => {
        ShelfService.fillRayon(this.state.nomRayonSelectionne).then(
            res => {
                res.json().then(
                    response => {
                        if (res.ok) {
                            console.log('fillRayon response : ', response);
                            let shelfItems = this.state.rowData.find(shelf => this.state.nomRayonSelectionne === shelf._id);
                            this.setState({
                                rowData: response.rayons.rayons,
                                rowDataDialog: response.products,
                                dialogOpen: true,
                                nomRayonSelectionne: this.state.nomRayonSelectionne,
                                rowDataDetails: shelfItems.items,
                                produitSelectionne: '',
                                quantiteMax: 0
                            });
                        } else {
                            console.log("fillRayon failed : ", response.error);
                            this.setState({displayError: true});
                            this.setState({errorMessage: response.error});
                        }
                    },
                    error => {
                        console.log('fillRayon parse error : ', error);
                    }
                );
            },
            err => {
                console.log('fillRayon error : ', err);
            }
        )
    };

    handleCloseDialog = () => {
        this.setState({
            dialogOpen: false,
            rowDataDialog: []
        })
    }

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        this.setState({displayError: false});
    }

    render() {
        let { nomRayon, nomRayonSelectionne, produitSelectionne, quantiteMax } = this.state;
        let { classes } = this.props;

        const colDef = [
            {
                "headerName": "Shelf name",
                "field": "name",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
                "sortable": true
            }
        ];

        const colDefDetails = [
            {
                "headerName": "Product name",
                "field": "name",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
                "sortable": true,
                valueFormatter: (params) => {
                    return this.state.produits.find(produit => params.data.productId === produit._id).name;
                }
            },
            {
                "headerName": "Product max quantity",
                "field": "maxQuantity",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
                "sortable": true
            },
            {
                "headerName": "Actual shelf quantity",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
                "sortable": true,
                valueFormatter: (params) => {
                    let result = 0
                    for (const product of params.data.items) {
                        result += product.quantity;
                    }
                    return result;
                }
            }
        ];

        const colDefDialog = [
            {
                "headerName": "Product name",
                "field": "lot.name",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
                "sortable": true,
                valueFormatter: (params) => {
                    return this.state.produits.find(produit => params.data.lot.idProduit === produit._id).name;
                }
            },
            {
                "headerName": "Lot number",
                "field": "lot.numLot",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
                "sortable": true
            },
            {
                "headerName": "Expiration date",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
                "sortable": true,
                valueFormatter: (params) => {
                    return params.data.lot.expiration.toString().substring(0, 10);
                }
            },
            {
                "headerName": "Quantity to fill",
                "field": "quantite",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
                "sortable": true
            }
        ];

        const gridOptions = {
            pagination: true,
            paginationPageSize: 10,
            localeText: {
                to: "à",
                of: "sur",
            }
        }

        const onColumnResized = (params) => {
            params.api.resetRowHeights();
        };

        const rowStyle = { whitespace: 'pre-line' };

        return (
            <div className="m-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Shelf management" }
                    ]}
                />
                <div className="m-sm-30">
                    <Snackbar
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                        open={this.state.displayError}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                    >
                        <MySnackbarContentWrapper
                            variant="error"
                            //className={classes.margin}
                            message={this.state.errorMessage}
                        />
                    </Snackbar>
                    <Dialog open={this.state.dialogOpen} onClose={this.handleCloseDialog}>
                        <DialogTitle id="customized-dialog-title">
                            Products to take from supply to fill the shelf with :
                        </DialogTitle>
                        <DialogContent dividers>
                            <div style={{overflowY: "auto"}} >
                                <div
                                    className="ag-theme-material"
                                    style={{ height: 400, width: '100%' }}
                                >
                                    <AgGridReact
                                        onGridReady={this.onGridReady}
                                        onColumnResized={onColumnResized}
                                        rowData={this.state.rowDataDialog}
                                        cellStyle={rowStyle}
                                        columnDefs={colDefDialog}
                                        gridOptions={gridOptions}
                                    >
                                    </AgGridReact>
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={this.handleCloseDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <SimpleCard title={"Shelf List"}>
                        <div
                            className="ag-theme-material"
                            style={{ height: 600, width: '100%' }}
                        >
                            <AgGridReact
                                onGridReady={this.onGridReady}
                                onColumnResized={onColumnResized}
                                rowData={this.state.rowData}
                                cellStyle={rowStyle}
                                columnDefs={colDef}
                                gridOptions={gridOptions}
                            >
                            </AgGridReact>
                        </div>
                        <br/>
                        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                            <TextValidator
                                className="mb-24 w-100"
                                variant="outlined"
                                label="Shelf name"
                                onChange={this.handleChange}
                                type="text"
                                name="nomRayon"
                                value={nomRayon}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                            />
                            <div className="flex flex-middle">
                                <Button
                                    className="capitalize"
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Add shelf
                                </Button>
                            </div>
                        </ValidatorForm>
                    </SimpleCard>
                    <br/>
                    <SimpleCard title={"Shelf product list"}>
                        <InputLabel id="shelfName">Shelf name</InputLabel>
                        <Select
                            labelId="shelfName"
                            value={nomRayonSelectionne}
                            onChange={this.handleChangeShelfName}
                            style={{minWidth: 150}}
                        >
                            {this.state.rowData.map((item, index) =>
                                <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                            )}
                        </Select>
                        <br/>
                        <div
                            className="ag-theme-material"
                            style={{ height: 600, width: '100%' }}
                        >
                            <AgGridReact
                                onGridReady={this.onGridReady}
                                onColumnResized={onColumnResized}
                                rowData={this.state.rowDataDetails}
                                cellStyle={rowStyle}
                                columnDefs={colDefDetails}
                                gridOptions={gridOptions}
                            >
                            </AgGridReact>
                        </div>
                        <br/>
                        <ValidatorForm ref="formProducts">
                            <InputLabel id="shelfName">Add product to the shelf</InputLabel>
                            <Select
                                labelId="shelfName"
                                value={produitSelectionne}
                                onChange={this.handleChangeProduit}
                                style={{minWidth: 150}}
                            >
                                {this.state?.produits.map((item, index) =>
                                    <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                                )}
                            </Select>
                            <br/>
                            <br/>
                            <br/>
                            <TextValidator
                                className="mb-24 w-20"
                                variant="outlined"
                                label="Max quantity"
                                onChange={this.handleChange}
                                type="number"
                                name="quantiteMax"
                                value={quantiteMax}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                            />
                            <br/>
                            <div className="flex flex-middle">
                                <Button
                                    className="capitalize"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleFormProduitSubmit}
                                >
                                    Add to shelf
                                </Button>
                            </div>
                        </ValidatorForm>
                        <br/>
                        <div className="flex flex-middle">
                            <Button
                                className="capitalize"
                                variant="contained"
                                color="primary"
                                onClick={this.handleFill}
                            >
                                Fill shelf
                            </Button>
                        </div>
                    </SimpleCard>
                </div>
            </div>
        );
    }
}

export default Shelf;
