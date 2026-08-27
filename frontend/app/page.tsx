import {Suspense} from 'react'
import {Article} from '@/sanity.types'
import type {PortableTextBlock} from '@portabletext/types'

import {getHomePageQuery, settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {urlForImage} from '@/sanity/lib/utils'
import Link from 'next/link'
import {ArticleCard, PortableText, StyledButton, SanityImage} from '@/app/components'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  const {data: homePageData} = await sanityFetch({
    query: getHomePageQuery,
  })

  return (
    <>
      <section className="flex flex-col snap-start md:flex-row min-h-screen pt-24 pb-24 items-end">
        <Suspense>
          <div className="flex flex-col text-[62px] leading-[78px] flex-2">
            <h1 className=" font-bold">
              {homePageData?.banner?.heading || 'Welcome to my portfolio'}
            </h1>
            <p className="mt-4 font-thin">
              {homePageData?.banner?.subheading || 'This is a demo portfolio site.'}
            </p>
          </div>
          <div className="flex flex-1 justify-end self-center md:self-end mt-12 md:mt-0">
            {homePageData?.banner?.icon?.asset && (
              <SanityImage
                id={homePageData.banner.icon.asset._ref}
                alt={''}
                className="h-auto w-auto"
                height={350}
                width={350}
                hotspot={homePageData.banner.icon.hotspot}
                mode="cover"
              />
            )}
          </div>
        </Suspense>
      </section>
      <section className="flex flex-col snap-start pt-24 pb-24 min-h-screen">
        <h2 className="section-header">Featured Projects</h2>
        <span className="w-full h-[0.5] bg-white" />
        <div className="flex flex-col gap-6 my-12" key="Test">
          <Suspense>
            {/* Featured Projects Image */}
            {homePageData?.featuredProjects &&
              homePageData.featuredProjects.length > 0 &&
              homePageData.featuredProjects.map((fProject, index) => (
                <Link key={index} href={`/projects/${fProject?.project?.slug?.current || ''}`}>
                  <div
                    className="aspect-5/2 bg-cover bg-center bg-no-repeat rounded-sm"
                    style={{
                      backgroundImage: `url(${urlForImage(fProject?.image)?.url()})`,
                    }}
                  >
                    {/* Render featured project details here */}
                  </div>
                </Link>
              ))}
          </Suspense>
          <StyledButton color="primary" solid link="/projects" className="self-end">
            View All Projects
          </StyledButton>
        </div>
      </section>
      <section className="flex flex-col snap-start gap-6 pt-24 pb-24 min-h-screen">
        <h2 className="section-header">Services</h2>
        <span className="w-full h-[0.5] bg-white" />
        <div className="flex flex-row gap-6 my-12">
          <Suspense>
            {/* list of all Featured Services */}
            {homePageData?.featuredServices &&
              homePageData.featuredServices.length > 0 &&
              homePageData.featuredServices.map((fService, index) => (
                <div className="flex flex-col flex-1 gap-8" key={index}>
                  <h3 className="text-6xl text-gray-900">0{index + 1}</h3>
                  <div className="flex flex-col gap-4">
                    <p className="text-lg font-bold">{fService?.service?.title}</p>
                    <PortableText
                      className="text-white font-light leading-7"
                      value={fService?.description as PortableTextBlock[]}
                    />
                  </div>
                </div>
              ))}
          </Suspense>
        </div>
        <StyledButton color="primary" solid link="/services" className="self-end">
          View All Services
        </StyledButton>
      </section>
      <section className="flex flex-col snap-start pt-24 pb-24 min-h-screen">
        <h2 className="section-header">Articles</h2>
        <span className="w-full h-[0.5] bg-white" />
        <div className="flex flex-col gap-6 my-12">
          <Suspense>
            {/* List of all Featured Articles */}
            <div className="flex flex-row xl:justify-between gap-[3vw] flex-wrap justify-center">
              {homePageData?.featuredArticles &&
                homePageData.featuredArticles.length > 0 &&
                homePageData.featuredArticles.map((fArticle, index) => (
                  <ArticleCard key={index} article={fArticle} />
                ))}
            </div>
          </Suspense>
          <StyledButton color="primary" solid link="/articles" className="self-end">
            View All Articles
          </StyledButton>
        </div>
      </section>
    </>
  )
}
