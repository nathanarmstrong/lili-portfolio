import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

const articleFields = /* groq */ `
  ...,
`

const projectFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  company,
  coverImage,
  overview,
  projectScope,
  service{
   ...
  },
  date,
  content,
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "article": article->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`
const serviceFields = /* groq */ `
  _id,
  _type,
  title,
  description,
  slug,
  capabilities[]{
    ...,
    _type == "capability" => {
      ...,
      description[]{
        ...,
        markDefs[]{
          ...,
          ${linkReference}
        }
      }
    },
  },
`

export const getAboutPageQuery = defineQuery(`
  *[_type == 'aboutPage'][0]{
    _id,
    _type,
    title,
    greeting,
    personalStatement,
    profileImage,
    traits,
    toolbox,
    educationDevelopment
  }
`)

export const getArticlesPageQuery = defineQuery(`
  *[_type == 'articlesPage'][0]{
    _id,
    _type,
    title,
  }
`)
export const getCapabilitiesPageQuery = defineQuery(`
  *[_type == 'capabilitiesPage'][0]{
    _id,
    _type,
    title,
    capabilities[]->{
      _id,
      _type,
      title,
      slug,
      description,
      icon
    }
  }
`)

export const getHomePageQuery = defineQuery(`
  *[_type == 'homePage'][0]{
    ...,
    featuredProjects[]{
      ...,
      "project": project -> {
        company,
        overview,
        title,
        ...,
      }
    },
    featuredServices[]{
      ...,
      service->{
        _id,
        _type,
        title,
        description,
        slug,
      },
    },
    featuredArticles[]->{
    ${articleFields}
    },
  }
`)
export const getProjectsPageQuery = defineQuery(`
  *[_type == 'projectsPage'][0]{
    ...,
  }
`)

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        button {
          ...,
          ${linkFields}
        }
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "article" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allArticlesQuery = defineQuery(`
  *[_type == "article" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${articleFields}
  }
`)

export const moreArticlesQuery = defineQuery(`
  *[_type == "article" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${articleFields}
  }
`)

export const articleQuery = defineQuery(`
  *[_type == "article" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${articleFields}
  }
`)

export const articlePagesSlugs = defineQuery(`
  *[_type == "article" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

export const allProjectsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${projectFields}
  }
`)

export const moreProjectsQuery = defineQuery(`
  *[_type == "project" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${projectFields}
  }
`)

export const projectQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug] [0] {
    ${projectFields}
  }
`)

export const projectPagesSlugs = defineQuery(`
  *[_type == "project" && defined(slug.current)]
  {"slug": slug.current}
`)

export const allServicesQuery = defineQuery(`
  *[_type == "service"] | order(date desc, _updatedAt desc) {
   ${serviceFields}
  }
`)
