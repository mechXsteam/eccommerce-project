import Spline from '@splinetool/react-spline';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <Grid container alignItems={'center'}>
            <Grid item md={4} py={2} px={5}>
                <Typography color={'darkorange'} variant={'h1'}>Shopping Earth...</Typography>
                <Typography variant={'h4'}>"Welcome to Shopping Earth - Your Ultimate Shopping Destination!</Typography>
                <Button sx={{my:3}} variant={"contained"} color={'warning'}><Link className={'no-link-style'} to={'/product-listings'}>Explore</Link></Button>
            </Grid>
            <Grid item md={8} sx={{height:'100vh'}}><Spline scene="https://prod.spline.design/SDbZvvuN3uIZoWoB/scene.splinecode" />
            </Grid>
        </Grid>
    );
}
