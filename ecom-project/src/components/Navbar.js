import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import {styled, alpha} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Stack from "@mui/material/Stack";
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Axios from 'axios'

import {Route, Routes, Link, useNavigate, useParams} from "react-router-dom";

import ProductsListing from "../pages/ProductsListing";
import ProductDetail from "../pages/ProductDetail";
import SignIn from '../pages/SignIn'
import Register from "../pages/Register";
import jwtDecode from "jwt-decode";
import {Context} from '../Context'
import {useEffect, useState} from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import Profile from "../pages/Profile";
import PlaceOrder from "../pages/PlaceOrder";
import BASE_URL from "../config";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function Navbar() {
    const [productList,setProductList] = useState([])
    useEffect(()=>{
        async function getProductList() {
            const {data} = await Axios.get(`${BASE_URL}/api_01/`)
            setProductList(data)
        }
        getProductList()
    },[])
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const navigate = useNavigate()
    const context = React.useContext(Context)
    const {isLoggedIn, setIsLoggedIn, access_token} = context
    const [username, setUsername] = React.useState(null)

    useEffect(() => {
        if (access_token !== null) {
            const userDetails = jwtDecode(access_token)
            const {first_name, last_name} = userDetails
            setUsername(first_name + " " + last_name)
        }
    }, [isLoggedIn])

    function logout() {
        localStorage.removeItem('access_token')
        navigate('/product-listings')
        setIsLoggedIn(false)
    }


    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <LocalMallIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            SHOPPING EARTH
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {/* For small screen devices */}
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link className={'no-link-style'} to={'/product-listings'}
                                          textAlign="center">Products</Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link className={'no-link-style'} to={'/cart'} textAlign="center">Cart</Link>
                                </MenuItem>
                                {/* All other links to be added   */}
                            </Menu>
                        </Box>
                        <LocalMallIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            SHOPPING EARTH
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {/* For large screen devices */}
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                <Link className={'no-link-style'} to={'/product-listings'}
                                      sx={{my: 2, color: 'white', display: 'block'}} textAlign="center">Products</Link>
                            </Button>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                <Link className={'no-link-style'} to={'/cart'}
                                      sx={{my: 2, color: 'white', display: 'block'}} textAlign="center">Cart</Link>
                            </Button>
                            {/* All other links to be added   */}

                        </Box>
                        <Stack direction={'row'} sx={{flexGrow: 0}}>
                            <Search sx={{my: 2, mx: 5, color: 'white', display: 'block'}}>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{'aria-label': 'search'}}
                                    // value={searchForm}
                                    onChange={(e) => {
                                        navigate(`/product-listings/?keyword=${e.target.value}`)
                                        const urlSearchParams = new URLSearchParams(window.location.search);
                                        const keyword = urlSearchParams.get('keyword');
                                        Axios.get(`${BASE_URL}/api_01/?=${keyword}`)
                                            .then(response => {
                                                console.log(response)
                                                setProductList(response.data)
                                            })
                                    }}

                                />
                            </Search>
                            {isLoggedIn ? <Tooltip title="Click to open">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp"
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8LrGjiUDcvYjUMk7jUJJZo0kK4Y4NzKxmQ&usqp=CAU"/>
                                </IconButton>
                            </Tooltip> : <Button
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                <Link className={'no-link-style'} to={'/sign-in'}
                                      sx={{my: 2, color: 'white', display: 'block'}} textAlign="center">Sign In</Link>
                            </Button>}
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={() => {
                                    navigate('/profile')
                                }}>
                                    <Typography textAlign="center">{username}</Typography>
                                </MenuItem>
                                <MenuItem onClick={logout}>
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <Typography textAlign="center">logout </Typography>
                                        <LogoutIcon fontSize={'small'}/>
                                    </Stack>
                                </MenuItem>
                            </Menu>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/product-listings">
                    <Route index element={<ProductsListing products={productList}/>}/>
                    <Route path=":slug" element={<ProductDetail/>}/>
                </Route>
                <Route path="/cart" element={<Cart/>}></Route>
                <Route path="/sign-in" element={<SignIn/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/place-order" element={<PlaceOrder/>}></Route>

            </Routes>

        </>
    )
        ;
}

export default Navbar;
