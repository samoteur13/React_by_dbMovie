import React from 'react';
import Input from './tools/Input'
import axios from 'axios';
import {useState} from 'react';
import Cards from './tools/Card';
import { useError } from '../utils/useError';


const AddMovie = () => {

    const {myError, saveError} = useError()

    const config = {
        headers : { Authorization: `Bearer ${sessionStorage.getItem('token')}`}
    };

    const [addMovie, setAddMovie] = useState({
        title:'', 
        overview : '', 
        release_date: '', 
        poster_path: ''
    })

    const handleUser = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setAddMovie({...addMovie, [`${key}`] :  value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postMovie()
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
        <div className="d-flex container">
            <form style={{border: '', borderRadius:'5px', width: '30%',margin: 'auto' }} onSubmit={handleSubmit}>
                <h3>Filme à ajouter</h3>
                <h4 className="text-danger">{myError}</h4>
                <Input 
                    name='title' 
                    label='Titre' 
                    type='text' 
                    val={addMovie.title}
                    onChange={handleUser}
                />
                <Input 
                    name='overview' 
                    label='Description' 
                    type='text' 
                    val={addMovie.overview} 
                    onChange={handleUser}
                />
                <Input 
                    name='release_date' 
                    label='Date de réalisation' 
                    type='date' 
                    val={addMovie.release_date} 
                    onChange={handleUser}
                />
                <Input 
                    name='poster_path' 
                    label="Adress de l'image" 
                    type='text' 
                    val={addMovie.poster_path} 
                    onChange={handleUser}
                />
                <input style={{margin: '5px', fontweight: 'bold'}}  type='submit' value='Ajouter'/>
            </form>
            <Cards 
                title={addMovie.title}
                img={addMovie.poster_path}
                overview={addMovie.overview}
                date={addMovie.release_date}
            />
        </div>
    )
}

export default AddMovie;