import {defineType} from 'sanity'

export default defineType({
  name: 'education',
  title: 'Education',
  type: 'document',

  fields: [
    {
      name: 'school',
      title: 'School',
      type: 'string',
    },
    {
      name: 'program',
      title: 'Program',
      type: 'string',
    },
    {
      name: 'startDate',
      title: 'Start date',
      type: 'date',
      options: {
        dateFormat: "MMM 'YY",
      },
    },
    {
      name: 'isCurrent',
      title: 'Current position',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'endDate',
      title: 'End date',
      type: 'date',
      options: {
        dateFormat: "MMM 'YY",
      },
      hidden: ({parent}) => parent?.isCurrent === true,
    },
  ],
})
