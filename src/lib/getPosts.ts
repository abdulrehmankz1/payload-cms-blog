import { getPayload } from 'payload'
import config from '@/payload.config'
import { Post } from '@/payload-types'

export async function getPostsAndCategories() {
  const payload = await getPayload({ config })

  // Fetch posts and categories
  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
  })

  const categories = await payload.find({
    collection: 'categories',
  })

  return { posts, categories }
}

export async function getPostById(postId: string) {
  const payload = await getPayload({ config })

  // Fetch a single post by ID
  const post = await payload.findByID({
    collection: 'posts',
    id: postId,
    depth: 2,
  })

  return post as Post
}
