import {SanityImage, SocialIconLinkedin, SocialIconInstagram} from '@/app/components'
import type {Settings} from '@/sanity.types'

export default function Footer({data}: {data: Settings['Footer']}) {
  return (
    <footer className="relative">
      <section className="items-center md:items-start pb-6 pt-24 snap-end flex  gap-30 flex-col lg:flex-row">
        <div className="">
          {data?.icon && data.icon?.asset?._ref && (
            <SanityImage
              id={data.icon.asset._ref}
              alt={'Footer icon'}
              className="self-end flex"
              height={90}
              width={90}
              // hotspot={data.icon?.asset?.hotspot}
              mode="contain"
            />
          )}
        </div>
        <div className="flex flex-col h-[stretch] justify-between">
          <div>
            <p className="text-3xl font-light">{data?.footerText}</p>
            <p className="text-3xl font-bold">{data?.footerEmail}</p>
          </div>
          {data?.footerLinks && (
            <div className="flex flex-row gap-6">
              {data.footerLinks.map(({link, type}, index) => (
                <div
                  className="flex border-white border-2 rounded-full bg-white p-2 group hover:bg-black transition-all duration-300 ease-in-out"
                  key={index}
                >
                  {type === 'linkedin' && <SocialIconLinkedin />}
                  {type === 'instagram' && <SocialIconInstagram />}
                </div>
              ))}
            </div>
          )}
          <div className="flex">
            <p>
              © 2026 Lilianne Khuong. Designed by yours truly, pixel by pixel. Developed by Nathan
              Armstrong.
            </p>
          </div>
        </div>
      </section>
    </footer>
  )
}
