import Link from 'next/link'

import {sanityFetch} from '@/sanity/lib/live'
import {moreArticlesQuery, allArticlesQuery} from '@/sanity/lib/queries'
import {AllArticlesQueryResult} from '@/sanity.types'
import DateComponent from '@/app/components/Date'
import OnBoarding from '@/app/components/Onboarding'
import Avatar from '@/app/components/Avatar'
import {dataAttr} from '@/sanity/lib/utils'

const Post = ({post}: {post: AllArticlesQueryResult[number]}) => {
  const {_id, title, slug, date} = post

  return (
    <article
      data-sanity={dataAttr({id: _id, type: 'article', path: 'title'}).toString()}
      key={_id}
      className="border border-gray-200 rounded-sm p-6 bg-gray-50 flex flex-col justify-between transition-colors hover:bg-white relative"
    >
      <Link className="hover:text-brand underline transition-colors" href={`/posts/${slug}`}>
        <span className="absolute inset-0 z-10" />
      </Link>
      <div>
        <h3 className="text-2xl mb-4">{title}</h3>

        {/* <p className="line-clamp-3 text-sm leading-6 text-gray-600 max-w-[70ch]">{excerpt}</p> */}
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <time className="text-gray-500 text-xs" dateTime={date}>
          <DateComponent dateString={date} />
        </time>
      </div>
    </article>
  )
}

const Posts = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode
  heading?: string
  subHeading?: string
}) => (
  <div>
    {heading && <h2 className="text-3xl text-gray-900 sm:text-4xl lg:text-5xl">{heading}</h2>}
    {subHeading && <p className="mt-2 text-lg leading-8 text-gray-600">{subHeading}</p>}
    <div className="pt-6 space-y-6">{children}</div>
  </div>
)

export const MoreArticles = async ({skip, limit}: {skip: string; limit: number}) => {
  const {data} = await sanityFetch({
    query: moreArticlesQuery,
    params: {skip, limit},
  })

  if (!data || data.length === 0) {
    return null
  }

  return (
    <Posts heading={`Recent Posts (${data?.length})`}>
      {data?.map((post: AllArticlesQueryResult[number]) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  )
}

export const AllArticles = async () => {
  const {data} = await sanityFetch({query: allArticlesQuery})

  if (!data || data.length === 0) {
    return <OnBoarding />
  }

  return (
    <Posts
      heading="Recent Articles"
      subHeading={`${data.length === 1 ? 'This article is' : `These ${data.length} articles are`} populated from your Sanity Studio.`}
    >
      {data.map((post: AllArticlesQueryResult[number]) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  )
}
