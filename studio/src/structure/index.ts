import {CogIcon, DocumentIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = [
  'settings',
  'page',
  'assist.instruction.context',
  'homePage',
  'capabilitiesPage',
  'personalProjectsPage',
  'projectsPage',
  'articlesPage',
  'aboutPage',
  'articleTag',
]

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages List')
            .items([
              S.listItem()
                .title('Home')
                .child(S.document().schemaType('homePage').documentId('homePage'))
                .icon(DocumentIcon),
              S.listItem()
                .title('Capabilities')
                .child(S.document().schemaType('capabilitiesPage').documentId('capabilitiesPage'))
                .icon(DocumentIcon),
              S.listItem()
                .title('Personal Projects')
                .child(
                  S.document()
                    .schemaType('personalProjectsPage')
                    .documentId('personalProjectsPage'),
                )
                .icon(DocumentIcon),
              S.listItem()
                .title('Projects')
                .child(S.document().schemaType('projectsPage').documentId('projectsPage'))
                .icon(DocumentIcon),
              S.listItem()
                .title('Articles')
                .child(S.document().schemaType('articlesPage').documentId('articlesPage'))
                .icon(DocumentIcon),
              S.listItem()
                .title('About')
                .child(S.document().schemaType('aboutPage').documentId('aboutPage'))
                .icon(DocumentIcon),
            ]),
        ),
      ...S.documentTypeListItems()
        // Remove the "assist.instruction.context" and "settings" content  from the list of content types
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
        // Pluralize the title of each document type.  This is not required but just an option to consider.
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),
      // Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
