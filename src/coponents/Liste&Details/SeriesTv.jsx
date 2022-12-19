import React from 'react';
import Cards from '../tools/Card'
import axios from 'axios';
import {useState, useEffect, useContext } from 'react';
import Loading from '../tools/Loading'
import { MyContext } from '../../store/AppContext';
import {useGenres} from '../../utils/useGenres'
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Filter from '../tools/Filter'

const TVListe = () => {

    const {store, setStore} = useContext(MyContext);
    useEffect( () =>{
        setStore({...store, isMovie: 'tv'});
    },[])

    const categories =  useGenres('tv')

    const [paramsUrl, setParamsUrl] = useState({
        url: 'https://api.themoviedb.org/3/discover/tv?',
        urlSearch : 'https://api.themoviedb.org/3/search/tv?',
        token : '&api_key=7d650a677bfe91f70ad7c5de68f0a471',
        lang : '&language=fr-FR',
        keyPage : '&page=',
        startDate : '2022',
        endDate : '2023',
        search: '',
        page : 1 ,
        categories: []
    })

    const [searchMovie , setSearchMovie] = useState(false)

    let urlListTv = searchMovie === false
    ? `${ paramsUrl.url}${paramsUrl.token}${paramsUrl.lang}${paramsUrl.keyPage}${paramsUrl.page}&with_genres=${paramsUrl.categories.toString()}&first_air_date.gte=${paramsUrl.startDate}&first_air_date.lte=${paramsUrl.endDate}&sort_by=popularity.desc`
    :  `${ paramsUrl.urlSearch}${paramsUrl.token}${paramsUrl.lang}&query=${paramsUrl.search}${paramsUrl.keyPage}${paramsUrl.page}${paramsUrl.adult}&sort_by=popularity.desc`

    const img_url = 'https://image.tmdb.org/t/p/original'
    const [tvListe, settvListe] = useState([]);


    const getListe = () => {
        //ques que any
        axios
        .get(urlListTv)
        .then(res => {settvListe(res.data)})
        .catch(err => console.log('err => ', err))
    }
    const [formats, setFormats] = React.useState(() => []);
    const handleFormat = (event, newFormats) => {
        setParamsUrl({...paramsUrl, categories : newFormats})
        setFormats(newFormats);
      };

    const handleParams = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        if(key === 'search') 
        {
            setSearchMovie(true)
            setParamsUrl({...paramsUrl, [`${key}`] :  value}); 

        } 
        else if(key !== 'search')
        {
            setSearchMovie(false)
            if(key === 'startDate' && value > paramsUrl.endDate){
                alert('La date de début ne peux être supérieure a la date de fin')
            }else if (key === 'endDate' && value < paramsUrl.startDate){
                alert('La date de fin ne peux être inférieure a la date de début')
            }else{
                // setSearchMovie(false)
                setParamsUrl({...paramsUrl, [`${key}`] :  value});
            }
        
        } 

    };

    useEffect(() => {
        getListe()
    },[paramsUrl.page, paramsUrl.startDate, paramsUrl.endDate, paramsUrl.categories, paramsUrl.search])

    const Load = () => {
        if(tvListe.results) {
            return(
                <div className="">
                    <div className='d-flex justify-content-around'>
                            <Filter 
                                genres={categories.genres}
                                formats={formats}
                                onChange={handleFormat}
                                changeDate={handleParams}
                                startValue={paramsUrl.startDate}
                                endValue={paramsUrl.endDate}
                                changeSearch={handleParams}
                                searchValue={paramsUrl.titleMovie}
                            />
                    </div>
                    <div className="album py-5 bg-light">
                        <Grid display="flex" justifyContent="center" alignItems="center">
                            <Pagination 
                                style={{marginBottom:20}}
                                count={tvListe.total_pages} 
                                onChange={(event, page) =>  setParamsUrl({...paramsUrl, page : page})}  
                                color="primary" 
                            />
                        </Grid>
                        <Container>
                            <Box sx={{ width: '100%' }}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    {tvListe.results.map((info) => {
                                        return <Cards 
                                                    id={info.id}
                                                    img={img_url + info.poster_path}
                                                    title={info.name} 
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

export default TVListe