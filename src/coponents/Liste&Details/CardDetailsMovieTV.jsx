import React from 'react';
import ImgNoFound from '../tools/ImgNoFound'


const CardDetailsMovieTV = (props) => {

    return (
        <div className="container mt-5">
            <div className="row">
                {/* coté gauche */}
                <div className="col-lg-4">
                    <figure className="mb-4"><img className="img-fluid rounded" src={props.img} alt="affiche de film" /></figure>
                    <div className="card mb-4">
                        <div className="card-header">Categories</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <ul className="list-unstyled mb-0 d-flex justify-content-around">
                                        {props.genres.map((genre, index) => {
                                           return <li key={index}> 
                                                    <button  id={index}  className="badge badge-secondary bg-secondary" type="submit">{genre.name}</button>
                                                </li>
                                           
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">Avie</div>
                        <div className="card-body">
                            <ul className="list-unstyled mb-0">
                                <li><p>Vote :  {props.avie} </p></li>
                                <li>Avie : {props.vote}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* coté droit */}
                <div className="col-lg-8">
                    <article>
                        <header className="mb-4">
                            <h1 className="fw-bolder mb-1">{props.title}</h1>
                            <div className="text-muted fst-italic mb-2">Film sortie en ....{props.date}</div>
                        </header>
                        <section className="mb-5">
                            <p className="fs-5 mb-4">{props.overview}</p>
                        </section>
                        <div className="ratio ratio-16x9">
                            <iframe src={props.trailer}></iframe>
                        </div>
                                    <div className="col-md-12 overflow-hidden text-center">
                                        <div className="d-flex overflow-auto ">
                                            {props.compagnies.map((info, index) => {
                                                return   <div key={index} className="card col-3 m-1 flex-column justify-content-between">
                                                                <div></div>
                                                                {info.logo_path != null ? <img  src={props.imgCompagnie +  info.logo_path}   alt={info.name + 'image'} /> :
                                                                 <ImgNoFound />}
                                                                <p className="">{info.name}</p>
                                                            </div>
                                            })}
                                        </div>
                                    </div>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default CardDetailsMovieTV;