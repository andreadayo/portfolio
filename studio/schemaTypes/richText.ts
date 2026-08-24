import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'richText',
  title: 'Rich text',
  type: 'array',
  of: [
    // Normal text
    defineArrayMember({
      type: 'block',
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                name: 'newTab',
                type: 'boolean',
                title: 'Open in new tab',
                initialValue: true,
              },
            ],
          },
        ],
      },
    }),

    // Quote block
    defineArrayMember({
      name: 'quote',
      title: 'Quote',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Quote',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'author',
          title: 'Author',
          type: 'string',
        },
      ],
      preview: {
        select: {
          title: 'text',
          subtitle: 'author',
        },
      },
    }),

    // Code block
    defineArrayMember({
      name: 'code',
      title: 'Code',
      type: 'object',
      fields: [
        {
          name: 'code',
          title: 'Code',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
      ],
      preview: {
        select: {
          title: 'code',
        },
      },
    }),

    // Image
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
      ],
    }),
  ],
})
