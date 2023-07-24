import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Context} from "../Context";
import Axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import jwtDecode from "jwt-decode";
import MyOrderCards from '../components/MyOrderCards'
import {useState} from "react";
import {LinearProgress} from "@mui/material";
import BASE_URL from '../config'

function UpdateProfileForm() {

    const context = React.useContext(Context)
    const {access_token, setIsLoggedIn} = context
    const {user_id} = jwtDecode(access_token)

    const [formData, setFormData] = React.useState({})
    React.useEffect(() => {
        Axios.get(`${BASE_URL}/users/${user_id}/`)
            .then(response => setFormData(response.data))
    }, [user_id])


    function handleChange(event) {
        // event.preventDefault();
        const {name, value} = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value
            };
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.get('first_name');
        data.get('last_name');
        data.get('username');
        data.get('password');

        Axios.patch(`${BASE_URL}/users/${user_id}/`, formData, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
            .then(response => {
                Axios.post(`${BASE_URL}/api/token/`, {
                    username: formData.username,
                    password: formData.password
                })
                    .then(response => {
                        const {access} = response.data
                        localStorage.setItem('access_token', access)
                        console.log('access token', access)
                        setIsLoggedIn(true)
                    })
                    .catch(error => {
                        console.error(error);
                    });
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            });

    };

    // loading simulation


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Profile
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="first_name"
                                required
                                fullWidth
                                id="firstName"
                                autoFocus
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                name="last_name"
                                autoComplete="family-name"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                name="username"
                                autoComplete="email"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="New password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        color={'success'}
                    >
                        Update Profile
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

function MyOrders() {
    const [orders, setOrders] = React.useState([])
    const context = React.useContext(Context)
    const {access_token} = context
    React.useEffect(() => {
        Axios.get(`${BASE_URL}/api_01/order/`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(response => {
            setOrders(response.data)
            console.log("fetched all the orders", response)
        })
    }, [access_token])
    return <Container sx={{my: 4}}>
        <Grid container alignItems={'center'} direction={'column'}>
            <Grid item><Typography variant={'h4'} my={2}>My orders</Typography></Grid>
            <Grid item>
                {orders.map((item) => <MyOrderCards orderDetails={item}/>)}
            </Grid>
        </Grid>
    </Container>
}

export default function Profile() {

    const [loading,setLoading] = useState(true)
    setTimeout(()=>{
        setLoading(false)
    },1000)

    if(loading){
        return <LinearProgress color="inherit" />
    }

    return <Container>
        <Grid container spacing={12}>
            <Grid item md={5}><UpdateProfileForm/></Grid>
            <Grid item md={7}><MyOrders/></Grid>
        </Grid>
    </Container>
}
