import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Divider, Rating} from '@mui/material';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";

export default function ProductCard(props) {
    const {
        product_name,
        product_img,
        product_description,
        product_rating,
        product_price,
        slug,
        product_review_num
    } = props
    return (
        <Link to={`${slug}`} className={'no-link-style'}  >
            <Card sx={{maxWidth: 345}} >
                <CardActionArea >
                    <CardMedia

                        component="img"
                        height="140"
                        image={product_img}
                        alt={product_name}
                    />
                    <CardContent style={{height:175, overflow:"hidden"}}>
                        <Stack direction="column" spacing={1} alignContent={'center'}>
                            <Stack direction={'row'} spacing={1} alignContent={'center'}>
                                <Rating name="read-only" value={product_rating} readOnly precision={0.5} size={'medium'}/>
                                <Typography variant={'subtitle1'}>{product_review_num} reviews</Typography>
                            </Stack>
                            <Typography gutterBottom variant="h6" component="div" color="text.secondary">
                                {product_name}
                            </Typography>

                        </Stack>
                        <Typography variant="body2" color="text.secondary" >
                            {product_description}  ...
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Divider/>
                <Box m={2}>
                    <Typography variant={'h5'} color="text.secondary">₹ {product_price}</Typography>
                </Box>
            </Card>
        </Link>
    );
}
