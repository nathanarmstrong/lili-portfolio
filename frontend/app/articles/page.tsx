import type {Metadata, ResolvingMetadata} from 'next'

import ArticleCard from '@/app/components/ArticleCard'
import {sanityFetch} from '@/sanity/lib/live'
import {projectPagesSlugs, allArticlesQuery} from '@/sanity/lib/queries'

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: projectPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  })
  return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(
  props: PageProps<'/articles'>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: 'Articles',
    description: 'List Of Articles',
  } satisfies Metadata
}

export default async function ArticlesPage(props: PageProps<'/articles'>) {
  const params = props.params
  const [{data: articles}] = await Promise.all([
    sanityFetch({
      query: allArticlesQuery,
      params,
      // Use the published perspective in generateStaticParams
      perspective: 'published',
      stega: false,
    }),
  ])

  return (
    <>
      <section className="flex flex-row gap-6 mb-6 border-gray-100">
        {/* Side Nav For Filter Topics */}
        <div className="flex flex-col basis-1/4 gap-6 mb-6 border-gray-100"></div>
        {/* List OF all Filtered Articles */}
        <div className="flex flex-row basis-3/4 justify-between flex-wrap justify-start gap-[2.9vw] mb-6">
          {articles?.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
          {/* fake 4 articles */}
        </div>
      </section>
    </>
  )
}
