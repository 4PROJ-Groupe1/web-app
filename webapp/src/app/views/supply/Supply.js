import React, { Component } from "react";
import {Breadcrumb, SimpleCard} from "../../../matx";
import { AgGridReact } from "ag-grid-react";
import StockService from "../../services/StockService";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';

class Supply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('auth_user')),
            lots: [],
            products: [],
            LotDialogOpen: false,
            LotToAdd: []

        }
    }

    componentDidMount() {
        StockService.getLots().then(
            res => {
                res.json().then(
                    response => {
                        if (res.ok) {
                            console.log('getLots response : ', response);
                            this.setState({lots: response.lots})
                        } else {
                            console.log("getLots failed : ", response.error);
                            // this.setState({displayError: true});
                            // this.setState({errorMessage: response.error});
                        }
                    },
                    error => {
                        console.log('getLots parse error : ', error);
                    }
                );
            },
            err => {
                console.log('getLots error : ', err);
            }
        )
        StockService.getProducts().then(
            res => {
                res.json().then(
                    response => {
                        if (res.ok) {
                            console.log('getProducts response : ', response);
                            let LotToAddTemp = {'idProduit' : response.products[0], 'expiration' : new Date()}
                            this.setState({products: response.products, LotToAdd: LotToAddTemp})
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

    onGridReady(params) {
      console.log(params);
      this.api = params.api;
      this.columnApi = params.columnApi.columnController;
      params.api.resetRowHeights();
    }
  
    getProduitById = (id) => {
        let productTemp = this.state.products;
        for (const product of productTemp) {
          if (id.value == product._id) {
            return product
          }
        }
    }
  
    getLotAddProduitById = (id) => {
        let productTemp = this.state.products;
        for (const product of productTemp) {
          if (id == product._id) {
            return product
          }
        }
    }
  
    handleCloseDialog = () => {
      this.setState({
        LotDialogOpen: false
      })
    }
    
    handleChangeProduit = event => {
        console.log("handleChangeProduit : ",event.target.value);
        let LotToAddTemp = this.state.LotToAdd
        LotToAddTemp.idProduit = this.getLotAddProduitById(event.target.value._id)
        this.setState({LotToAdd: LotToAddTemp});
    };

    addLotDialogOpen = () => {
      this.setState({
        LotDialogOpen: true
      })
    }

    handleDateChange = (params) => {
      console.log(params);
      let LotToAddTemp = this.state.LotToAdd;
      LotToAddTemp.expiration = params
      this.setState({LotToAdd: LotToAddTemp});
    }

    onNumLotChange = (event) => {
      console.log(event.target.value);
      let LotToAddTemp = this.state.LotToAdd;
      LotToAddTemp.numLot = event.target.value
      this.setState({LotToAdd: LotToAddTemp});
    }

    onQuantityChange = (event) => {
      console.log(event.target.value);
      let LotToAddTemp = this.state.LotToAdd;
      LotToAddTemp.quantity = event.target.value
      this.setState({LotToAdd: LotToAddTemp});
    }
    
    onAddLot = () => {
        console.log("this.state.productToAdd : ", this.state.LotToAdd);
        StockService.addLot(this.state.LotToAdd.idProduit._id, this.state.LotToAdd.numLot, this.state.LotToAdd.quantity, this.state.LotToAdd.expiration).then(
            res => {
                res.json().then(
                    response => {
                        if (res.ok) {
                          console.log('addProduit response : ', response);
                          let LotToAddTemp = {'idProduit' : this.state.products[0]._id, 'expiration' : new Date()}
                          this.setState({
                            lots: response.lots, 
                            LotDialogOpen: false,
                            LotToAdd: LotToAddTemp
                          })
                        } else {
                            console.log("addProduit failed : ", response.error);
                            // this.setState({displayError: true});
                            // this.setState({errorMessage: response.error});
                        }
                    },
                    error => {
                        console.log('addProduit parse error : ', error);
                    }
                );
            },
            err => {
                console.log('addProduit error : ', err);
            }
        )
      }
  
    onClicked = (params) => {
      console.log(params.data)
      this.setState({
        orderToDisplay: params.data,
        dialogOpen: true
      })
    }

    render() {
        //#region Grid def
        const colDef = [
            {
                "headerName": "Produit",
                "field": "idProduit",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
                "autoHeight": true,
                valueFormatter: (params) => {
                    let produit = this.getProduitById(params);
                  return produit.name;
                }
            },
            {
                "headerName": "Numérot lot",
                "field": "numLot",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
                "autoHeight": true
            },
            {
                "headerName": "quantity",
                "field": "quantity",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
                "autoHeight": true
            },
            {
                "headerName": "expiration",
                "field": "expiration",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
                "autoHeight": true,
                valueFormatter: (params) => {
                    return params.value.substring(0,10)
                }
            }
        ];
    
        const gridOptions = {
            pagination: true,
            paginationPageSize: 50,
            localeText: {
                to: "à",
                of: "sur",
            }
        }
        
        const onColumnResized = (params) => {
          params.api.resetRowHeights();
        };
    
        const rowStyle = { whitespace: 'pre-line' };
        //#endregion
        
        return (
            <div className="m-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Supply" }
                    ]}
                />
                <div className="m-sm-30">
                    <SimpleCard title="Stock">
                        <div
                            className="ag-theme-material"
                            style={{ height: 300, width: '100%' }}
                        >
        
                            <Button autoFocus onClick={this.addLotDialogOpen} color="primary">
                            Add lot
                            </Button>
                            {this.state.products.length !== 0 && 
                            <AgGridReact
                                onGridReady={this.onGridReady}
                                onColumnResized={onColumnResized}
                                onRowClicked={this.onClicked}
                                rowData={this.state.lots}
                                cellStyle={rowStyle}
                                columnDefs={colDef}
                                gridOptions={gridOptions}
                            >
                            </AgGridReact>}
                        </div>
        
                        <Dialog open={this.state.LotDialogOpen} onClose={this.handleCloseDialog}>
                            <DialogTitle id="customized-dialog-title">
                                Add a lot
                            </DialogTitle>
                            <DialogContent dividers>
                                <Select
                                    labelId="shelfName"
                                    value={this.state.LotToAdd.idProduit}
                                    onChange={this.handleChangeProduit}
                                    style={{minWidth: 150}}
                                >
                                    {this.state.products.map((item, index) =>
                                        <MenuItem key={index} value={item}>{item.name}</MenuItem>
                                    )}
                                </Select>
                                <ValidatorForm ref="form" onSubmit={this.onAddLot}>
                                    <TextValidator
                                        className="mb-24 w-100"
                                        variant="outlined"
                                        label="Lot number"
                                        onChange={this.onNumLotChange}
                                        type="number"
                                        name="Lot number"
                                        value={this.state.LotToAdd.numLot}
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                    />
                                    <TextValidator
                                        className="mb-24 w-100"
                                        variant="outlined"
                                        label="Quantity"
                                        onChange={this.onQuantityChange}
                                        type="number"
                                        name="Quantity"
                                        value={this.state.LotToAdd.quantity}
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                    />
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Expiration"
                                                value={this.state.LotToAdd.expiration}
                                                onChange={this.handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />

                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                    <div className="flex flex-middle">
                                        <Button
                                            className="capitalize"
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Add Lot
                                        </Button>
                                    </div>
                                </ValidatorForm>
                                <Button autoFocus onClick={this.handleCloseDialog} color="primary">
                                Close
                                </Button>
                                
                            </DialogContent>
                        </Dialog>
                    </SimpleCard>
                </div>
            </div>
        );
    }
}

export default Supply;
