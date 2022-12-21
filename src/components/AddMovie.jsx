import * as React from 'react';
import DivForm from './tools/DivForm'
import axios from 'axios';
import {useState} from 'react';
import Cards from './tools/Card';
import { useError } from '../utils/useError';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



const AddMovie = () => {

    const {myError, saveError} = useError()

    // const config = {
    //     headers : { Authorization: `Bearer ${sessionStorage.getItem('token')}`}
    // };

    const [addMovie, setAddMovie] = useState({
        title:'Ajouter votre titre', 
        overview : 'Une description de votre film', 
        release_date: 'Date de realisation', 
        poster_path: 'https://i0.wp.com/views.fr/wp-content/uploads/2020/04/8t7cemgym6dx0fa71yj6uo0rno-475.jpg?resize=1200%2C1800&ssl=1'
    })

    const handleUser = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setAddMovie({...addMovie, [`${key}`] :  value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postMovie()
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
    }


    const postMovie = () => {
        axios
        .post('https://api-ri7.herokuapp.com/api/movies',
            addMovie,
            {headers: {Authorization : `Bearer ${sessionStorage.getItem("token")}`}}
            )
        .then(res => res.data)
        .catch(err => saveError(err.response.data.error))
    }

    return(
        <Container  maxWidth="md">
        <CssBaseline />
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Box
                    sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Film à ajouter
                    </Typography>
                        <h4 className="text-danger">{myError}</h4>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
                        <DivForm 
                            name='title' 
                            label='Titre' 
                            type='text' 
                            val={addMovie.title}
                            onChange={handleUser}
                        />
                        <DivForm 
                            name='overview' 
                            label='Description' 
                            type='text' 
                            val={addMovie.overview} 
                            onChange={handleUser}
                        />
                        <DivForm 
                            name='release_date' 
                            type='date' 
                            val={addMovie.release_date} 
                            onChange={handleUser}
                        />
                        <DivForm 
                            name='poster_path' 
                            label="Adress de l'image" 
                            type='text' 
                            val={addMovie.poster_path} 
                            onChange={handleUser}
                        />
                    <Button
                        type="Ajouter"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Ajouter
                    </Button>
                </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
                >
                    <Box sx={{ mt: 1 }} >
                        <Cards 
                        title={addMovie.title}
                        img={addMovie.poster_path}
                        overview={addMovie.overview}
                        date={addMovie.release_date}
                        />
                    </Box>
                </Box>
            </Grid>
        </Grid>
        </Container>
    )
}

export default AddMovie;