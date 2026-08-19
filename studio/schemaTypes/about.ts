import {defineType} from 'sanity'
import {richText} from './richText'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {hotspot: true},
    },
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'role', title: 'Role', type: 'string'},
    {name: 'location', title: 'Location', type: 'string'},
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [richText],
    },
  ],
})
