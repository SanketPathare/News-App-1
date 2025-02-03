import { NextResponse } from 'next/server'

const API_KEY = process.env.NEWS_API_KEY
const BASE_URL = 'https://newsapi.org/v2'

export async function GET(request:any) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const category = searchParams.get('category')

    const endpoint = query
      ? `${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`
      : `${BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`

    const response = await fetch(endpoint)
    const data = await response.json()

    if (data.status === 'error') {
      return NextResponse.json(
        { error: data.message },
        { status: 400 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}
