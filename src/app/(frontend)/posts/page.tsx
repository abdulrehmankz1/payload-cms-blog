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
  const { posts, categories } = await getPostsAndCategories()
  const postDocs = posts.docs
  const categoryDocs = categories.docs

  // Get the category from searchParams
  const category = searchParams?.category

  const filteredPosts = category
    ? postDocs.filter((post: ExtendedPost) =>
        post.categories?.some((cat) => typeof cat === 'object' && cat.name === category),
      )
    : postDocs

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">All Posts</h1>

      {/* Category Filters - Updated with better mobile spacing */}
      <div className="flex flex-wrap justify-start sm:justify-center gap-y-2 gap-x-2 mb-8 px-2 sm:px-0">
        <Link href="/posts" className="mb-2 sm:mb-0">
          <span
            className={`text-sm px-4 py-2 border border-gray-600 rounded cursor-pointer transition ${
              !category ? 'bg-white text-gray-800' : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            All Posts
          </span>
        </Link>
        {categoryDocs.map((categoryItem: Category) => (
          <Link
            key={categoryItem.id}
            href={`/posts?category=${categoryItem.name}`}
            className="mb-2 sm:mb-0"
          >
            <span
              className={`text-sm px-4 py-2 border border-gray-600 rounded cursor-pointer transition ${
                category === categoryItem.name
                  ? 'bg-white text-gray-800'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {categoryItem.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post: ExtendedPost) => (
          <div key={post.id} className="h-full">
            <div className="flex flex-col h-full border-2 border-gray-800 rounded-lg overflow-hidden bg-gray-900">
              {typeof post.featuredImage === 'object' && post.featuredImage?.url && (
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || ''}
                  className="h-48 w-full object-fill object-center"
                  height={192}
                  width={320}
                />
              )}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                    Category:{' '}
                    {post.categories
                      ?.map((cat) => (typeof cat === 'object' && 'name' in cat ? cat.name : ''))
                      .filter(Boolean)
                      .join(', ') || 'Uncategorized'}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3">{post.title}</h1>
                  <p className="leading-relaxed text-gray-300 mb-3">
                    Posted on {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-auto">
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-indigo-400 inline-flex items-center hover:underline"
                  >
                    Learn More &#x2192;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
