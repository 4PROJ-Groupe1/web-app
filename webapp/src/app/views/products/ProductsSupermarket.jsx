import React from "react";
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import StockService from "../../services/StockService";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default class ProductsSupermarket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.products || [],
      dialogOpen: false,
      itemToDisplay: null,
      ProductDialogOpen: false,
      productToAdd: []
    }
  }

  onDeleteClicked = () => {
    StockService.deleteProduit(this.state.itemToDisplay._id).then(
        res => {
            res.json().then(
                response => {
                    if (res.ok) {
                        var productsTemp = this.state.products;
                        var index = productsTemp.indexOf(this.state.itemToDisplay)
                        if (index !== -1) {
                          productsTemp.splice(index, 1);
                          this.setState({
                            products: productsTemp,
                            dialogOpen: false,
                            itemToDisplay: null
                          });
                        }
                    } else {
                        console.log("deleteProduit failed : ", response.error);
                        // this.setState({displayError: true});
                        // this.setState({errorMessage: response.error});
                    }
                },
                error => {
                    console.log('deleteProduit parse error : ', error);
                }
            );
        },
        err => {
            console.log('deleteProduit error : ', err);
        }
    )
  }

  handleCloseDialog = () => {
    this.setState({
      dialogOpen: false,
      ProductDialogOpen: false,
      itemToDisplay: {}
    })
  }

  onClicked = (params) => {
    this.setState({
      itemToDisplay: params,
      dialogOpen: true
    })
  }

  onAddProduct = () => {
    StockService.addProduit(this.state.productToAdd.name, this.state.productToAdd.category, this.state.productToAdd.producer, this.state.productToAdd.prix).then(
        res => {
            res.json().then(
                response => {
                    if (res.ok) {
                      console.log('addProduit response : ', response);
                      this.setState({
                        products: response.products, 
                        ProductDialogOpen: false,
                        productToAdd: []
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

  onNameChange = (event) => {
    let product = this.state.productToAdd;
    if (event.target.value != null)
      product.name = event.target.value;

    this.setState({
      productToAdd: product
    });
  }

  onCategoryChange = (event) => {
    let product = this.state.productToAdd;
    if (event.target.value != null)
      product.category = event.target.value;

    this.setState({
      productToAdd: product
    });
  }

  onProducerChange = (event) => {
    let product = this.state.productToAdd;
    if (event.target.value != null)
      product.producer = event.target.value;

    this.setState({
      productToAdd: product
    });
  }

  onPrixChange = (event) => {
    let product = this.state.productToAdd;
    if (event.target.value != null)
      product.prix = event.target.value;

    this.setState({
      productToAdd: product
    });
  }

  addProductDialogOpen = () => {
    this.setState({
      ProductDialogOpen: true
    })
  }

  render() {
    return (
      <div
        className="ag-theme-material"
        style={{ width: '100%' }}
      >
        
        <Button autoFocus onClick={this.addProductDialogOpen} color="primary">
          Add product
        </Button>
        <Grid container spacing={3}>
          {this.state.products.map((item, index) =>
            <Grid item xs key={index}>
              <Card elevation={6} className="px-24 py-20 h-100"  style={{minWidth: 250}}>
                <div className="card-title">{item.name}</div>
                <br/>
                <div className="card-subtitle mb-24">{item.producer}</div>
                <div className="card-subtitle mb-24">{item.prix}€</div>
                <Button onClick={this.onClicked.bind(this,item)}>Details</Button>
              </Card>
            </Grid>
          )}
        </Grid>

        <Dialog open={this.state.dialogOpen} onClose={this.handleCloseDialog}>
          <DialogTitle id="customized-dialog-title">
            {this.state.itemToDisplay?.name}
          </DialogTitle>
          <DialogContent dividers>
            <div style={{overflowY: "auto"}} >
              <b>Category : </b>{this.state.itemToDisplay?.category}
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.onDeleteClicked} color="secondary">
              Delete
            </Button>
            <Button autoFocus onClick={this.handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        
        <Dialog open={this.state.ProductDialogOpen} onClose={this.handleCloseDialog}>
          <DialogTitle id="customized-dialog-title">
            Add a product
          </DialogTitle>
          <DialogContent dividers>
            <ValidatorForm ref="form" onSubmit={this.onAddProduct}>
                <TextValidator
                    className="mb-24 w-100"
                    variant="outlined"
                    label="Name"
                    onChange={this.onNameChange}
                    type="text"
                    name="Name"
                    value={this.state.productToAdd.name}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                />
                <TextValidator
                    className="mb-24 w-100"
                    variant="outlined"
                    label="Category"
                    onChange={this.onCategoryChange}
                    type="text"
                    name="Category"
                    value={this.state.productToAdd.category}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                />
                <TextValidator
                    className="mb-24 w-100"
                    variant="outlined"
                    label="Producer"
                    onChange={this.onProducerChange}
                    type="text"
                    name="Producer"
                    value={this.state.productToAdd.producer}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                />
                <TextValidator
                    className="mb-24 w-100"
                    variant="outlined"
                    label="Prix"
                    onChange={this.onPrixChange}
                    type="text"
                    name="Prix"
                    value={this.state.productToAdd.prix}
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
                        Add Product
                    </Button>
                </div>
            </ValidatorForm>
            <Button autoFocus onClick={this.handleCloseDialog} color="primary">
              Close
            </Button>
            
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}