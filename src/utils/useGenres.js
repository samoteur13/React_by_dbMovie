
import { useEffect, useState} from 'react';
import axios from 'axios';

export const useGenres = (type) => {

    const [categories, setCategories] = useState([])

    const getCategory = () => {
        axios
        .get('https://api.themoviedb.org/3/genre/' + type + '/list?api_key=7d650a677bfe91f70ad7c5de68f0a471&language=fr-FR')
        .then(res => {setCategories(res.data)})
        .catch(err =>  err)
    }

    useEffect( () => {
        getCategory()
    },[])

    return categories
}
