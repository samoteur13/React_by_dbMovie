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

const TVListe = () => {

    const {store, setStore} = useContext(MyContext);
    useEffect( () =>{
        setStore({...store, isMovie: 'tv'});
    },[])

    const categories =  useGenres('tv')

    const [paramsUrl, setParamsUrl] = useState({
        url: 'https://api.themoviedb.org/3/discover/tv?',
        token : '&api_key=7d650a677bfe91f70ad7c5de68f0a471',
        lang : '&language=fr-FR',
        keyPage : '&page=',
        page : 1 ,
        categories: []
    })

    const urlListTv  = `${ paramsUrl.url}${paramsUrl.token}${paramsUrl.lang}${paramsUrl.keyPage}${paramsUrl.page}&with_genres=${paramsUrl.categories.toString()}`
    const img_url = 'https://image.tmdb.org/t/p/original'
    const [tvListe, settvListe] = useState([]);

    const getListe = () => {
        //ques que any
        axios
        .get(urlListTv)
        .then(res => {settvListe(res.data)})
        .catch(err => console.log('err => ', err))
    }

    const handleParams = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        if(e.target.type == 'checkbox'){
           if(e.target.checked){
            let cloneCateg  = [...paramsUrl.categories]
            cloneCateg.push(value)
            setParamsUrl({...paramsUrl, categories : cloneCateg})
           }else{
            let cloneCateg  = [...paramsUrl.categories]

            for (let index = 0; index < cloneCateg.length; index++) {
                if(cloneCateg[index] == value){
                    cloneCateg.splice(index,1)
                }
            }

            setParamsUrl({...paramsUrl, categories : cloneCateg})
           }
        }
    };

    useEffect(() => {
        getListe()
    },[paramsUrl.page, paramsUrl.startDate, paramsUrl.endDate, paramsUrl.categories])

    const Load = () => {
        if(tvListe.results) {
            return(
                <div className="">
                    <div className='d-flex justify-content-around'>
                        <h2 className="text-center">Séries</h2>
                        <div>
                            <div id="filter"  className="d-flex flex-wrap ">
                                {categories.genres.map((info) => {
                                            return  (<div className="m-1" key={info.id}>
                                                        <input type="checkbox" className="btn-check" id={info.id} value={info.id} onChange={handleParams}/>
                                                        <label className="btn btn-outline-dark" htmlFor={info.id}>{info.name}</label>
                                                    </div>
                                                )
                                })}
                            </div>
                        </div>
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

export default TVListe