'use client'
import {type PortableTextBlock} from 'next-sanity'
import {Suspense} from 'react'

import PortableText from '@/app/components/PortableText'
import {Project} from '@/sanity.types'
import ModalWrapper from '@/app/components/Modal/Modal'
import SanityImage from '../SanityImage'

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  if (!project?._id) {
    return null
  }

  console.log('ProjectModal project:', project)
  return (
    <ModalWrapper isOpen={!!project} onClose={onClose}>
      <div className="container">
        <div className="pb-6 grid gap-6 mb-6 border-b border-gray-100">
          <div className="max-w-3xl flex flex-col gap-6">
            <h1 className="heading-bold text-black">{project.title}</h1>
            <p>{project.company}</p>
          </div>
        </div>
        <div className=" my-12 lg:my-24 grid gap-20">
          <div className="grid gap-20  grid-cols-3">
            <div className="col-span-2">
              {project.coverImage?.asset && (
                <SanityImage
                  id={project.coverImage.asset._ref}
                  alt={project.coverImage.alt || 'Project Image'}
                  className="h-auto w-full"
                />
              )}
            </div>
            <div className="flex flex-col col-span-1 justify-between h-full">
              <div className="flex flex-col gap-6">
                <h3 className="text-lg">Overview</h3>
                <p className="text-sm font-light">{project.overview}</p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg border-b pb-6">Project Scope</h3>
                {project?.projectScope &&
                  project.projectScope.map((scope, index) => (
                    <p key={index} className="text-sm font-light border-b pb-2">
                      {scope}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          {project.content &&
            project.content.map((block, index) => (
              <div className="flex flex-col gap-12" key={index}>
                {block._type === 'textList' && (
                  <div className={`grid grid-cols-${block.textList?.length} gap-6`}>
                    {block.textList?.map((textBlock, textIndex) => (
                      <div key={textIndex} className="flex flex-col gap-6">
                        <h3 className="text-lg">{textBlock.heading}</h3>
                        <PortableText
                          key={textIndex}
                          value={textBlock.text as PortableTextBlock[]}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {block._type === 'image' && block?.asset && (
                  <SanityImage
                    id={block?.asset._ref}
                    alt={block?.asset._ref || 'Project Image'}
                    key={index}
                    className="h-auto w-full"
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </ModalWrapper>
  )
}
