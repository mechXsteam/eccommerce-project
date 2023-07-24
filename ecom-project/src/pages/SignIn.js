import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Axios from 'axios'
import {useNavigate} from "react-router-dom";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import {Context} from '../Context'
import {useState} from "react";
import {LinearProgress} from "@mui/material";
import BASE_URL from '../config'


export default function SignIn() {
    const context = React.useContext(Context)
    const {setIsLoggedIn} = context
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        const signInCredentials = {
            username: data.get('email'),
            password: data.get('password')
        }
        Axios.post(`${BASE_URL}/api/token/`, signInCredentials)
            .then(response => {
                const {access,username,first_name,last_name} = response.data
                console.log(username,first_name,last_name)
                localStorage.setItem("userDetails",JSON.stringify({username,first_name,last_name}))
                localStorage.setItem('access_token', access)
                setIsLoggedIn(true)
                navigate('/profile')
            })
            .catch(error => {
                console.error(error);
            });

    };

    const [loading,setLoading] = useState(true)
    setTimeout(()=>{
        setLoading(false)
    },1000)

    if(loading){
        return <LinearProgress color="inherit" />
    }

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
                <Avatar sx={{m: 1, bgcolor: 'text.primary'}}>
                    <LocalMallIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        color={'success'}
                    >
                        Sign In
                    </Button>
                    <Grid container >
                        <Grid item xs>
                            <Link href="#" variant="body2" color={'text.secondary'} >
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link onClick={() => {
                                navigate('/register')
                            }} style={{cursor: "pointer"}} variant="body2" color={'text.secondary'}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}