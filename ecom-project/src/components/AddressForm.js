import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function AddressForm() {
    const shippingAddress = JSON.parse(localStorage.getItem('shipping address')) || null
    const initialFormData = {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
    }
    const [addressFormData, setAddressFormData] = React.useState(shippingAddress === null ? initialFormData : shippingAddress)

    function handleChange(event) {
        // event.preventDefault();
        const {name, value} = event.target;
        setAddressFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value
            };
        });

    }

    localStorage.setItem('shipping address', JSON.stringify(addressFormData))

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        onChange={handleChange}
                        value={shippingAddress.address1}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                        onChange={handleChange}
                        value={shippingAddress.address2}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        onChange={handleChange}
                        value={shippingAddress.city}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={shippingAddress.state}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                        onChange={handleChange}
                        value={shippingAddress.zip}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}