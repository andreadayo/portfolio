import {defineType} from 'sanity'
import {richText} from './richText'

export default defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',

  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Project title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'techStack',
      title: 'Tech stack',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
    {
      name: 'liveLink',
      title: 'Live link',
      type: 'url',
    },
    {
      name: 'githubLink',
      title: 'GitHub link',
      type: 'url',
    },
    {
      name: 'figmaLink',
      title: 'Figma link',
      type: 'url',
    },
    {
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [richText],
    },
  ],
})
