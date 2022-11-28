import React from 'react';
import Cards from '../tools/Card'
import axios from 'axios';
import {useState, useEffect , useContext } from 'react';
import Loading from '../tools/Loading'
import DivForm from '../tools/DivForm'
import { MyContext } from '../../store/AppContext';
import {useGenres} from '../../utils/useGenres'
import Filter from '../tools/Filter'

import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';

import Fade from '@mui/material/Fade';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';



const MovieListe = () => { 

    const {store, setStore} = useContext(MyContext);
    useEffect( () =>{
        setStore({...store, isMovie: 'movie'});
    },[])

    const myError = useGenres('movie')

    const [paramsUrl, setParamsUrl] = useState({
        //search movie by date
        url: 'https://api.themoviedb.org/3/discover/movie',
        keyStartDate : '?primary_release_date.gte=',
        startDate : '2014',
        keyEndDate : '&primary_release_date.lte=',
        endDate : '2015',
        token : '&api_key=7d650a677bfe91f70ad7c5de68f0a471',
        lang : '&language=fr-FR',
        keyPage : '&page=',
        page : 1 ,
        keyCategories: '&with_genres=',
        categories: [],
        
        // search movie by title
        urlSearch: 'https://api.themoviedb.org/3/search/movie',
        tokenSearch : '?api_key=7d650a677bfe91f70ad7c5de68f0a471',
        keySearch : '&query=',
        search: '',
        adult: '&include_adult=false'

    })

    const categories =  useGenres('movie')

    const [searchMovie , setSearchMovie] = useState(false)

    let urlListMovie = searchMovie == false
                ? `${ paramsUrl.url}${paramsUrl.keyStartDate}${paramsUrl.startDate}${paramsUrl.keyEndDate}${paramsUrl.endDate}${paramsUrl.token}${paramsUrl.lang}${paramsUrl.keyPage}${paramsUrl.page}&with_genres=${paramsUrl.categories.toString()}`
                : `${ paramsUrl.urlSearch}${paramsUrl.tokenSearch}${paramsUrl.lang}${paramsUrl.keySearch}${paramsUrl.search}${paramsUrl.keyPage}${paramsUrl.page}${paramsUrl.adult}&with_genres=${paramsUrl.categories.toString()}`  

    const img_url = 'https://image.tmdb.org/t/p/original'

    const [movieList, setMovieList] = useState([]);
    const [checked, setChecked] = React.useState(false);
    const [formats, setFormats] = React.useState(() => []);

    const getListe = () => {
        //ques que any
        axios
        .get(urlListMovie)
        .then(res => {setMovieList(res.data)})
        .catch(err => console.log('err => ', err))
    }

    const handleFormat = (event, newFormats) => {
        console.log(newFormats)
        setParamsUrl({...paramsUrl, categories : newFormats})
        setFormats(newFormats);
      };

    const handleChange = () => {
        setChecked((prev) => !prev);
    };


    const handleParams = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        if(key == 'startDate' && value > paramsUrl.endDate){
            alert('La date de début ne peux être supérieure a la date de fin')
        }else if (key == 'endDate' && value < paramsUrl.startDate){
            alert('La date de fin ne peux être inférieure a la date de début')
        }else{
            setSearchMovie(false)
            setParamsUrl({...paramsUrl, [`${key}`] :  value});
        }

        if(key == 'search'){
            setSearchMovie(true)
            setParamsUrl({...paramsUrl, [`${key}`] :  value}); 
        }
    };

    
    useEffect(() => {
        getListe()
    },[paramsUrl.page, paramsUrl.startDate, paramsUrl.endDate,paramsUrl.search, paramsUrl.categories])

    const Load = () => {
        if(movieList.results) {
            return(
                <div className="">
                    <Fade in={checked}>
                        <div>
                        <Filter 
                            genres={categories.genres}
                            formats={formats}
                            onChange={handleFormat}
                        />
                        </div>
                    </Fade>
                    <FormControlLabel
                    control={<Switch checked={checked} onChange={handleChange} />}
                    label="filtre"
                    />
                    <div className='d-flex justify-content-around'>
                    <form className='col-6 p-3 '>
                        <h5 className='text-center'>Filtre</h5>
                        <div className='d-flex justify-content-around '>
                                <DivForm 
                                    label='date début'
                                    name='startDate'
                                    type='number' 
                                    val={paramsUrl.startDate}
                                    onChange={handleParams}
                                />
                                <DivForm 
                                    label='date fin'  
                                    type='number' 
                                    name='endDate'
                                    val={paramsUrl.endDate}
                                    onChange={handleParams}
                                />
                                <DivForm 
                                    label='Recherche'
                                    name='search'
                                    type='text' 
                                    val={paramsUrl.titleMovie}
                                    onChange={handleParams}
                                />
                        </div>
                    </form>
                    </div>

                    <div className="album py-5 bg-light">
                        <Grid display="flex" justifyContent="center" alignItems="center">
                            <Pagination 
                                style={{marginBottom:20}}
                                count={movieList.total_pages} 
                                onChange={(event, page) =>  setParamsUrl({...paramsUrl, page : page})}  
                                color="primary" 
                            />
                        </Grid>
                        <Container >
                            <Box sx={{ width: '100%' }}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    {movieList.results.map((info) => {
                                        return <Cards 
                                                    id={info.id}
                                                    img={img_url + info.poster_path}
                                                    title={info.title} 
                                                    vote={info.vote_count}
                                                    avie={info.vote_average}
                                                    date={info.release_date}
                                                    key={info.id}
                                                />
                                        })}
                                </Grid>
                            </Box>
                        </Container>
                    </div>
                </div>  
                )
        }else{
            return(
                <Loading />
            )
        }
    }

    return (
            Load()
        )
}

export default MovieListe