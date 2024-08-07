import React from 'react'

function BasDePage() {
  return (
    <div>      <footer className="mt-6 mx-3 fixed bottom-0 left-0 right-0 text-white py-4">
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-center items-center">
        {/* Liste des éléments du footer */}
        <ul className="flex flex-wrap text-black gap-2 font-medium justify-center text-sm md:justify-center">
          <li className="mb-2 md:mb-0 md:mx-4"><a href="/cookies" className="hover:underline">Cookies</a></li>
          <li className="mb-2 md:mb-0 md:mx-4"><a href="/conditions-generales" target="_blank" rel="noopener noreferrer">Conditions Générales</a></li>
          <li className="mb-2 md:mb-0 md:mx-4"><a href="/confidentialites" className="hover:underline">Confidentialité</a></li>
          <li className="mb-2 md:mb-0 md:mx-4"><a href="/mentions-legales" className="hover:underline">Mentions Légales</a></li>
          <li className="mb-2 md:mb-0 md:mx-4"><a href="/faq" className="hover:underline">F.A.Q</a></li>
          <li className="mb-2 md:mb-0 md:mx-4"><a href="/blog" className="hover:underline">Blog</a></li>
          <li className="mb-2 md:mb-0 md:mx-4"><a href="/profile/connect" className="hover:underline">Contacts</a></li>
        </ul>
      </div>
    </div>
  </footer></div>
  )
}

export default BasDePage