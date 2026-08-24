import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'The default title used for pages and search results.',
      validation: (Rule) => Rule.required().max(60),
    }),

    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'The default description used by search engines and social previews.',
      validation: (Rule) => Rule.required().max(160),
    }),

    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'image',
      title: 'Social Share Image',
      type: 'image',
      description: 'Default image used when sharing your website on social media.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),

    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: 'The canonical URL of your website.',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'SEO Settings',
      }
    },
  },
})
