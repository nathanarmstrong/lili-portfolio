import Link from 'next/link'
import NavLink from '@/app/components/Nav/NavLink'
import SanityImage from '@/app/components/SanityImage'
import NavContainer from '@/app/components/Nav/NavContainer'

export default async function Header({data: settings}: {data: any}) {
  return (
    <header className="fixed z-50 h-fit inset-0 flex items-center backdrop-blur-lg">
      <div className="container py-6">
        <div className="flex items-start justify-between gap-5">
          {/* <Link className="flex items-start gap-2" href="/">
            {settings?.logo ? (
              <SanityImage
                id={settings.logo.asset._ref}
                alt={settings.logo.alt}
                className="self-end flex w-auto"
                mode="contain"
              />
            ) : (
              <span className="text-lg sm:text-2xl pl-2 font-semibold">
                {settings?.title || 'Lili Portfolio'}
              </span>
            )}
          </Link> */}

          <NavContainer logo={settings?.logo ? settings.logo : null} />
        </div>
      </div>
    </header>
  )
}
