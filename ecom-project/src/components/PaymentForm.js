import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function PaymentForm() {
    const cardDetails = JSON.parse(localStorage.getItem('cardDetails'))
    const initialFormData = {
        cardName : '',
        cardNumber : '',
        cvv : '',
        expDate : '',
    }
    const [cardDetailsFormData,setCardDetailsFormData] = React.useState(cardDetails === null ? initialFormData : cardDetails)

    function handleChange(event) {
        // event.preventDefault();
        const {name, value} = event.target;
        setCardDetailsFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value
            };
        });

    }
    localStorage.setItem('cardDetails',JSON.stringify(cardDetailsFormData))
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardName"
                        name="cardName"
                        label="Name on card"
                        fullWidth
                        autoComplete="cc-name"
                        variant="standard"
                        onChange={handleChange}
                        value={cardDetails.cardName}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardNumber"
                        name="cardNumber"
                        label="Card number"
                        fullWidth
                        autoComplete="cc-number"
                        variant="standard"
                        onChange={handleChange}
                        value={cardDetails.cardNumber}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="expDate"
                        name="expDate"
                        label="Expiry date"
                        fullWidth
                        autoComplete="cc-exp"
                        variant="standard"
                        onChange={handleChange}
                        value={cardDetails.expDate}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        name="cvv"
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                        onChange={handleChange}
                        value={cardDetails.cvv}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}