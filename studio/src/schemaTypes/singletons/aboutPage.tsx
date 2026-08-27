import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {title} from '../../lib/initialValues'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {
      name: 'banner',
      title: 'Banner',
    },
    {
      name: 'content',
      title: 'Content',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your About Page.',
      title: 'Title',
      type: 'string',
      initialValue: 'About Page',
      hidden: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'greeting',
      title: 'Greeting',
      type: 'blockContentTextOnly',
      group: 'banner',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'personalStatement',
      title: 'Personal Statement',
      type: 'blockContentTextOnly',
      group: 'banner',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      group: 'banner',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'traits',
      title: 'Traits',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'trait',
          title: 'Trait',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'toolbox',
      title: 'Toolbox',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'icon',
          title: 'Icon',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'tools',
          title: 'Tools',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'tool',
              title: 'Tool',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'text',
                  title: 'Text',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'educationDevelopment',
      title: 'Education & Development',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'educationDevelopmentItem',
          title: 'Education & Development Item',
          fields: [
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
      }
    },
  },
})
