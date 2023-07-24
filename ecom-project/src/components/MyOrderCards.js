import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Chip, Divider, ListItem} from "@mui/material";
import List from "@mui/material/List";
import LeftPositionedTimeline from './Timeline'
import Stack from "@mui/material/Stack";


export default function ImgMediaCard(props) {
    const {orderDetails} = props
    const {orderItems, totalPrice, isPacked, isShipped, isDelivered,createdAt} = orderDetails
    console.log('i am props', isDelivered)
    return (
        <Stack direction={'row'} style={{marginBottom: '2rem'}} alignItems={'center'}>
            <LeftPositionedTimeline isPacked={isPacked} isShipped={isShipped} isDelivered={isDelivered}/>
            <Card style={{minWidth: 400, height: '50%'}}>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Ordered at: {new Date(createdAt).toDateString()}
                    </Typography>
                    <Divider/>
                    <List>
                        {orderItems.map((order) => <ListItem>{order.name}, ₹{order.price} x {order.qty} =
                            ₹{order.price * order.qty}</ListItem>)}
                    </List>
                </CardContent>
                <CardActions sx={{mx: 3}}>
                    <Chip label={"₹ " + totalPrice} color={'warning'}/>
                </CardActions>
            </Card>

        </Stack>

    );
}