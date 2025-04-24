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
    <div className="min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl flex flex-col items-center text-center">
        <picture className="mb-5">
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            width={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
          />
        </picture>

        {!user && (
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Welcome to your new project.
          </h1>
        )}

        {user && (
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-snug max-w-full sm:max-w-full md:max-w-4xl lg:max-w-4xl">
            Welcome back,
            <br />
            <span className="break-words">{user.email}</span>
          </h1>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
          <Link
            className="bg-white text-black border border-black px-4 py-2 rounded hover:bg-gray-100 transition w-full sm:w-auto text-center"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </Link>
          <Link
            className="bg-black text-white px-4 py-2 rounded hover:underline transition w-full sm:w-auto text-center"
            href="/posts"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  )
}
