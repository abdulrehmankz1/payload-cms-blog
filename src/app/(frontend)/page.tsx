import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import Link from 'next/link'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center text-center px-4">
        <picture className="mb-5">
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        {!user && <h1 className="text-4xl font-bold">Welcome to your new project.</h1>}
        {user && (
          <h1 className="text-5xl font-bold text-center leading-snug">
            Welcome back,
            <br />
            {user.email}
          </h1>
        )}

        <div className="flex items-center gap-3 mt-5">
          <Link
            className="bg-white text-black border border-black px-3 py-1 rounded hover:bg-gray-100 transition"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </Link>
          <Link
            className="bg-black text-white px-3 py-1 rounded hover:underline transition"
            href="/posts"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  )
}
