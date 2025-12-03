import '../css/galerie.css';
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { loadImages } from '../utils/loadImages';
import { Carousel } from 'bootstrap/dist/js/bootstrap.min';


export default function Galerie() {
    const { year } = useParams();
    const carouselRef = useRef(null);
    
    const [images, setImages] = useState([-1]);
    useEffect(() => {
        const fetchImages = async () => {
            setImages([-1]);
            const loadedImages = await loadImages(year);
            setImages(loadedImages);
            
            if (carouselRef.current) {
                new Carousel(carouselRef.current).to(0);
            }
        };
        fetchImages();
    }, [year]);


    return (<section id="galerie">
        <h1 className='title'>GALERIE</h1>
        <div id='fresque'>
            <div className='scrollable-x'>
                <ul>
                    {[...Array(21)].map((_, i) =>
                        <>
                        <li key={2025-i} className={'year' + (year*1 === 2025-i ? " active" : "")}>
                            <NavLink to={ '/galerie/' + (2025 - i).toString() } className='year-link'>
                                { 2025 - i }
                                <div className='point'></div>
                            </NavLink>
                        </li>
                        {i < 20 ?
                        <div className='trait'></div>
                        : <></>}
                        </>
                    )}
                </ul>
            </div>
        </div>
        { images[0] === -1 ? 
        <div className="spinner-border m-5" role="status">
            <span className="sr-only">Loading...</span>
        </div> 
        :
        <>
        <div id="carouselYear" className="carousel slide" ref={carouselRef}>
            <div className="carousel-indicators">
                {images.map((_, i) => (
                    <button 
                        key={i} 
                        type="button" 
                        data-bs-target="#carouselYear" 
                        data-bs-slide-to={i} 
                        className={i === 0 ? "active" : ""} 
                        aria-current={i === 0 ? "true" : "false"} 
                        aria-label={`Slide ${i + 1}`}
                    ></button>
                ))}
            </div>
            <div className="carousel-inner">
                {images.length > 0 ? (
                    images.map((src, i) => (
                    <div className={"carousel-item" + (i == 0 ? " active" : "")} key={i}>
                        <img key={i} src={src} className="d-block w-100" alt={`Image ${i + 1} de ${year}`} />
                    </div>
                ))) : (
                    <p>Aucune image disponible pour cette année.</p>
                )}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselYear" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselYear" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        </>
        }
    </section>);
}
