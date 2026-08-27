import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  description:
    'The Home Page is the main landing page of the website. It contains a banner and a list of featured projects.',
  icon: DocumentIcon,
  initialValue: {
    title: 'Home Page',
  },
  preview: {
    select: {
      title: 'title',
    },
  },
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your Home Page.',
      title: 'Title',
      type: 'string',
      initialValue: 'Home Page',
      hidden: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'banner',
      title: 'Banner',
      type: 'banner',
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [
        defineField({
          name: 'featuredProject',
          title: 'Featured Project',
          type: 'object',
          fields: [
            defineField({
              name: 'project',
              title: 'Project',
              type: 'reference',
              to: [{type: 'project'}],
              validation: (rule) => rule.required(),
            }),
            defineField({
              type: 'image',
              name: 'image',
              title: 'Image',
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'project.title',
              subtitle: 'project.company',
              image: 'image.asset',
            },
            prepare(selection) {
              const {title, image, subtitle} = selection
              return {
                title: title,
                subtitle: subtitle || 'Projects',
                media: image || undefined,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'featuredServices',
      title: 'Featured Services',
      type: 'array',
      of: [
        defineField({
          name: 'featuredService',
          title: 'Featured Service',
          type: 'object',
          fields: [
            defineField({
              name: 'service',
              title: 'Service',
              type: 'reference',
              to: [{type: 'service'}],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{type: 'block'}],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'service.title',
            },
            prepare({title}) {
              return {title: title || 'Service'}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'featuredArticles',
      title: 'Featured Articles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'article'}],
        }),
      ],
    }),
  ],
})
