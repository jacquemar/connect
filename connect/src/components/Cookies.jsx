import React from 'react';
import Header from './Header';

function Cookies() {
    return (
        <div>
            
                <div>
                    <div className='flex flex-col mt-36 mx-4 p-2 mb-20 md:mx-24'>
                    <h1 className='font-sans text-lg text-black font-bold md:text-center md:text-2xl'>Cookies</h1> <br />
                    <h3 className='font-medium text-base'>1. Utilisation des Cookies</h3> <br />
                    <p className='text-sm mt-3 font-light'>Le site internet « CONNECT » utilise des cookies pour améliorer votre expérience de navigation, analyser l'utilisation du site, et personnaliser le contenu affiché. Les cookies sont de petits fichiers stockés sur votre appareil lorsque vous visitez notre site.</p> <br />
                    <h3 className='font-medium text-base'>2. Types de Cookies Utilisés</h3> <br />
                    <p className='text-sm mt-3 font-light'>
                     <li><span className='font-bold'>Cookies Essentiels :</span> Ces cookies sont nécessaires au bon fonctionnement du site et ne peuvent pas être désactivés. Ils permettent des fonctions telles que l'accès à des zones sécurisées du site.</li> 
                     <li><span className='font-bold'>Cookies de Performance :</span> Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site, ce qui nous permet d'améliorer ses performances. Par exemple, ils nous permettent de savoir quelles pages sont les plus consultées.</li>
                     <li><span className='font-bold'>Cookies de Fonctionnalité :</span> Ces cookies permettent au site de se souvenir de vos choix et préférences, tels que la langue ou la région, pour améliorer votre expérience.
</li>
                     <li><span className='font-bold'>Cookies de Publicité : </span> Ces cookies sont utilisés pour vous proposer des publicités pertinentes en fonction de vos intérêts. Ils peuvent également limiter le nombre de fois où vous voyez une publicité.</li>
                        </p> <br />
                    <h3 className='font-medium text-base'>3. Gestion des Cookies</h3> <br />
                    <p className='text-sm mt-3 font-light'>
                    Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre navigateur. Notez que la désactivation des cookies peut affecter certaines fonctionnalités du site.
                        </p> <br />
                    <h3 className='font-medium text-base'>4. Contact</h3> <br />
                    <p className='text-sm mt-3 font-light'>
                    Pour toute question concernant les cookies, veuillez nous contacter à : support@connect2card.com.   
                    </p> <br />
                   
                    </div>
                </div>
    
        </div>
      )
}

export default Cookies