import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function CategoriesPage() {
  const payload = await getPayload({ config })

  const categoriesRes = await payload.find({
    collection: 'categories',
  })

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">All Categories</h1>
      <ul className="list-disc pl-6">
        {categoriesRes.docs.map((cat: any) => (
          <li key={cat.id} className="mb-2">
            <strong>{cat.name}</strong> - {cat.description}
          </li>
        ))}
      </ul>
    </div>
  )
}
