'use client'

import {Suspense, useState, useEffect} from 'react'
import type {Service, Project} from '@/sanity.types'
import {urlForImage} from '@/sanity/lib/utils'
import ServiceList from './ServiceList'
import StyledButton from './Button'
import SanityImage from './SanityImage'
import ProjectModal from './Modal/ProjectModal'

export default function ProjectsList({
  projects,
  services,
}: {
  projects: Project[]
  services: Service[]
}) {
  const [activeService, setActiveService] = useState<string>('')
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [projectList, setProjectList] = useState<Project[]>([])
  const [serviceList, setServiceList] = useState<Service[]>([])

  useEffect(() => {
    async function fetchData() {
      setProjectList(projects as unknown as Project[])
      setServiceList(services as unknown as Service[])
    }

    fetchData()
  }, [projects, services])

  useEffect(() => {
    filteredProjects(activeService)
  }, [activeService])

  async function filteredProjects(selectedService: string): Promise<void> {
    if (selectedService === '') {
      setProjectList(projects)
      return
    }

    setProjectList(projects.filter((p) => p.service?._ref === selectedService))
  }

  return (
    <>
      <div className="">
        <div className="my-12 lg:my-24 grid gap-12">
          <div>
            <div className="pb-6 pt-20 grid gap-6 mb-6">
              <div className="flex flex-row gap-6 justify-between items-center">
                <h1 className="heading-bold">Projects</h1>
                <div className="flex gap-4">
                  {serviceList.map((sservice) => (
                    <ServiceList
                      filter={(serviceId) => {
                        setActiveService(serviceId)
                      }}
                      activeService={activeService}
                      setActiveService={setActiveService}
                      service={sservice}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-12 lg:py-24 grid gap-12">
        <aside>
          <Suspense>
            {/* <MorePosts skip={post._id} limit={2} /> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectList.map((project) => (
                <StyledButton
                  key={project._id}
                  // link={`/projects/${project.slug}`}
                  onClick={() => {
                    setActiveProject(project)
                  }}
                  className="mb-6 flex"
                >
                  <div className="mb-6 flex">
                    {project.coverImage?.asset && (
                      <SanityImage
                        id={project.coverImage.asset._ref}
                        alt={project.coverImage.alt || 'Project Image'}
                        className="h-auto w-full"
                      />
                    )}
                  </div>
                </StyledButton>
              ))}
            </div>
          </Suspense>
        </aside>
      </div>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  )
}
