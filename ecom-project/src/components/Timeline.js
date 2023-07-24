import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function LeftPositionedTimeline(props) {
    const {isPacked,isShipped,isDelivered} = props
    console.log("inside timeline",props)
    return (
        <Timeline position="left">

            <TimelineItem>
                <TimelineSeparator>
                    {isPacked ? <TimelineDot color={'success'} />: <TimelineDot variant={"outlined"}/>}
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Packed&nbsp;&nbsp;&nbsp;</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    {isShipped ? <TimelineDot color={'success'}/>: <TimelineDot variant={"outlined"}/>}
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Shipped&nbsp;&nbsp;</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    {isDelivered ? <TimelineDot color={'success'} />: <TimelineDot variant={"outlined"}/>}
                </TimelineSeparator>
                <TimelineContent>Delivered</TimelineContent>
            </TimelineItem>

        </Timeline>
    );
}
