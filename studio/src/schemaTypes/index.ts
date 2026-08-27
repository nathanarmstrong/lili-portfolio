// import {person} from './documents/person'
// import {page} from './documents/page'
import {article, articleTag} from './documents/article'
import {project} from './documents/project'
import {banner} from './objects/banner'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {homePage} from './singletons/homePage'
import {capabilitiesPage} from './singletons/capabilitiesPage'
import {personalProjectsPage} from './singletons/personalPrjectsPage'
import {projectsPage} from './singletons/projectsPage'
import {articlesPage} from './singletons/articlesPage'
import {aboutPage} from './singletons/aboutPage'
import {link} from './objects/link'
import {service} from './documents/service'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'
import {blockContentProjects} from './objects/blockContentProjects'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  aboutPage,
  articlesPage,
  homePage,
  capabilitiesPage,
  personalProjectsPage,
  projectsPage,
  // Documents
  // page,
  article,
  articleTag,
  project,
  // person,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  blockContentProjects,
  infoSection,
  callToAction,
  link,
  banner,
  service,
]
