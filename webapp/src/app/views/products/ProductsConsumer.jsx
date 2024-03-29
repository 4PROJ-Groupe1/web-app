import React from "react";
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export default class ProductsConsumer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user || null,
      products: this.props.products,
      Items: [],
      dialogOpen: false,
      itemToDisplay: null
    }
  }

  handleCloseDialog = () => {
    this.setState({
      dialogOpen: false,
      itemToDisplay: {}
    })
  }

  onClicked = (params) => {
    this.setState({
      itemToDisplay: params,
      dialogOpen: true
    })
  }

  render() {
    return (
      <div
          className="ag-theme-material"
          style={{ width: '100%' }}
      >
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
            <Button autoFocus onClick={this.handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}