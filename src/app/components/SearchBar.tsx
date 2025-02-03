"use client"
import { useState } from 'react'

export default function SearchBar({ onSearch }:any) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e:any) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 ">
      <div className="flex gap-2 ">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news..."
          className=" bg-slate-800  flex-1  px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-sky-800"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  )
}