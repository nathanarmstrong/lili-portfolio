'use client'
import {type PortableTextBlock} from 'next-sanity'

import {Article} from '@/sanity.types'
import ModalWrapper from '@/app/components/Modal/Modal'
import CustomPortableText from '@/app/components/PortableText'

export default function ArticleModal({
  article,
  onClose,
}: {
  article: Article | null
  onClose: () => void
}) {
  if (!article?._id) {
    return null
  }

  console.log('ProjectModal project:', article)
  return (
    <ModalWrapper isOpen={!!article} onClose={onClose}>
      <div className="container max-w-4xl px-4 lg:px-0">
        <div className="pt-12 grid gap-6 mb-12">
          <div className=" flex flex-col gap-6">
            <h1 className="text-3xl font-light">{article.title}</h1>
            <h4 className="text-sm font-light">{article.title}</h4>
          </div>
        </div>
        <div>
          {article?.readTime && (
            <p className="text-xs font-light text-white bg-black p-2 rounded uppercase">
              {article.readTime} read
            </p>
          )}
        </div>
        <div className=" my-12 lg:my-12 grid gap-20">
          {article.content && (
            <div className="flex flex-col gap-12">
              <CustomPortableText
                className="flex flex-col gap-12"
                value={article.content as PortableTextBlock[]}
              />
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  )
}
