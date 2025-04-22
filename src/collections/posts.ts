import { CollectionConfig, CollectionSlug } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical' // ✅ Import editor here too

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor(),
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories' as CollectionSlug,
      hasMany: true,
      required: true,
    },
  ],
}

export default Posts
