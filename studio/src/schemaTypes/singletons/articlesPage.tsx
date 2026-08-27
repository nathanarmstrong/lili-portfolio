import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const articlesPage = defineType({
  name: 'articlesPage',
  title: 'Articles Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your Articles Page.',
      title: 'Title',
      type: 'string',
      initialValue: 'Articles Page',
      hidden: true,
      validation: (rule) => rule.required(),
    }),
  ],
})
