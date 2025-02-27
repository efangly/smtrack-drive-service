import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' })
  }

  try {
    const response = await fetch(url, { headers: { Origin: '*' } })
    const data = await response.arrayBuffer()

    res.setHeader('Content-Type', response.headers.get('Content-Type') || 'image/png')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).send(Buffer.from(data))
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch image' })
  }
}
