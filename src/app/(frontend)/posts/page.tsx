'use server'

import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'

export default async function PostsPage() {
  const payload = await getPayload({ config })

  const postsRes = await payload.find({
    collection: 'posts',
    depth: 2,
  })

  const posts = postsRes.docs

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">All Posts</h1>

      {posts.length === 0 && <p>No posts found.</p>}
      {posts.map((post: any) => (
        <div key={post.id} className="border p-4 mb-4 bg-white rounded">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <div className="mt-2">
            <strong>Categories:</strong>{' '}
            {post.categories?.map((cat: any) => cat.name).join(', ') || 'None'}
          </div>
          <p className="mt-2">{post.content?.[0]?.children?.[0]?.text || ''}</p>

          {post.featuredImage?.url && (
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || ''}
              className="mt-3 w-full max-w-sm rounded"
              height={100}
              width={100}
            />
          )}
        </div>
      ))}
    </div>
  )
}
