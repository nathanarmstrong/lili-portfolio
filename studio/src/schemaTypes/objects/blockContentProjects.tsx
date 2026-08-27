import {defineArrayMember, defineType, defineField} from 'sanity'
import type {Link} from '../../../sanity.types'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 *
 * Learn more: https://www.sanity.io/docs/block-content
 */
export const blockContentProjects = defineType({
  title: 'Block Content Projects',
  name: 'blockContentProjects',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'textList',
      type: 'object',
      title: 'Text List',
      fields: [
        defineField({
          name: 'textList',
          type: 'array',
          title: 'Text List',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'textListItem',
              title: 'Text List Item',
              fields: [
                defineField({
                  name: 'heading',
                  title: 'Heading',
                  type: 'string',
                }),
                defineField({
                  name: 'text',
                  title: 'Text',
                  type: 'array',
                  of: [{type: 'block'}],
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
      preview: {
        select: {
          title: 'textList',
        },
        prepare(selection) {
          const {title} = selection
          let heading = ''
          for (const [index, item] of title.entries()) {
            if (item._type === 'textListItem') {
              if (index > 0) {
                heading += ', '
              }
              heading += item.heading
            }
          }
          return {
            title: heading || 'Text List',
            subtitle: 'Text List Item',
          }
        },
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineArrayMember({
      name: 'subheading',
      title: 'Subheading',
      type: 'object',
      fields: [
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'string',
        }),
      ],
    }),
    defineArrayMember({
      name: 'bodyText',
      title: 'Body Text',
      type: 'object',
      fields: [
        defineField({
          name: 'bodyText',
          title: 'Body Text',
          type: 'blockContentTextOnly',
        }),
      ],
    }),
  ],
})
