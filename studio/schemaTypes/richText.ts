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
          name: 'language',
          title: 'Language',
          type: 'string',
          options: {
            list: [
              {title: 'JavaScript', value: 'javascript'},
              {title: 'TypeScript', value: 'typescript'},
              {title: 'TSX', value: 'tsx'},
              {title: 'JSX', value: 'jsx'},
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'},
              {title: 'SCSS', value: 'scss'},
              {title: 'JSON', value: 'json'},
              {title: 'SQL', value: 'sql'},
              {title: 'PHP', value: 'php'},
              {title: 'Python', value: 'python'},
              {title: 'Java', value: 'java'},
              {title: 'Kotlin', value: 'kotlin'},
              {title: 'ABAP', value: 'abap'},
              {title: 'Bash', value: 'bash'},
            ],
            layout: 'dropdown',
          },
          validation: (Rule) => Rule.required(),
        },
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
          subtitle: 'language',
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
