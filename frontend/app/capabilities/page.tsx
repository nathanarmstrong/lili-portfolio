import type {Metadata, ResolvingMetadata} from 'next'
import {Suspense} from 'react'

import {sanityFetch} from '@/sanity/lib/live'
import {projectPagesSlugs, allServicesQuery} from '@/sanity/lib/queries'
import type {Service} from '@/sanity.types'
import ServiceAccordian from '@/app/components/ServiceAccordian'

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
  props: PageProps<'/capabilities'>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: 'Capabilities',
    description: 'List Of Capabilities',
  } satisfies Metadata
}

export default async function CapabilitiesPage(props: PageProps<'/capabilities'>) {
  const params = props.params
  const [{data: services}] = await Promise.all([
    sanityFetch({
      query: allServicesQuery,
      params,
      // Use the published perspective in generateStaticParams
      perspective: 'published',
      stega: false,
    }),
  ])

  return (
    <>
      <section className="min-h-screen pt-24 pb-24 snap-start">
        <div className="flex flex-col mb-6">
          <Suspense>
            {services?.map((service, index) => (
              <ServiceAccordian
                key={service._id}
                service={service as unknown as Service}
                index={index}
              />
            ))}
          </Suspense>
        </div>
      </section>
    </>
  )
}
