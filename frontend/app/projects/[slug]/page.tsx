import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {type PortableTextBlock} from 'next-sanity'
import {Suspense} from 'react'

import PortableText from '@/app/components/PortableText'
import {sanityFetch} from '@/sanity/lib/live'
import {projectPagesSlugs, projectQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

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
  const params = await props.params
  const {data: project} = await sanityFetch({
    query: projectQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  })
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(project?.coverImage)

  return {
    title: project?.title,
    description: project?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata
}

export default async function ProjectPage(props: PageProps<'/projects/[slug]'>) {
  const params = await props.params
  const {data: project} = await sanityFetch({query: projectQuery, params})

  if (!project?._id) {
    return notFound()
  }

  return (
    <>
      <div className="">
        <div className="container my-12 lg:my-24 grid gap-12">
          <div>
            <div className="pb-6 grid gap-6 mb-6 border-b border-gray-100">
              <div className="max-w-3xl flex flex-col gap-6">
                <h1 className="heading-bold">{project.title}</h1>
              </div>
            </div>
            <article className="gap-6 grid max-w-4xl">
              {/* <div className=""> */}
              {/* {post?.coverImage && (
                  <Image
                    id={post.coverImage.asset?._ref || ''}
                    alt={post.coverImage.alt || ''}
                    className="rounded-sm w-full"
                    width={1024}
                    height={538}
                    mode="cover"
                    hotspot={post.coverImage.hotspot}
                    crop={post.coverImage.crop}
                  />
                )}
              </div> */}
              {project.content?.length && (
                <PortableText
                  className="max-w-2xl prose-headings:font-medium prose-headings:tracking-tight"
                  value={project.content as PortableTextBlock[]}
                />
              )}
            </article>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container py-12 lg:py-24 grid gap-12">
          <aside>
            <Suspense>{/* <MoreProjects skip={project._id} limit={2} /> */}</Suspense>
          </aside>
        </div>
      </div>
    </>
  )
}
