import type {Metadata, ResolvingMetadata} from 'next'

import ProjectsList from '@/app/components/ProjectsList'
import {sanityFetch} from '@/sanity/lib/live'
import {projectPagesSlugs, allProjectsQuery, allServicesQuery} from '@/sanity/lib/queries'
import type {Service, Project} from '@/sanity.types'

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
  props: PageProps<'/projects/[slug]'>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: 'Projects',
    description: 'List Of Projects',
  } satisfies Metadata
}

export default async function ProjectsPage(props: PageProps<'/projects/[slug]'>) {
  const params = props.params
  const [{data: projects}] = await Promise.all([
    sanityFetch({
      query: allProjectsQuery,
      params,
      // Use the published perspective in generateStaticParams
      perspective: 'published',
      stega: false,
    }),
  ])
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
    <section className="sectionContainer">
      <ProjectsList
        projects={projects as unknown as Project[]}
        services={services as unknown as Service[]}
      />
    </section>
  )
}
