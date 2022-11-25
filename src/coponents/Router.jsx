import React from 'react';
import { BrowserRouter, Routes, Route, Outlet,  Navigate} from "react-router-dom";
import { useContext} from 'react';

import Home from './Home'
import Header from './template/Header'
import MovieListe from './Liste&Details/MovieListe';
import MoovieDetails from './Liste&Details/Moovie_tv_Details';
import SeriesTv from './Liste&Details/SeriesTv'
import RegistrationLogin from './login/RegistrationLogin';
import Profil from './Profil'
import AddMovie from './AddMovie'
import AppContext from '../store/AppContext'
import { MyContext } from '../store/AppContext';

export const MyRoutes = {
    HOME: '/',
    LISTE_MOVIE: '/liste-de-filme',
    MOVIE_DETAILS: '/detail-du-filme/:idFilm',
    LISTE_TV : '/liste-de-serie',
    TV_DETAILS: '/detail-de-la-serie/:idTV',
    LOGIN : '/inscription-ou-connexion',
    PROFIL : '/profile',
    ADDMOVIE : '/ajouter-un-filme'
    
}

const AuthRoutes = () => {
    const {store, setStore} = useContext(MyContext);
     return   (store.isUserAuth ?
        <Outlet /> 
     : 
        <Navigate to={MyRoutes.LOGIN} replace={true} />)
}

const Router = React.FC = () =>{

    return (
        <BrowserRouter>
            <AppContext >
                <Header />
                <Routes >
                    {/* Routes public */}
                    <Route path={MyRoutes.HOME} element={<Home/>} />
                    <Route path={MyRoutes.LOGIN} element={<RegistrationLogin />} />
                    {/* Routes privée */}
                    <Route element={<AuthRoutes/>}>
                        <Route path={MyRoutes.LISTE_MOVIE} element={<MovieListe/>} />
                        <Route path={MyRoutes.MOVIE_DETAILS} element={<MoovieDetails />} />
                        <Route path={MyRoutes.LISTE_TV} element={<SeriesTv/>} />
                        <Route path={MyRoutes.ADDMOVIE} element={<AddMovie />} />
                        <Route path={MyRoutes.PROFIL} element={<Profil />} />
                    </Route>
                </Routes>
            </AppContext>
        </BrowserRouter>
    )
}

export default Router;