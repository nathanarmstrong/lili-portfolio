import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const banner = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
    },
    prepare({title}) {
      return {
        title: title || 'Untitled Banner',
        subtitle: 'Banner',
      }
    },
  },
})
