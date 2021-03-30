import React from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Icon,
  TableRow
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
console.log(1)
//console.log(this.props.dataItem);
console.log(2)
var width = 150;

const columns = [
  { field: 'orderDate', headerName: 'Order Date', width: width },
  { field: 'deliveryDate', headerName: 'Delivery Date', width: width },
  { field: 'address', headerName: 'Address', width: width },
  { field: 'price', headerName: 'Price', width: width },
  { field: 'supermarket', headerName: 'Supermarket', width: width },
  { field: 'producer', headerName: 'Producer', width: width }
]

const rows = [
  { id: 1, orderDate: 1, deliveryDate: 'Snow', address: 'Jon', price: 35, supermarket: "supertest", producer: "producertest" },
  { id: 2, orderDate: 1, deliveryDate: 'Snow', address: 'Jon', price: 35, supermarket: "supertest", producer: "producertest" },
  { id: 3, orderDate: 1, deliveryDate: 'Snow', address: 'Jon', price: 35, supermarket: "supertest", producer: "producertest" },
  { id: 4, orderDate: 1, deliveryDate: 'Snow', address: 'Jon', price: 35, supermarket: "supertest", producer: "producertest" },
  { id: 5, orderDate: 1, deliveryDate: 'Snow', address: 'Jon', price: 35, supermarket: "supertest", producer: "producertest" },
  { id: 6, orderDate: 1, deliveryDate: 'Snow', address: 'Jon', price: 35, supermarket: "supertest", producer: "producertest" },
  { id: 7, orderDate: 1, deliveryDate: 'Snow', address: 'Jon', price: 35, supermarket: "supertest", producer: "producertest" },
  { id: 8, orderDate: 1, deliveryDate: 'Snow', address: 'Jon', price: 35, supermarket: "supertest", producer: "producertest" },
];

const items = [
  {
    name: "ballon",
    categoryId: 1,
    sellerId: 1
  }
]

const subscribarList = [
  {
    orderDate: "18 january, 2019",
    deliveryDate: "18 january, 2019",
    address: "10 rue quelquepart",
    price: 10,
    items: "test",
    supermarketId: 8,
    producerId: 7
  }
];

const OrdersTable = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5}/>
      {/* <Table style={{ whiteSpace: "pre" }}>
        <TableHead>
          <TableRow>
            <TableCell className="px-0">Order Date</TableCell>
            <TableCell className="px-0">Delivery Date</TableCell>
            <TableCell className="px-0">Address</TableCell>
            <TableCell className="px-0">Price</TableCell>
            <TableCell className="px-0">Supermarket</TableCell>
            <TableCell className="px-0">Producer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscribarList.map((subscriber, index) => (
            <TableRow key={index}>
              <TableCell className="px-0 capitalize" align="left">
                {subscriber.orderDate}
              </TableCell>
              <TableCell className="px-0 capitalize" align="left">
                {subscriber.deliveryDate}
              </TableCell>
              <TableCell className="px-0 capitalize" align="left">
                {subscriber.address}
              </TableCell>
              <TableCell className="px-0 capitalize">
                ${subscriber.price}
              </TableCell>
              <TableCell className="px-0 capitalize">
                {subscriber.supermarketId}
              </TableCell>
              <TableCell className="px-0 capitalize">
                {subscriber.producerId}
              </TableCell>
              <TableCell className="px-0">
                <IconButton>
                  <Icon color="error">close</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </div>
  );
};

export default OrdersTable;
