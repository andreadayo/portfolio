import type {StructureResolver} from 'sanity/structure'
import {UserIcon} from '@sanity/icons/User'
import {CaseIcon} from '@sanity/icons/Case'
import {BookIcon} from '@sanity/icons/Book'
import {CodeBlockIcon} from '@sanity/icons/CodeBlock'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {BookmarkIcon} from '@sanity/icons/Bookmark'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Navigation')
    .items([
      S.listItem()
        .id('about')
        .schemaType('about')
        .title('About')
        .icon(UserIcon)
        .child(S.editor().id('about').schemaType('about').documentId('about')),

      orderableDocumentListDeskItem({
        type: 'experience',
        title: 'Experience',
        icon: CaseIcon,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: 'education',
        title: 'Education',
        icon: BookIcon,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: 'techStack',
        title: 'Tech Stack',
        icon: CodeBlockIcon,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: 'projects',
        title: 'Projects',
        icon: DocumentsIcon,
        S,
        context,
      }),

      S.listItem()
        .id('contact')
        .schemaType('contact')
        .title('Contact')
        .icon(EnvelopeIcon)
        .child(S.editor().id('contact').schemaType('contact').documentId('contact')),

      S.listItem()
        .id('footer')
        .schemaType('footer')
        .title('Footer')
        .icon(BookmarkIcon)
        .child(S.editor().id('footer').schemaType('footer').documentId('footer')),
    ])
