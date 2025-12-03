import React, { useState, useEffect } from 'react';
import annecy from '../../assets/br/annecy.jpeg';
import chambery from '../../assets/br/chambery.jpg';

export default function Equipe(params) {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            const imagesAnnecy = import.meta.glob('../../assets/br/annecy/*.{jpg,jpeg,png}');
            const imagesChambery = import.meta.glob('../../assets/br/chambery/*.{jpg,jpeg,png}');

            const imagesAnnecyArray = Object.entries(imagesAnnecy).map(async ([key, value]) => {
            const [prenom, role] = key
            .replace('../../assets/br/annecy/', '')
            .replace(/\.(jpg|jpeg|png)$/, '')
            .split('_');

            const { default: src } = await value(); 
            return { ville : "annecy", prenom, role, src };
            });

            const imagesChamberyArray = Object.entries(imagesChambery).map(async ([key, value]) => {
            const [prenom, role] = key
            .replace('../../assets/br/chambery/', '')
            .replace(/\.(jpg|jpeg|png)$/, '')
            .split('_');

            const { default: src } = await value(); 
            return { ville: "chambery", prenom, role, src };
            });

            const allImagesArray = [...imagesAnnecyArray, ...imagesChamberyArray];

            const resolvedPhotos = await Promise.all(allImagesArray);
            setPhotos(resolvedPhotos);
            setLoading(false);
        };

        loadImages();
    }, []);
    
    return (<section id="equipe">
        <h2 className="rh2">Notre équipe</h2>
        <div className="hr"></div>

        <div className='bureaux'>
            { ["annecy", "chambery"].map((site, i) => (
            <div className={ "bureau equipe-" + site }>
                { site == "annecy" ? 
                <img src={annecy} alt={site} className='photo-br'/>
                : 
                <img src={chambery} alt={site} className='photo-br'/>
                }
                <div className='org-br'>
                    <h3>Bureau d{ site == "annecy" ? "'Annecy" : "e Chambéry"}</h3>
                    <div className='list-br'>
                        { loading ? <p>Chargement des photos</p> :
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
