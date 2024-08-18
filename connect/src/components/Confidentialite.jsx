import React from 'react';
import Header from './Header';

function Confidentialite() {
    return (
        <div>
            
                <div>
                    <div className='flex flex-col mt-36 mx-4 p-2 mb-20 md:mx-24'>
                    <h1 className='font-sans text-lg text-black font-bold md:text-center md:text-2xl'>Politique de Confidentialité</h1> <br />
                    <h3 className='font-medium text-base'>1. Collecte des Données</h3> <br />
                    <p className='text-sm mt-3 font-light'>Nous collectons des données personnelles lorsque vous passez une commande, vous inscrivez à notre newsletter, ou interagissez avec notre site. Les données collectées peuvent inclure votre nom, adresse e-mail, adresse de livraison, et informations de paiement.</p> <br />
                    <h3 className='font-medium text-base'>2. Utilisation des Données</h3> <br />
                    <p className='text-sm mt-3 font-light'>Les données personnelles sont utilisées pour traiter les commandes, vous fournir des informations sur nos produits et services, et améliorer votre expérience utilisateur.</p> <br />
                    <h3 className='font-medium text-base'>3. Protection des Données</h3> <br />
                    <p className='text-sm mt-3 font-light'>Nous mettons en place des mesures de sécurité appropriées pour protéger vos données contre la perte, l'accès non autorisé, ou la divulgation. Cependant, aucune méthode de transmission sur Internet n'est entièrement sécurisée.</p> <br />
                    <h3 className='font-medium text-base'>4. Partage des Données</h3> <br />
                    <p className='text-sm mt-3 font-light'> Nous ne partageons vos données personnelles avec des tiers que dans les cas suivants :
                    
                        <li>Pour le traitement des paiements.</li>
                        <li>Avec des prestataires de services de livraison.</li>
                        <li>Pour se conformer à des obligations légales.</li>
                    
                    </p> <br />
                    <h3 className='font-medium text-base'>5. Droits des Utilisateurs</h3> <br />
                    <p className='text-sm mt-3 font-light'>Vous avez le droit d'accéder, de rectifier, ou de supprimer vos données personnelles. Vous pouvez exercer ces droits en nous contactant à l'adresse suivante : support@connect2card.com.</p> <br />
                    <h3 className='font-medium text-base'>6. Modifications de la Politique</h3> <br />
                    <p className='text-sm mt-3 font-light'>Nous nous réservons le droit de modifier cette politique de confidentialité. Les changements seront publiés sur notre site avec la date de la dernière mise à jour.</p> <br />
                    
                    </div>
                </div>
    
        </div>
      )
}

export default Confidentialite