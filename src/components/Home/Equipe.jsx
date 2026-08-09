import React, { useState, useEffect } from 'react';
import { loadImages } from '../../utils/loadImages';

export default function Equipe(params) {
    const [annecy, setAnnecy]     = useState(null);
    const [chambery, setChambery] = useState(null);
    const [photos, setPhotos]     = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            const imagesAnnecy   = await loadImages('br_annecy');
            const imagesChambery = await loadImages('br_chambery');

            const imagesAnnecyArray = imagesAnnecy.map((src) => {
                const filename = src.split('/').pop();
                const [prenom, role] = filename.replace(/\.(jpg|jpeg|png)$/, '').split('_');
                if (prenom === "annecy") {
                    setAnnecy(src);
                    return null;
                }
                return { ville: "annecy", prenom, role, src };
            }).filter((item) => item !== null);;
            
            const imagesChamberyArray = imagesChambery.map((src) => {
                const filename = src.split('/').pop();
                const [prenom, role] = filename.replace(/\.(jpg|jpeg|png)$/, '').split('_');
                if (prenom === "chambery") {
                    setChambery(src);
                    return null;
                }
                return { ville: "chambery", prenom, role, src };
            }).filter((item) => item !== null);

            const allImagesArray = [...imagesAnnecyArray, ...imagesChamberyArray];

            setPhotos(allImagesArray);
        }

        fetchImages();
    }, []);
    
    return (<section id="equipe">
        <h2 className="rh2">Notre équipe</h2>
        <div className="hr"></div>

        <div className='bureaux'>
            { ["annecy", "chambery"].map((site, i) => (
            <div className={ "bureau equipe-" + site }>
                { site == "annecy" ? 
                    annecy !== null && <img src={annecy} alt={site} className='photo-br'/>
                : 
                    chambery !== null && <img src={chambery} alt={site} className='photo-br'/>
                }
                <div className='org-br'>
                    <h3>Bureau d{ site == "annecy" ? "'Annecy" : "e Chambéry"}</h3>
                    <div className='list-br'>
                        { photos === null ? <p>Chargement des photos</p> :
                        [...photos, ...photos].map(({ ville, prenom, role, src }) => (<>
                            { ville === site ?
                            <div key={prenom + '-' + role} className='membre-br'>
                                <img src={src} alt={prenom + "-" + role} />
                                <span className='prenom-br'>{prenom}</span>
                                {/* <div className='mini-hr'></div> */}
                                <span className='role-br'>{role}</span>
                            </div>
                            : " " }
                        </>))}
                    </div>
                </div>
            </div>
            ))};
        </div>
    </section>
    );
}
