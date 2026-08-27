import Link from 'next/link'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import NavLink from '@/app/components/NavLink'

export default async function Header({data: settings}: {data: any}) {
  return (
    <header className="fixed z-50 h-24 inset-0 flex items-center backdrop-blur-lg">
      <div className="container py-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            <span className="text-lg sm:text-2xl pl-2 font-semibold">
              {settings?.title || 'Lili Portfolio'}
            </span>
          </Link>

          <nav>
            <ul
              role="list"
              className="flex items-center gap-4 md:gap-6 leading-5 text-xs sm:text-base tracking-tight"
            >
              <NavLink href="/about" underline>
                About
              </NavLink>
              <NavLink href="/capabilities" underline>
                Capabilities
              </NavLink>
              <NavLink href="/projects" underline>
                Projects
              </NavLink>
              <NavLink href="/personal" underline>
                Personal
              </NavLink>
              <NavLink href="/articles" underline>
                Articles
              </NavLink>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
