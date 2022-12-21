import React from 'react';
import DivForm from '../tools/DivForm';
import axios from 'axios';
import {useState , useContext ,useEffect} from 'react';
import {useError} from '../../utils/useError';
import {MyContext} from '../../store/AppContext';
import { useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


const RegistrationLogin = () => {

    //gere le store 
    const navigate = useNavigate()
    const {store, setStore} = useContext(MyContext);

    const [ifLogin, setIfLogin] = useState (true)
    const {myError, saveError} = useError()

    //------------------ Inscription ----------------------
    const [register, setRegister] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        city: "",
        postalCode: ""
    });

    const postRegister = () => {
        axios
        .post('https://api-ri7.herokuapp.com/api/users/register',register)
        .then(res => res.data)
        .catch(err => saveError(err.response.data.error))
    }
    //----------------------------------------------------//

    //-------------------- Connexion -----------------------
    const [login, setUser] = useState({
        email : '',
        password: '',

    });

    const postLogin = () => {
        axios
        .post('https://api-ri7.herokuapp.com/api/users/login',login)
        .then(res => {
                    sessionStorage.setItem('token', res.data.token);
                    setStore({...store , isUserAuth : true })
                }
            )
        .catch(err => saveError(err.response.data.error))
        
    }
    

    useEffect(() => {
        if(store.isUserAuth){
            axios
            .get('https://api-ri7.herokuapp.com/api/users/profile',
            {headers : { Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
            .then(res =>  setStore({...store , user: res.data }))
            .catch(err => console.log('err => ', err))

            navigate('/liste-de-filme')
        }
    },[store.isUserAuth])

    //---------------------------------------//

     const handleUser = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        ifLogin ?
            setUser({...login, [`${key}`] :  value})
        :
            setRegister({...register, [`${key}`] :  value})
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        ifLogin ? postLogin() : postRegister()
      }

    return (
        <Container component="main" maxWidth="xs">
             <CssBaseline />
            {ifLogin ? 
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
                        Connexion
                        <p className="text-danger">{myError}</p>
                        {myError.length > 1
                            && <p className='text-danger'>{myError}</p>
                            }
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
                        <DivForm 
                            name='email' 
                            label='Email' 
                            type='text' 
                            val={login.email}
                            onChange={handleUser}
                        />
                        <DivForm 
                            name='password' 
                            label='Mot de passe' 
                            type='text' 
                            val={login.password} 
                            onChange={handleUser}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                       <Button
                        type="Ajouter"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                            Connexion
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Button size="small"
                                    onClick={ () => { setIfLogin(false)}}
                                    >Vous n'êtes pas inscrit  ? <u>inscrivez vous</u></Button>
                            </Grid>
                        </Grid>
                    </Box>    
                </Box>
            :
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
                        Inscription
                        <p className="text-danger">{myError}</p>
                        {myError.length > 1
                            && <p className='text-danger'>{myError}</p>
                            }
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <DivForm 
                            name='email' 
                            label='Email' 
                            type='email' 
                            val={register.email}
                            onChange={handleUser}
                        />
                        <DivForm 
                            name='password' 
                            label='Mot de passe' 
                            type='password' 
                            val={register.password} 
                            onChange={handleUser}
                        />
                        <DivForm 
                            name='firstname' 
                            label='Prénom' 
                            type='text' 
                            val={register.firstname} 
                            onChange={handleUser}
                        />
                        <DivForm 
                            name='lastname' 
                            label='Nom' 
                            type='text' 
                            val={register.lastname} 
                            onChange={handleUser}
                        />
                        <DivForm 
                            name='city' 
                            label='Ville' 
                            type='text' 
                            val={register.city} 
                            onChange={handleUser}
                        />
                        <DivForm 
                            name='postalcode' 
                            label='code postale' 
                            type='text' 
                            val={register.postalCode} 
                            onChange={handleUser}
                        />
                        <Button
                        type="Ajouter"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Inscription
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Button size="small"
                                    onClick={ () => {setIfLogin(true)}}
                                >Vous êtes déjà inscrit ? <u>connectez vous</u></Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            }
        </Container>
    )
}

export default RegistrationLogin; 