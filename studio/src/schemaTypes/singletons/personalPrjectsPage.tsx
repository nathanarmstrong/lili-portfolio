import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const personalProjectsPage = defineType({
  name: 'personalProjectsPage',
  title: 'Personal Projects Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your Personal Projects Page.',
      title: 'Title',
      type: 'string',
      initialValue: 'Personal Projects Page',
      hidden: true,
      validation: (rule) => rule.required(),
    }),
  ],
})
