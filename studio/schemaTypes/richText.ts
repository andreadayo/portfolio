import {defineArrayMember} from 'sanity'

export const richText = defineArrayMember({
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
})
