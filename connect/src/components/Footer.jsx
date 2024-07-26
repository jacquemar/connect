import React from 'react'

function Footer() {
  return (
    <div><hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <div className="text-center mb-2">
      {" "}
      <span className="block text-sm  text-gray-500 sm:text-center dark:text-gray-400">
        © 2024{" "}
        <a href="https://connect.io/" className="hover:underline font-bold">
          CONNECT™
        </a>
        . All Rights Reserved.
      </span>
    </div></div>
  )
}

export default Footer