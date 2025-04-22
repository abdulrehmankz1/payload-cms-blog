import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getPostsAndCategories() {
  const payload = await getPayload({ config })

  // Fetch posts with categories
  const posts = await payload.find({
    collection: 'posts',
    depth: 2, // Adjust if needed based on your data structure
  })

  // Fetch categories from the database (assuming there's a 'categories' collection)
  const categories = await payload.find({
    collection: 'categories',
  })

  return { posts, categories }
}
