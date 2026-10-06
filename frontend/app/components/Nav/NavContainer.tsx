'use client'
import {useState} from 'react'
import Link from 'next/link'

import NavLink from '@/app/components/Nav/NavLink'
import SanityImage from '@/app/components/SanityImage'

const navLinks = [
  {href: '/about', label: 'About'},
  {href: '/capabilities', label: 'Capabilities'},
  {href: '/projects', label: 'Projects'},
  {href: '/personal', label: 'Personal'},
  {href: '/articles', label: 'Articles'},
]

export default function NavContainer({logo}: {logo: any}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <MobileMenu logo={logo} />
      <DesktopMenu logo={logo} />
    </>
  )
}

const DesktopMenu = ({logo}: {logo: any}) => {
  return (
    <nav className="hidden md:flex w-full flex-row items-center justify-between gap-6 leading-5 text-xs sm:text-base tracking-tight">
      <Link className="flex items-start gap-2" href="/">
        {logo ? (
          <SanityImage
            id={logo.asset._ref}
            alt={logo.alt}
            className="self-end flex w-auto"
            mode="contain"
          />
        ) : null}
      </Link>
      <ul className="hidden md:flex flex-row items-center gap-6 leading-5 text-xs sm:text-base tracking-tight">
        {navLinks.map(({href, label}) => (
          <li key={href} className="md:text-sm text-lg font-light">
            <NavLink href={href}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const MobileMenu = ({logo}: {logo: any}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="md:hidden w-full">
      <div className="flex items-center justify-between gap-6 leading-5 text-xs sm:text-base tracking-tight w-full">
        <Link className="flex items-start gap-2" href="/">
          {logo ? (
            <SanityImage
              id={logo.asset._ref}
              alt={logo.alt}
              className="self-end flex w-auto"
              mode="contain"
            />
          ) : null}
        </Link>
        <button className="" onClick={() => setIsOpen(!isOpen)}>
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      {/* animated nav items sliding in from the right side */}
      <ul
        className={`flex flex-col md:flex-row items-center gap-4 
          md:gap-6 leading-5 text-xs sm:text-base tracking-tight 
          max-h-0 overflow-hidden
          ${isOpen ? 'max-h-full opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'} transition-all duration-300 ease-in-out`}
      >
        {navLinks.map(({href, label}) => (
          <li key={href} className="md:text-sm text-lg font-light">
            <NavLink href={href}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
