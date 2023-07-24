import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Axios from "axios";
import jwtDecode from "jwt-decode";
import {useState} from "react";

const steps = ['Shipping address', 'Payment details', 'Review your order'];


function getStepContent(step) {

    switch (step) {
        case 0:
            return <AddressForm/>;
        case 1:
            return <PaymentForm/>;
        case 2:
            return <Review/>;
        default:
            throw new Error('Unknown step');
    }
}

const ORDERED_ITEMS = JSON.parse(localStorage.getItem('cart')) // add to cart items
const SHIPPING_ADDRESS = JSON.parse(localStorage.getItem('shipping address')) // where to send this order ...

// calculating the total price
let TOTAL = 0;
if (ORDERED_ITEMS) {
    ORDERED_ITEMS.map((item) => {
        TOTAL += item.product.price * item.qty
    })
}

// minimum order value above which shipping charges are zero
const THRESHOLD_ORDER_VALUE = 500000

// applying the GST of 18%
const TAX_PRICE = (18 * TOTAL) / 100

// if the total price calculated is greater than the threshold, we charge zero as the shipping price, 200 otherwise.
const SHIPPING_PRICE = THRESHOLD_ORDER_VALUE - TOTAL < 0 ? 200 : 0

// net payable amount by the end user
const GRAND_TOTAL = TOTAL + SHIPPING_PRICE + TAX_PRICE

// access token which needs to passed to the headers for authentication
const ACCESS_TOKEN = localStorage.getItem('access_token') || null
const {user_id, username} = ACCESS_TOKEN ? jwtDecode(ACCESS_TOKEN) : {user_id:null}

// this is the data which handles the checkout, it contains all the information. We will use this data to create order
// object in the backend and later attach the ordered items in the cart to it.
const PRODUCT_DATA = {
    user: user_id,
    shippingPrice: SHIPPING_PRICE,
    totalPrice: GRAND_TOTAL,
    taxPrice: TAX_PRICE,
    orderItems: ORDERED_ITEMS !== null ? [...ORDERED_ITEMS] : [],
    shippingAddress: SHIPPING_ADDRESS,
}


export default function Checkout() {
    const [orderId, setOrderId] = React.useState()
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep(activeStep + 1);
        if (activeStep === steps.length - 1) {
            Axios.post('http://localhost:8000/api_01/order/', PRODUCT_DATA, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                }
            })
                .then(res => {
                    localStorage.removeItem('cart')
                    setOrderId(res.data['order id'])

                })
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const [loading,setLoading] = useState(true)
    setTimeout(()=>{
        setLoading(false)
    },1000)


    return (
        <React.Fragment>
            <CssBaseline/>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                We got your order, we will deliver it soon (under 5 days)
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #{orderId}. You can track your order in the profile
                                section in the tab My orders.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} variant={'contained'} color={'warning'}
                                            sx={{mt: 3, ml: 1}}>
                                        Back
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{mt: 3, ml: 1}}
                                    color={'warning'}
                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </React.Fragment>
    );
}