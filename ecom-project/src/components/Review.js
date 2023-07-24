import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {Alert} from "@mui/material";




export default function Review() {
    const [orderedProducts,setOrderedProducts] = React.useState([])
    React.useEffect(()=>{
        setOrderedProducts(JSON.parse(localStorage.getItem('cart')))
    },[])

    const SHIPPING_CHARGES = 200
    const THRESHOLD_ORDER_VALUE = 500000


    let total = 0;
    orderedProducts.map((item)=>{total += item.product.price*item.qty})
    const shippingAddress = JSON.parse(localStorage.getItem('shipping address'))

    const cardDetails = JSON.parse(localStorage.getItem('cardDetails'))
    const payments = [
        {name: 'Card holder', detail: cardDetails.cardName},
        {name: 'Card number', detail: cardDetails.cardNumber},
        {name: 'Expiry date', detail: cardDetails.expDate},
        {name: 'CVV', detail: cardDetails.cvv},
    ];
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {orderedProducts.map((item) => (
                    <ListItem key={item.product.id} sx={{py: 1, px: 0}}>
                        <ListItemText primary={item.product.name} secondary={item.product.description.substring(1,30) + "..."}/>
                        <Typography variant="body2">{"₹ "+item.product.price+" X "+item.qty +" = ₹ "+ item.product.price*item.qty}</Typography>
                    </ListItem>
                ))}
                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Shipping charges"/>
                    <Typography variant="subtitle1" sx={{fontWeight: 700}} color={'yellow'}>
                        ₹ {total > THRESHOLD_ORDER_VALUE ? 0 : SHIPPING_CHARGES}
                    </Typography>
                </ListItem>
                {THRESHOLD_ORDER_VALUE - parseInt(total) > 0 ? <Alert severity="info">Add items worth ₹ {THRESHOLD_ORDER_VALUE-parseInt(total)} to get free shipping</Alert>: <Alert severity={'success'}>Free shipping</Alert> }
                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle1" sx={{fontWeight: 700}} color={'yellow'}>
                        ₹ {total > 500000 ? total : total + SHIPPING_CHARGES}
                    </Typography>
                </ListItem>

            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{mt: 2}}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom color={'text.secondary'}>{cardDetails.cardName}</Typography>
                    <Typography gutterBottom color={'text.secondary'}
                                variant={'subtitle2'}>{shippingAddress.address1}</Typography>
                    <Typography gutterBottom color={'text.secondary'}
                                variant={'subtitle2'}>{shippingAddress.address2}</Typography>
                    <Typography gutterBottom color={'text.secondary'}
                                variant={'subtitle2'}>{shippingAddress.state}</Typography>
                    <Typography gutterBottom color={'text.secondary'}
                                variant={'subtitle2'}>{shippingAddress.city}, {shippingAddress.zip}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{mt: 2}}>
                        Payment details
                    </Typography>
                    <Grid container color={'white'}>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}