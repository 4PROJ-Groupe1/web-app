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
      dataItem: this.props.dataItem || [],
      user: this.props.user || null,
      Items: [],
      dialogOpen: false,
      itemToDisplay: null
    }
  }

  componentDidMount() {
    let itemsTemp = [];
    this.state.dataItem.item.forEach(item => {
      itemsTemp.push(item)
    });
    this.setState({
      Items: itemsTemp
    });
  }

  getEntityFromId = (id) => {
    let entityTemp = this.state.dataItem.entity;
    for (const entity of entityTemp) {
      if (id == entity.id) {
        return entity.name;
      }
    }
  }

  getEntityFromIdInDialog = (id) => {
    let dataTemp = this.state.dataItem;
    for (const entity of dataTemp.entity) {
      if (id == entity.id) {
        return entity.name
      }
    }
  }

  getCategoryFromId = (id) => {
    let dataTemp = this.state.dataItem;
    for (const category of dataTemp.itemCategory) {
      if (id.value == category.id) {
        return category.name
      }
    }
  }

  getCategoryInDialogFromId = (id) => {
    let dataTemp = this.state.dataItem;
    for (const category of dataTemp.itemCategory) {
      if (id == category.id) {
        return category.name
      }
    }
  }

  getItemFromId = (id) => {
    let dataTemp = this.state.dataItem;
    for (const item of dataTemp.item) {
      if (id.value == item.id) {
        return item.name
      }
    }
  }

  getShelfFromId = (id) => {
    let dataTemp = this.state.dataItem;
    for (const shelf of dataTemp.shelf) {
      if (id.value == shelf.id) {
        return shelf.name
      }
    }
  }

  getAllItemsFromSupermarket = (id) => {
    let dataTemp = this.state.dataItem;
    let itemsTemp = this.state.items;
    for (const items of dataTemp.supermarketItem) {
      if (id.value == items.id) {
        itemsTemp.push(items)
      }
    }
  }

  getItemFromId = (id) => {
    for (const item of this.state.items) {
      if (id == item.id) {
        return item.name
      }
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
          {this.state.Items.map((item, index) =>
            <Grid item xs key={index}>
              <Card elevation={6} className="px-24 py-20 h-100"  style={{minWidth: 250, maxWidth: 250}}>
                <div className="card-title">{item.name}</div>
                <br/>
                <div className="card-subtitle mb-24">{this.getEntityFromId(item.sellerId)}</div>
                <Button onClick={this.onClicked.bind(this,item)}>Voir le détail</Button>
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
              <b>Category : </b>{this.getCategoryInDialogFromId(this.state.itemToDisplay?.categoryId)}
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