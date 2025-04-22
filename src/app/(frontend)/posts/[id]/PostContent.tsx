import Image from 'next/image'
import { PayloadLexicalReact } from '@zapal/payload-lexical-react'
import type { Post } from '@/payload-types'

export default function PostContent({ post }: { post: Post }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>

      <p className="text-gray-500 text-sm mt-1">
        Created on {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-2">
        <strong>Categories:</strong>{' '}
        {post.categories
          ?.map((cat) => (typeof cat === 'object' && 'name' in cat ? cat.name : ''))
          .filter(Boolean)
          .join(', ') || 'None'}
      </div>

      {typeof post.featuredImage === 'object' && post.featuredImage?.url && (
        <Image
          src={post.featuredImage.url}
          alt={post.featuredImage.alt || ''}
          className="my-4 w-full rounded"
          height={400}
          width={600}
        />
      )}

      {post.content && (
        <div className="prose prose-lg mt-4">
          <PayloadLexicalReact content={post.content} />
        </div>
      )}
    </div>
  )
}
