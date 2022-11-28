import React from 'react';
import DivForm from './tools/DivForm'
import axios from 'axios';
import {useState, useEffect, useContext } from 'react';
import { MyContext } from '../store/AppContext';
import Grid from '@mui/material/Unstable_Grid2';
import {Button, Box} from '@mui/material'

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Profil = () => {

    const {store, setStore} = useContext(MyContext);
    const  [isLoaded , setIsloaded] = useState(false)

    const config = {
        headers : { Authorization: `Bearer ${sessionStorage.getItem('token')}`}
    };


    //mise a jour du profile
    const putProfil = () => {
        axios
        .put('https://api-ri7.herokuapp.com/api/users/profile',
        store.user,
        config)
        .then(res => { 
            setStore({...store, user : res.data});
            setIsloaded(true);
        })
        .catch(err => console.log('err => ', err))

    }

    const handleUser = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setStore({...store , user : {...store.user, [`${key}`] :  value } });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        putProfil()
    }

    return (
        <Container component="main" maxWidth="md">
            <Box 
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                component="form" 
                onSubmit={handleSubmit} 
                >
                <h3>Mon profile</h3>
                <DivForm 
                    name='email' 
                    label='Email' 
                    type='email' 
                    val={store.user.email}
                    onChange={handleUser}
                />
                <DivForm 
                    name='firstname' 
                    label='Prénom' 
                    type='text' 
                    val={store.user.firstname} 
                    onChange={handleUser}
                />
                <DivForm 
                    name='lastname' 
                    label='Nom' 
                    type='text' 
                    val={store.user.lastname} 
                    onChange={handleUser}
                />
                <DivForm 
                    name='city' 
                    label='Ville' 
                    type='text' 
                    val={store.user.city} 
                    onChange={handleUser}
                />
                <DivForm 
                    name='postalcode' 
                    label='code postale' 
                    type='text' 
                    val={store.user.postalCode} 
                    onChange={handleUser}
                />
                <DivForm 
                    name='avatar' 
                    label='Avatar' 
                    type='text' 
                    val={store.user.avatar} 
                    onChange={handleUser}
                />
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Modifier
                </Button>
            </Box>
        </Container>
    )
}

export default Profil;