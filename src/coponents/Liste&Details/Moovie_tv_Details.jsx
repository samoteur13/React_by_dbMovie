import React from 'react';
import { useParams } from 'react-router-dom';
import {useState, useEffect, useContext} from "react";
import axios from 'axios';
import Loading from '../tools/Loading'
import CardDetailsMovie from './CardDetailsMovieTV'
import {MyContext} from '../../store/AppContext'


const MoovieDetails = (props) => {

    const {store,setStore} = useContext(MyContext)

    const params = useParams()
    
    const token = '7d650a677bfe91f70ad7c5de68f0a471'
    const lang = '&language=fr-FR'
    const img_url = 'https://image.tmdb.org/t/p/original'
    const trailer_url = 'https://www.youtube.com/embed/'

    const [detailsMovie, setDetailsMovie] = useState([]);
    const [trailerMovie, setTrailerMovie] = useState([]);
    
    const getDetailsMovie = () => {
        let url_movie = 'https://api.themoviedb.org/3/'+ store.isMovie +'/'+ params.idFilm +'?api_key=' + token + lang
        axios
        .get(url_movie)
        .then(res => {setDetailsMovie(res.data)})
        .catch(err => console.log('err => ', err))

        let url_trailerMovie = 'https://api.themoviedb.org/3/'+ store.isMovie +'/'+ params.idFilm +'/videos?api_key=' + token + lang
        axios
        .get(url_trailerMovie)
        .then(res => {setTrailerMovie(res.data.results)})
        .catch(err => console.log('err =>' , err))

    }

    useEffect(() => {
        getDetailsMovie()
    },[])


    const load = () => {
        if(detailsMovie.vote_count && trailerMovie){
            if(trailerMovie.length > 0){
                return (
                <div>
                    <button onClick={() => console.log(trailerMovie)}>Test data</button>
                    <CardDetailsMovie 
                        title = {detailsMovie.title}
                        date = {detailsMovie.release_date}
                        img = {img_url + detailsMovie.poster_path}
                        overview= {detailsMovie.overview}
                        genres= {detailsMovie.genres}
                        avie={detailsMovie.vote_count}
                        vote={detailsMovie.vote_average}
                        compagnies={detailsMovie.production_companies}
                        imgCompagnie={img_url}
                        trailer={trailer_url + trailerMovie[0].key}
                    />
                </div>
                )
            }else{

                return(
                    <Loading />
                )

            }
            
        }else{
            
            return(
                <Loading />
            )
        }

    }

    return(
        load()
    )
}

export default MoovieDetails;