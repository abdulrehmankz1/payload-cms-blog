import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Post } from '@/payload-types'
import PostContent from './PostContent'

export default async function SinglePostPage({ params }: { params: { id: string } }) {
  const payload = await getPayload({ config })

  const post = (await payload.findByID({
    collection: 'posts',
    id: params.id,
    depth: 2,
  })) as Post

  return <PostContent post={post} />
}
