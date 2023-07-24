// MUI components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Divider, FormControl, InputLabel, LinearProgress, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Link} from 'react-router-dom'
import {Context} from '../Context'

import * as React from "react";

// Empty cart SVG as component
import {ReactComponent as EmptyCart} from "../assets/empty-cart.svg";


function BasicTable(props) {

    const {handleChange, cartItems, quantity, handleDelete} = props

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableBody>
                    {cartItems.map((row) => (
                        <TableRow
                            key={row.product.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="right"><img className={'cart-image'} src={row.product.image}
                                                          alt=""/></TableCell>
                            <TableCell component="th" scope="row">
                                <Typography variant={'h4'}>{row.product.name}</Typography>
                                <Typography variant={'subtitle2'} color={'white'}>₹ {row.product.price}</Typography>
                            </TableCell>
                            <TableCell id={row.product.id} align="right"><FormControl sx={{minWidth: 120}}
                                                                                      disabled={row.product.countInStock <= 0}>
                                <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Quantity"
                                    onChange={(event) => {
                                        handleChange(event, row.product.id, quantity)
                                    }}
                                    value={row.qty}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>
                            </FormControl></TableCell>
                            <TableCell align="right"><DeleteIcon fontSize={'large'}
                                                                 onClick={() => handleDelete(row.product.id)}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default function Cart() {


    const {isLoggedIn, setIsLoggedIn,access_token} = React.useContext(Context)

    React.useEffect(() => {
        if (access_token !== null) {
            setIsLoggedIn(true)
        }
    }, [])

    // calculate the sub total

    let totalItems = 0
    let subTotal = 0
    // handle the qty dropdown
    const [cartItems, setCartItems] = React.useState(JSON.parse(localStorage.getItem('cart')) || []);

    // the position of this localStorage statement is important, I do not know why this works here...
    localStorage.setItem('cart', JSON.stringify(cartItems))
    const [quantity, setQuantity] = React.useState(1);
    const handleChange = (event, itemId, qty) => {
        setQuantity(qty);
        setCartItems(prevCartItems =>
            prevCartItems.map(item =>
                item.product.id === itemId ? {...item, qty: event.target.value} : item
            )
        );
    };
    const handleDelete = (itemId) => {
        const updatedCart = cartItems.filter(item => item.product.id !== itemId)
        setCartItems(updatedCart)
    }

    cartItems.map((item) => (totalItems += item.qty, subTotal += item.qty * item.product.price))

    // loading simulation

    const [loading,setLoading] = React.useState(true)
    setTimeout(()=>{
        setLoading(false)
    },500)

    if(loading){
        return <LinearProgress color="inherit" />
    }

    return (
        <Container>
            {cartItems.length > 0 ? <Grid container spacing={12} my={1}>
                <Grid item md={8}><BasicTable handleChange={handleChange} cartItems={cartItems}
                                              quantity={quantity} handleDelete={handleDelete}/> </Grid>
                <Grid item md={4}>
                    <Box column={'column'}>
                        <Stack my={2}><Typography variant={'h3'}>Subtotal Items </Typography></Stack>
                        <Stack my={2}><Typography variant={'h3'}>{totalItems}</Typography></Stack>
                        <Divider/>
                        <Stack my={2}><Typography color={'text.secondary'} variant={'h6'}>Total amount -
                            ₹ {subTotal.toLocaleString('en-IN')}</Typography></Stack>
                        <Divider/>
                        <Stack my={2}>
                            {isLoggedIn ? <Button size={'large'} variant={'contained'} color={'inherit'}><Link
                                className={'no-link-style'} to={'/place-order'}>Proceed to
                                checkout</Link>
                            </Button> : <Button size={'large'} variant={'contained'} color={'inherit'}><Link
                                className={'no-link-style'} to={'/sign-in'}>Please sign in</Link>
                            </Button>}
                        </Stack>
                    </Box>
                </Grid>
            </Grid> : <Container sx={{display:'flex',justifyContent:'center',marginTop:5}}>
                <EmptyCart/>
            </Container>}
        </Container>
    )
}