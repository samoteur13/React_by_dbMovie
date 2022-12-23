import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box'

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Paper from '@mui/material/Paper';

const CardDetailsMovieTV = (props) => {

    return (
        <Container >
            <Grid container spacing={2}>
                {/* coté gauche */}
                <Grid md={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            image={props.img}
                            alt="affiche de film " 
                        />

                    </Card>
                    <Card sx={{mt: '2rem'}}>
                        <CardHeader
                            sx={{bgcolor : '#bdbdbd'}}
                            title="Categories"
                        />
                        <CardContent>
                            <Stack direction="row" spacing={1}  >
                                {props.genres.map((genre, index) => {
                                    return <Chip key={index}  id={index} variant="outlined" color="primary"  label={genre.name} />
                                })}
                            </Stack>
                        </CardContent>
                        
                    </Card>
                    <Card sx={{mt: '2rem'}}>
                        <CardHeader 
                            sx={{bgcolor : '#bdbdbd'}}
                            title="Avie" 
                        />
                        <CardContent>
                            <List >
                                <ListItem>
                                    <ListItemText
                                        primary={`Avie : ${props.avie}`}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={`Vote : ${props.vote}`}
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                {/* coté droit */}
                <Grid md={8}>
                    <Grid >
                        <h1>{props.title}</h1>
                        <Box sx={{ color: 'text.secondary' }} >Film sortie en ....{props.date}</Box>
                    </Grid>
                    <Grid >
                        <p style={{fontSize: '1.4rem', marginBottom : '20px'}}>{props.overview}</p>
                    </Grid>
                    <div className="video_wrapper">
                        <iframe style={{borderRadius : '8px'}} title={props.title} src={props.trailer}></iframe>
                    </div>
                        <Grid  sx={{mt : '2rem', display : 'flex', flexWrap : 'wrap'}}   className="scrollbar style-scrollbar">
                            <Box sx={{display : 'inline-flex'}}>
                                {props.compagnies.map((info, index) => {
                                    return   <Card key={index} 
                                                    sx={{width : '10rem'}}
                                                    style={{margin : '1px' ,display:'flex', flexDirection:'column', justifyContent: 'center' , border: '1px solid', borderRadius: '8px' }} className="App">
                                                        <CardMedia
                                                            component="img"
                                                            image={info.logo_path != null ? props.imgCompagnie +  info.logo_path: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png'}
                                                            alt={info.name + 'image'}
                                                        />
                                                    <CardContent >
                                                        <p>{info.name}</p>
                                                    </CardContent>
                                                </Card>
                                })}
                            </Box>
                        </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CardDetailsMovieTV;