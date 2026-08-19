import {defineType} from 'sanity'
import {richText} from './richText'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',

  fields: [
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .regex(/^[A-Za-z]{2}$/, {
            name: 'twoLetters',
          })
          .error('Icon must contain exactly 2 letters'),
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'employmentType',
      title: 'Employment type',
      type: 'string',
      options: {
        list: [
          {title: 'Full-time', value: 'full-time'},
          {title: 'Part-time', value: 'part-time'},
          {title: 'Internship', value: 'internship'},
          {title: 'Contract', value: 'contract'},
          {title: 'Organization', value: 'organization'},
        ],
      },
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'workMode',
      title: 'Work mode',
      type: 'string',
      options: {
        list: [
          {title: 'On-site', value: 'on-site'},
          {title: 'Hybrid', value: 'hybrid'},
          {title: 'Remote', value: 'remote'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'positions',
      title: 'Positions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Position',
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
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [richText],
            },
          ],
        },
      ],
    },
  ],
})
