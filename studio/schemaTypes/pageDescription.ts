import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pageDescription',
  title: 'Page Description',
  type: 'document',
  fields: [
    defineField({
      name: 'experienceDescription',
      title: 'Experience Description',
      type: 'richText',
    }),

    defineField({
      name: 'projectListDescription',
      title: 'Project List Description',
      type: 'richText',
    }),
  ],

  preview: {
    prepare: () => ({
      title: 'Page Description',
    }),
  },
})
