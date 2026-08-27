import type {Metadata} from 'next'
import Head from 'next/head'
import {PortableTextBlock} from 'next-sanity'

import PageBuilderPage from '@/app/components/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {getAboutPageQuery, pagesSlugs} from '@/sanity/lib/queries'
import {GetPageQueryResult} from '@/sanity.types'
import {SanityImage} from '@/app/components'
import PortableText from '@/app/components/PortableText'

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  })
  return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: PageProps<'/[slug]'>): Promise<Metadata> {
  const params = await props.params
  const {data: page} = await sanityFetch({
    query: getAboutPageQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  })

  return {
    title: page?.title,
    description: 'About me',
  } satisfies Metadata
}

export default async function Page(props: PageProps<'/[slug]'>) {
  const params = await props.params
  const [{data: page}] = await Promise.all([sanityFetch({query: getAboutPageQuery, params})])

  if (!page?._id) {
    return <div className="py-40"></div>
  }

  return (
    <div className="">
      <Head>
        <title>{page.title}</title>
      </Head>
      {/* GREETING */}
      <section className="pb-6 pt-24 snap-start min-h-screen">
        <div className="flex xl:flex-row flex-col min-h-[93vh]">
          <div className="xl:text-left basis-2/3 flex flex-col xl:justify-between py-12 pr-10">
            {page.greeting && (
              <PortableText
                value={page.greeting as PortableTextBlock[]}
                className="text-white text-4xl font-thin"
              />
            )}
            {page.personalStatement && (
              <PortableText
                value={page.personalStatement as PortableTextBlock[]}
                className="text-white text-lg font-thin mt-6 place-items-end"
              />
            )}
          </div>
          {page.profileImage?.asset?._ref && (
            <div className="aspect-[5/7] xl:max-w-[30vw] flex max-w-full xl:items-center">
              <SanityImage
                id={page.profileImage?.asset?._ref}
                alt={'Lilianne profile image'}
                className="h-auto w-auto xl:self-end"
                // height={350}
                // width={350}
                // hotspot={page.profileImage?.asset?.hotspot}
                mode="contain"
              />
            </div>
          )}
        </div>
      </section>
      {/* TRAITS */}
      <section className="pb-6 pt-24 snap-start min-h-screen items-center flex">
        {page.traits && (
          <div className="flex flex-row gap-24 w-full">
            {page.traits.map((trait, index) => (
              <div key={index} className="flex max-w-[730px] flex-col gap-12">
                {trait.icon?.asset?._ref && (
                  <SanityImage
                    id={trait.icon?.asset?._ref}
                    alt={trait.title || 'Trait icon'}
                    className="self-end flex"
                    height={90}
                    width={90}
                    // hotspot={trait.icon?.asset?.hotspot}
                    mode="contain"
                  />
                )}
                <div className="flex flex-col gap-4">
                  <h4 className="text-lg text-balance">{trait.title}</h4>
                  <p className="text-sm">{trait.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      {/* TOOLBOX */}
      <section className="pb-6 pt-24 snap-start min-h-screen items-center flex ">
        {page.toolbox && (
          <div className="flex flex-row gap-6 justify-between w-full">
            <div className="flex flex-col gap-24">
              <h3 className="text-white text-xl font-bold">Toolbox</h3>
              <div className="grid grid-cols-2 gap-x-60 gap-y-6">
                {page.toolbox.tools &&
                  page.toolbox.tools.map((tool: {title: string; text: string}, index: number) => (
                    <div key={index} className="flex flex-col gap-1">
                      <p className="text-white font-bold text-sm font-semibold">{tool.title}</p>
                      <p className="text-white text-sm font-light">{tool.text}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              {page.toolbox?.icon?.asset?._ref && (
                <SanityImage
                  id={page.toolbox.icon.asset._ref}
                  alt={'Toolbox image'}
                  className="h-[calc(50vh+70px)] w-auto mt-[-70px]"
                  // height={350}
                  // width={350}
                  // hotspot={page.toolbox.icon?.asset?.hotspot}
                  mode="contain"
                />
              )}
            </div>
          </div>
        )}
      </section>
      {/* Education and Development */}
      <section className="pb-6 pt-24 snap-start min-h-screen items-center flex">
        {page.educationDevelopment && (
          <div className="flex flex-col gap-12 w-full">
            <h3 className="text-white text-xl font-bold">Education and Development</h3>
            <div className="flex flex-col gap-6">
              {page.educationDevelopment.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <h3 className="text-[#202020] text-5xl font-bold">{item.year}</h3>
                  <p className="text-white font-bold text-xs">{item.title}</p>
                  <p className="text-white text-xs font-thin ">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
