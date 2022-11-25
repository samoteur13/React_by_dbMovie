import React from 'react';
import {Link} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import StarIcon from '@mui/icons-material/Star';
import Grid from '@mui/material/Unstable_Grid2';


const Cards = (props) => {

    let url = '/detail-du-filme/'+ props.id
    
    return (
        <Grid xs={6} sm={4} md={3} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
            <Card>
                <CardMedia
                    component="img"
                    height="100%"
                    image={props.img}
                    alt={props.img}
                />
                <CardHeader
                    title={props.title}
                    subheader={props.date}
                    
                />
                    <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    {props.overview}
                    </Typography>
                </CardContent>
                {props.id  && 
                    <CardActions className="Flex-div">
                        <Link className="badge badge-pill" to={url}>
                        <Button variant="outlined"  size="small">Details</Button>
                        </Link>
                        <div style={{padding:5}}>
                            <span style={{margin: 1}}><ThumbUpOffAltIcon color='warning'  /> {props.vote}</span>
                            <span style={{margin: 1}}><StarIcon className="Start" /> {props.avie}</span>
                        </div>
                    </CardActions>
                }
            </Card>
        </Grid>
    )
}

export default Cards