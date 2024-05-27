import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import imgUrl from '../assets/logoRounded.png'
import { routes } from '../constants'
import { NavButton } from './components'

export const NavBar: React.FC = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false)

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav)
  }

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Mascotas', url: routes.pets.url },
    { id: 2, text: 'Nosotros', url: routes.about.url },
    { id: 3, text: 'Contacto', url: routes.contact.url },
    { id: 4, text: 'Registro', url: routes.registration.url },
    { id: 5, text: 'Login', url: routes.login.url },
    { id: 6, text: 'Nueva Mascota', url: routes.nuevamascota.url},
    { id: 7, text: 'Nuevo Post', url: routes.nuevopost.url}
  ]

  return (
    <div className='bg-gray-200 text-white'>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4'>
        {/* Logo */}
        <div className='text-orange-500'>
          <NavButton route={routes.home.url}>
            {/* <!-- Heroicon - Chip Outline --> */}
            <img
              className='img-fluid mx-auto w-8 h-8'
              src={imgUrl}
              alt='logo'
            />
          </NavButton>
        </div>
        <div className="loader"></div>
        {/* Desktop Navigation */}
        <ul className='hidden md:flex font-semibold justify-between'>
          {navItems.map(item => (
            <li key={item.id} className='m-2'>
              <NavButton
                route={item.url}
                text={item.text}
                className='p-4 hover:bg-orange-600 rounded-xl cursor-pointer duration-300 text-orange-600 hover:text-white'
              />
            </li>
          ))}
        </ul>

        {/* Mobile Navigation Icon */}
        <div onClick={handleNav} className='block md:hidden cursor-pointer'>
          {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </div>

        {/* Mobile Navigation Menu */}
        <ul
          className={
            nav
              ? 'fixed md:hidden left-0 top-0 w-[90%] h-full border-r border-r-gray-900 bg-gray-200 ease-in-out duration-500'
              : 'ease-in-out w-[90%] duration-500 fixed top-0 bottom-0 left-[-100%]'
          }
        >
          {/* Mobile Logo */}
          <div className='text-orange-500 m-4'>
            <NavButton route={routes.home.url}>
              <img
                className='img-fluid mx-auto w-16 h-16'
                src={imgUrl}
                alt='logo'
              />
            </NavButton>
          </div>

          {/* Mobile Navigation Items */}
          {navItems.map(item => (
            <li key={item.id} className='m-4'>
              <NavButton
                route={item.url}
                text={item.text}
                className='block p-4 hover:bg-orange-600 rounded-xl cursor-pointer duration-300 text-orange-600 hover:text-white border border-gray-300'
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
