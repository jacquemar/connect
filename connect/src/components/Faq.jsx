import React from 'react'
import Header from './Header';
function Faq() {
    return (
        <div>
            
            <section class="bg-white mx-4 mt-28 dark:bg-gray-900">
                <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Questions Fréquemment Posées</h2>
                    <div class="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
                        <div>
                            <div class="mb-10">
                                <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    Comment acheter ma carte Connect ?
                                </h3>
                                <p class="text-gray-500 dark:text-gray-400">Vous pouvez acheter votre carte Connect en vous rendant sur notre site web et en suivant les instructions pour passer votre commande. Nous proposons différentes options d'achat en fonction de vos besoins.</p>
                            </div>
                            <div class="mb-10">
                                <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    Quels sont les différents paliers de Connect ?
                                </h3>
                                <p class="text-gray-500 dark:text-gray-400">Connect comprend quatre paliers : Bronze, Argent, Or, et Platine. Le nombre de points varie de 400 pour le palier Bronze à 1000 pour le palier Platine.</p>
                            </div>
                            <div class="mb-10">
                                <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    Comment puis-je accumuler des points pour passer au palier supérieur ?
                                </h3>
                                <p class="text-gray-500 dark:text-gray-400">Pour accumuler des points et passer au palier supérieur, vous devez avoir de nombreux téléchargements de vos contacts et des vues de profil. Chaque interaction avec votre profil vous rapporte des points.</p>
                            </div>
                            <div class="mb-10">
                                <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    Quel est le profil de départ en fonction du nombre de cartes achetées ?
                                </h3>
                                <p class="text-gray-500 dark:text-gray-400">Le profil de départ dépend du nombre de cartes achetées : si vous achetez 1 carte, vous êtes au palier Bronze, 10 cartes pour le palier Argent, 15 cartes pour le palier Or, et 20 cartes pour le palier Platine.</p>
                            </div>
                        </div>
                        <div>
                            <div class="mb-10">
                                <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    Combien de modifications gratuites sont disponibles ?
                                </h3>
                                <p class="text-gray-500 dark:text-gray-400">Chaque utilisateur dispose de 100 modifications gratuites de son profil. Après cela, vous pouvez acheter des bundles de modifications disponibles par lot de 100.</p>
                            </div>
                            <div class="mb-10">
                                <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    Comment puis-je améliorer mon palier ?
                                </h3>
                                <p class="text-gray-500 dark:text-gray-400">Pour améliorer votre palier, vous pouvez soit accumuler des points via les téléchargements de contacts et les vues de profil, soit acheter davantage de cartes Connect, ce qui augmentera votre palier de départ.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
    
}

export default Faq