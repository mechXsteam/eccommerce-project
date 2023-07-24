import {useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductImageZoom from "../components/ProductImageZoom";
import Typography from "@mui/material/Typography";
import {
    Alert,
    Chip,
    Divider,
    FormControl,
    InputLabel,
    LinearProgress,
    Rating,
    Select
} from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssuredWorkloadRoundedIcon from '@mui/icons-material/AssuredWorkloadRounded';
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import Axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import {Context} from "../Context";
import {useNavigate} from "react-router-dom";
import BASE_URL from '../config'


export default function ProductDetail() {
    const navigate = useNavigate()
    const context = React.useContext(Context)
    const {access_token} = context
    // capturing the slug filed from params
    const {slug} = useParams()
    const [product, setProduct] = useState([])
    useEffect(() => {
        async function getProduct() {
            const {data} = await Axios.get(`${BASE_URL}/api_01/${slug}/`)
            setProduct(data) // storing the fetched product in the "product" variable
        }

        getProduct()
    }, [slug])


    const [qty, setQty] = React.useState(1)
    const handleChange = (event) => {
        setQty(event.target.value);
    };

    // Add to cart functionality: store it to the localStorage
    const prevCart = JSON.parse(localStorage.getItem('cart')) || []

    function addToCart() {
        localStorage.setItem('cart', JSON.stringify([...prevCart, {product, qty}]))
        navigate('/cart')

    }

    const [rating, setRating] = React.useState(5);
    const [comment,setComment] = React.useState('')


    function handleRatingForm(event) {
        // event.preventDefault()
        Axios.post(`${BASE_URL}/api_01/review/`,{rating,comment,product_id:product.id},{
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
    }


    // loading simulation
    const [loading, setLoading] = useState(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000)

    if (loading) {
        return <LinearProgress color="inherit"/>
    }


    return <Container sx={{py: 8}}>
        <Grid container spacing={1} style={{display: "flex"}}>
            <Grid item xs={5} my={5} md={6}>
                <ProductImageZoom product_image={product.image}/>
            </Grid>
            <Grid item xs={4} md={6}>
                <Typography variant={'h3'} my={1} color="text.primary">{product.name}</Typography>
                <Divider/>
                <Typography variant={'subtitle1'} my={2} color="text.secondary">{product.description}</Typography>
                <Divider/>
                <Stack direction="row" spacing={1} alignContent={'center'} my={2}>
                    <Rating name="read-only" value={product.rating} readOnly precision={0.5} size={'medium'}/>
                    <Typography>{product.numReviews} reviews</Typography>
                </Stack>
                <Divider/>
                <Typography variant={'h5'} my={2} color="text.secondary">₹ {product.price}</Typography>
                <Divider/>
                <Stack direction={'row'} spacing={1} my={2}>
                    <Stack direction={'row'}>
                        <CurrencyRupeeIcon fontSize={'medium'}/><Chip size={'small'}
                                                                      label={<Typography variant={'subtitle2'}
                                                                                         alignItems={'center'}
                                                                                         color="text.secondary">Pay on
                                                                          delivery</Typography>}/>
                    </Stack>
                    <Stack direction={'row'}>
                        <AssuredWorkloadRoundedIcon fontSize={'medium'}/><Chip size={'small'}
                                                                               label={<Typography variant={'subtitle2'}
                                                                                                  alignItems={'center'}
                                                                                                  color="text.secondary">Secured
                                                                                   transaction</Typography>}/>
                    </Stack>
                    <Stack direction={'row'}>
                        <LocalShippingIcon fontSize={'medium'}/><Chip size={'small'}
                                                                      label={<Typography variant={'subtitle2'}
                                                                                         alignItems={'center'}
                                                                                         color="text.secondary">Delivery
                                                                          within 5 days</Typography>}/>
                    </Stack>
                </Stack>
                <Divider/>
                <Stack direction={'row'} my={2} justifyContent={'space-between'}>
                    <FormControl sx={{minWidth: 120}} disabled={product.countInStock <= 0}>
                        <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={qty}
                            label="Quantity"
                            onChange={handleChange}
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
                    </FormControl>
                    <Button variant={'contained'} color={'success'} disabled={product.countInStock <= 0}
                            onClick={addToCart}>Add to cart &nbsp;
                        <AddShoppingCartRoundedIcon/>
                    </Button>
                    {product.countInStock ? <Alert severity="success">In stock</Alert> :
                        <Alert severity="error">Out of stock</Alert>}
                </Stack>
            </Grid>
        </Grid>
        <Container sx={{py: 8}}>
            <Typography variant={'h3'}>Reviews</Typography>
            <Grid container spacing={5} >
                <Grid item md={6}>
                    <Stack my={4} spacing={2}>{product.review.map((item) =>
                        <Paper sx={{padding: 3}} elevation={10}>
                            <Typography variant={'h6'}>{item.name} <Rating size={'small'} name="read-only" value={item.rating} readOnly/></Typography>
                            <Typography variant={'subtitle1'} color={'darkorange'}>{new Date(item.createdAt).toDateString()}</Typography>
                            <Divider sx={{my:2}}/>
                            <Typography color={"white"}>{item.comment}</Typography>
                        </Paper>
                    )}
                    </Stack>
                </Grid>
                <Grid item md={5} alignItems={'center'}>
                    <Box component="form" noValidate sx={{mt: 1}}  onSubmit={handleRatingForm}>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="comment"
                            label="Comment"
                            name="comment"
                            autoComplete="text"
                            autoFocus
                            onChange={(e)=>setComment(e.target.value)}
                        />
                        <Button variant={'contained'} color={'success'} type={'submit'}>Add Rating</Button>
                    </Box>
                </Grid>

            </Grid>
        </Container>
    </Container>
}