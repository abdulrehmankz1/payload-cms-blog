import { getPostsAndCategories } from '@/lib/getPosts'
import Image from 'next/image'
import Link from 'next/link'
import { Category, Post as PayloadPost } from '@/payload-types'

type ExtendedPost = PayloadPost & {
  categories?: (string | Category)[]
}

type PostsPageProps = {
  searchParams: {
    category?: string
  }
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  // Get all posts and categories from the server
  const { posts, categories } = await getPostsAndCategories()

  // Access docs property for posts and categories
  const postDocs = posts.docs
  const categoryDocs = categories.docs

  // Filter posts by category if a category is selected
  const filteredPosts = searchParams.category
    ? postDocs.filter((post: ExtendedPost) =>
        post.categories?.some(
          (cat) => typeof cat === 'object' && cat.name === searchParams.category,
        ),
      )
    : postDocs

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">All Posts</h1>

      {/* Filter: Categories */}
      <div className="mb-4">
        <button className="mr-4 text-blue-500">
          <Link href="/posts">All Posts</Link>
        </button>
        {categoryDocs.map((category: Category) => (
          <button key={category.id} className="mr-4 text-blue-500">
            <Link href={`/posts?category=${category.name}`}>{category.name}</Link>
          </button>
        ))}
      </div>

      {/* Render filtered posts */}
      {filteredPosts.map((post: ExtendedPost) => (
        <div key={post.id} className="border p-4 mb-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">{post.title}</h2>

          <p className="text-gray-500 text-sm">
            Posted on {new Date(post.createdAt).toLocaleDateString()}
          </p>

          <div className="mt-1">
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
              className="mt-3 w-full rounded"
              height={200}
              width={300}
            />
          )}

          <Link href={`/posts/${post.id}`} className="text-blue-500 underline mt-2 inline-block">
            See full post
          </Link>
        </div>
      ))}
    </div>
  )
}
