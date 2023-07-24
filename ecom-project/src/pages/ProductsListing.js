import ProductCard from '../components/ProductCard'
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {useState} from "react";
import {LinearProgress} from "@mui/material";

export default function ProductsListing(props) {
    const {products} = props

    // loading simulation
    const [loading, setLoading] = useState(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000)

    if (loading) {
        return <LinearProgress color="inherit"/>
    }

    return (
        <>
            <Container sx={{py: 8}}>
                <Grid container spacing={12}>
                    {products.map(product => <Grid item xs={12} sm={6} md={4}>
                        <ProductCard
                            product_name={product.name}
                            product_img={product.image}
                            product_description={product.description.substring(0, 200)}
                            product_rating={product.rating}
                            product_price={product.price}
                            product_delivery_date={product.product_delivery_date} // TODO: to be configured
                            slug={product.slug}
                            product_review_num={product.numReviews}
                        />
                    </Grid>)}
                </Grid>
            </Container>
        </>
    )
}



