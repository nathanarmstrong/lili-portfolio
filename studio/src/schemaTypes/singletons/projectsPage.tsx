import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const projectsPage = defineType({
  name: 'projectsPage',
  title: 'Projects Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your Project Page.',
      title: 'Title',
      type: 'string',
      initialValue: 'Projects Page',
      hidden: true,
      validation: (rule) => rule.required(),
    }),
  ],
})
