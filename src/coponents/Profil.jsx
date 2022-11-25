import React from 'react';
import Input from './tools/Input'
import axios from 'axios';
import {useState, useEffect, useContext } from 'react';
import Loading from './tools/Loading';
import { MyContext } from '../store/AppContext';

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
        <div>
            <form style={{border: '', borderRadius:'5px', width: '30%',margin: 'auto' }} onSubmit={handleSubmit}>
                <h3>Mon profile</h3>
                <Input 
                    name='email' 
                    label='Email' 
                    type='email' 
                    val={store.user.email}
                    onChange={handleUser}
                />
                <Input 
                    name='firstname' 
                    label='Prénom' 
                    type='text' 
                    val={store.user.firstname} 
                    onChange={handleUser}
                />
                <Input 
                    name='lastname' 
                    label='Nom' 
                    type='text' 
                    val={store.user.lastname} 
                    onChange={handleUser}
                />
                <Input 
                    name='city' 
                    label='Ville' 
                    type='text' 
                    val={store.user.city} 
                    onChange={handleUser}
                />
                <Input 
                    name='postalcode' 
                    label='code postale' 
                    type='text' 
                    val={store.user.postalCode} 
                    onChange={handleUser}
                />
                <Input 
                    name='avatar' 
                    label='Avatar' 
                    type='text' 
                    val={store.user.avatar} 
                    onChange={handleUser}
                />

                <input style={{margin: '5px', fontweight: 'bold'}}  type='submit' value='Modifier'/>
            </form>
        </div>
    )
}

export default Profil;