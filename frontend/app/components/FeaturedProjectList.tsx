'use client'
import {useState} from 'react'
import {
  Project,
  SanityImageAssetReference,
  SanityImageCrop,
  SanityImageHotspot,
} from '@/sanity.types'
import ProjectCard from './ProjectCard'
import ProjectModal from './Modal/ProjectModal'

type featuredProjects = {
  project: Project
  image: {
    asset?: SanityImageAssetReference
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  _type: 'featuredProject'
  _key: string
}

export default function FeaturedProjectList({projects}: {projects: featuredProjects[]}) {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  console.log('FEATURE PROJECTS ------ ', projects)
  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        {/* Hover card content goes here */}
        {projects &&
          projects.length > 0 &&
          projects.map(({project, image}) => (
            <ProjectCard
              key={project.company}
              image={image}
              project={project}
              callBack={() => {
                setActiveProject(project)
              }}
            />
          ))}
      </div>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  )
}
