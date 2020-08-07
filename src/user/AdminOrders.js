import React, {useState,useEffect} from 'react';
import {Navbar} from '../Navar/Navbar';
import {Banner} from "../Banner/Banner";
import {GlobalStyle} from "../Styles/GlobalStyle";
import styled from 'styled-components';
import {isAuthenticated} from '../auth';
import {listOrders, getStatusValues, updateOrderStatus} from "../admin/adminApi";
import moment from 'moment';
import {getPrice} from "../FoodDialog/FoodDialog";
//import Table from 'react-bootstrap/Table'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

const OrderContainer = styled.div`
    padding: 10px 0px;
    border-bottom: 1px solid grey;
`

function AdminOrders() {
        const [orders, setOrders] = useState([]);
        const [statusValues, setStatusValues] = useState([]);
        const {user, token} = isAuthenticated();
    
        const ordersToProcess = orders.filter(
            (order) => (order.status !== 'Completed' && order.status!== 'Cancelled'))
            
        const loadOrders = () => {
            listOrders(user._id, token).then(data => {
                if(data.error){
                    console.log(data.error);
                } else {
                    setOrders(data);
                }
            });
        };
    
        const loadStatusValues = () => {
            getStatusValues(user._id, token).then(data => {
                if(data.error){
                    console.log(data.error);
                } else {
                    setStatusValues(data);
                }
            });
        };
    
        useEffect(()=>{
            loadOrders();
            loadStatusValues();
        }, []);
    
        const showOrdersLength = () => {
            if(orders.length>0){
                return(
                    <h1 className="text-danger">
                        Total Orders: {ordersToProcess.length}
                        </h1>
                );
            } else {
                return <h1 className="text-danger">No orders</h1>;
            }
        };
    
        const showInput = (key, value) => (
            <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                    <div className="input-group-text">{key}
                    </div>
                </div>
                <input 
                type="text" 
                value={value} 
                className="form-control" 
                readOnly>
                </input>
            </div>
     );
    
        const handleStatusChange = (e, orderId) => {
            updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
                if(data.error){
                    console.log('Status update failed')
                }else{
                    loadOrders();
                }
            });
        };
            
        const showStatus = (o) => (
            <div className="form-group">
                <h3 className="mark mb-4">Status: {o.status}</h3>
                <select 
                className="form-control" 
                onChange={e => handleStatusChange(e, o._id)}>
                    <option>Update Status</option>
                    {statusValues.map((status, index) => (
                        <option key={index} value={status}>
                        {status}
                        </option>
                        ))};
                </select>
            </div>
        );

        function CustomizedTables() {
            const classes = useStyles();
            
          return (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Order #</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                    <StyledTableCell align="right">Name</StyledTableCell>
                    <StyledTableCell align="right">Delivery Address</StyledTableCell>
                    <StyledTableCell align="right">Total</StyledTableCell>
                    <StyledTableCell align="right">Delivery Method</StyledTableCell>
                    <StyledTableCell align="right">Status</StyledTableCell>
                    <StyledTableCell align="right">Items</StyledTableCell>
                    <StyledTableCell align="right">Quantity</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ordersToProcess.map((o, oIndex)  => (
                    <StyledTableRow key={oIndex}>
                      <StyledTableCell component="th" scope="row">
                        {o._id}
                      </StyledTableCell>
                      <StyledTableCell align="right">{moment(o.createdAt).fromNow()}</StyledTableCell>
                      <StyledTableCell align="right">{o.ShipName}</StyledTableCell>
                  <StyledTableCell align="right">
                    <div>{o.ShipAddress}</div>
                    <div>{o.ShipCity}{", "}{o.ShipState}{" "}{o.ShipZip}</div>
                    </StyledTableCell>
                      <StyledTableCell align="right">{'$'}{o.totalPrice.toFixed(2)}</StyledTableCell>
                      <StyledTableCell align="right">{o.method}</StyledTableCell>
                      <StyledTableCell align="right">{showStatus(o)}</StyledTableCell>
                      <StyledTableCell align="right">{o.orderItems.map ((p, pIndex) => (
                                        <div 
                                        className="mb-4" 
                                        key={pIndex} 
                                        style={{
                                            padding: '5px', 
                                            border: '1px solid indigo'}}>
                                            {('Product name', p.name)}
                                        </div>
                                    ))}</StyledTableCell>
                                    <StyledTableCell align="right">{o.orderItems.map ((p, pIndex) => (
                                        <div 
                                        className="mb-4" 
                                        key={pIndex} 
                                        style={{
                                            padding: '5px', 
                                            border: '1px solid indigo'}}>
                                            {('Product Quantity', p.quantity)}
                                        </div>
                                    ))}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
        }

    return (
    <>
    <GlobalStyle/>
    <Navbar/>
    <Banner/>
    {showOrdersLength()}
    {CustomizedTables()}
                    {/* <Table striped bordered hover>                       
                     <thead >
                            <tr >
                            <th>ID</th>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Total</th>
                            <th>Delivery Method</th>
                            <th>Status</th>
                            <th>Items</th>
                            </tr>
                            </thead>
                            <tbody>
                                {ordersToProcess.map((o, oIndex) => <tr key={oIndex}>
                                    <td>{o._id}</td>
                                    <td>{moment(o.createdAt).fromNow()}</td>
                                    <td>{o.user.name}</td>
                                    <td>{'$'}{o.totalPrice.toFixed(2)}</td>
                                    <td>{o.method}</td>
                                    <td>{showStatus(o)}</td>
                                    <td>
                                    {o.orderItems.map ((p, pIndex) => (
                                        <div 
                                        className="mb-4" 
                                        key={pIndex} 
                                        style={{
                                            padding: '5px', 
                                            border: '1px solid indigo'}}>
                                            {showInput('Product name', p.name)}
                                            {showInput('Product total', p.quantity)}
                                        </div>
                                    ))}
                                    </td>
                                </tr>)}
                            </tbody>
                    </Table>             */}
        );
   </>
  );
}

export default AdminOrders;
