import React from 'react';
import ImgNoFound from '../tools/ImgNoFound'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box'

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

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
                    <Card>
                        <CardHeader
                            title="Categories"
                        />
                        <CardContent>
                            <ul className="list-unstyled mb-0 d-flex justify-content-around">
                                {props.genres.map((genre, index) => {
                                    return <li key={index}> 
                                            <button  id={index}  className="badge badge-secondary bg-secondary" type="submit">{genre.name}</button>
                                    </li>
                                    
                                })}
                            </ul>
                        </CardContent>
                        
                    </Card>
                    <div className="card mb-4">
                        <div className="card-header">Categories</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <ul className="list-unstyled mb-0 d-flex justify-content-around">
                                        {props.genres.map((genre, index) => {
                                           return <li key={index}> 
                                                    <button  id={index}  className="badge badge-secondary bg-secondary" type="submit">{genre.name}</button>
                                                </li>
                                           
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">Avie</div>
                        <div className="card-body">
                            <ul className="list-unstyled mb-0">
                                <li><p>Vote :  {props.avie} </p></li>
                                <li>Avie : {props.vote}</li>
                            </ul>
                        </div>
                    </div>
                </Grid>
                {/* coté droit */}
                <Grid md={8}>
                    <Grid >
                        <h1>{props.title}</h1>
                        <Box sx={{ color: 'text.secondary' }} className="fst-italic mb-2">Film sortie en ....{props.date}</Box>
                    </Grid>
                    <Grid >
                        <p style={{fontSize: '1.4rem', marginBottom : '20px'}}>{props.overview}</p>
                    </Grid>
                    <div className="video_wrapper">
                        <iframe title={props.title} src={props.trailer}></iframe>
                    </div>
                        <Grid md={12} style={{overflow: 'hidden'}} >
                            <div style={{display:'flex', overflow: 'auto'}} >
                                {props.compagnies.map((info, index) => {
                                    return   <Grid spacing={1} key={index} xs={3} 
                                                    style={{margin : '1px' ,display:'flex', flexDirection:'column', justifyContent: 'space-between' , border: '1px solid', borderRadius: '8px' }} className="App">
                                        
                                                    {info.logo_path != null ? <img  src={props.imgCompagnie +  info.logo_path}   alt={info.name + 'image'} /> :
                                                        <ImgNoFound />}
                                                    <p className="">{info.name}</p>
                                                </Grid>
                                })}
                            </div>
                        </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CardDetailsMovieTV;