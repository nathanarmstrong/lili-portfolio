import {DocumentTextIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'
import type {Project} from '../../../sanity.types'

export const project = defineType({
  name: 'project',
  title: 'Project',
  icon: DocumentTextIcon,
  type: 'document',
  groups: [
    {
      name: 'details',
      title: 'Details',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the project to show up in the preview',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'details',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      group: 'details',
    }),
    defineField({
      name: 'projectScope',
      title: 'Project Scope',
      type: 'array',
      of: [{type: 'string'}],
      group: 'details',
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{type: 'service'}],
      group: 'details',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      hidden: true,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContentProjects',
    }),
  ],
  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'coverImage',
    },
    prepare({title, media, date}) {
      const subtitles = [date && `on ${format(parseISO(date), 'LLL d, yyyy')}`].filter(Boolean)

      return {title, media, subtitle: subtitles.join(' ')}
    },
  },
})
