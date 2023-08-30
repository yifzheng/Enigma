'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, singOut, useSession, getProviders, signOut } from "next-auth/react"
import Logo from "../public/assets/images/algorithm.png"

const Nav = () => {
  const isUserLoggedIn = true

  // login providers such as Google and etc...
  const [ providers, setProviders ] = useState( null )
  const [ toggleDropDown, setToggleDropDown ] = useState( false )

  // on load of page
  useEffect( () => {
    const setProviders = async () => {
      const response = await getProviders()
      setProviders( response )
    }
    return () => {
      setProviders()
    }
  }, [] )

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href={ "/" } className='flex gap-2 flex-center'>
        <Image
          src={ Logo }
          width={ 45 }
          height={ 45 }
          className='object-contain'
          alt='Enginma Logo'
        />
        <p className='logo_text'>Enigma</p>
      </Link>

      {/* Desktop Navigation */ }
      <div className="sm:flex hidden">
        { isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href={ "/create-prompt" } className='black_btn'>
              Create Post
            </Link>

            <button type="button" onClick={ signOut } className='outline_btn'>Sign Out</button>
            <Link href={ "/profile" }>
              <Image src={ Logo }
                width={ 37 }
                height={ 37 }
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        )
          :
          <>
            { providers &&
              Object.values( providers ).map( ( provider ) => (
                <button type='button' key={ provider.name } onClick={ () => signIn( provider.id ) } className='black_btn'>
                  Sign In
                </button>
              ) ) }
          </>
        }
      </div>

      {/* Mobile Navigation */ }
      <div className="sm:hidden flex">
        { isUserLoggedIn ?
          (
            <div className="flex">
              <Image src={  Logo }
                width={ 37 }
                height={ 37 }
                className='rounded-full cursor-pointer'
                alt='profile'
                onClick={ () => setToggleDropDown( ( prev ) => !prev ) }
              />
              { toggleDropDown && (
                <div className="dropdown">
                  <Link
                    href={ "/profile" }
                    className='dropdown_link'
                    onClick={ () => setToggleDropDown( false ) }
                  >
                    My Profile
                  </Link>
                  <Link
                    href={ "/profile" }
                    className='dropdown_link'
                    onClick={ () => setToggleDropDown( false ) }
                  >
                    Create Prompt
                  </Link>
                  <button type="button" onClick={ () => {
                    setToggleDropDown( false )
                    signOut();
                  } }
                    className='mt-5 w-full black_btn'
                  >
                    Sign Out
                  </button>
                </div>
              ) }
            </div>
          )
          :
          (
            <>
              { providers &&
                Object.values( providers ).map( ( provider ) => (
                  <button type='button' key={ provider.name } onClick={ () => signIn( provider.id ) } className='black_btn'>
                    Sign In
                  </button>
                ) ) }
            </>

          ) }
      </div>
    </nav>
  )
}

export default Nav