import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const capabilitiesPage = defineType({
  name: 'capabilitiesPage',
  title: 'Capabilities Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your Capabilities Page.',
      title: 'Title',
      type: 'string',
      initialValue: 'Capabilities Page',
      hidden: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'capabilities',
      title: 'Capabilities',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'service'}],
          name: 'capability',
          title: 'Capability',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
})
