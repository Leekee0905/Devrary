// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = await axios.get('http://101.101.209.241:8080/api/bestseller')
  res.status(200).json(response.data)
  res.status(500).json({data:'bye'})
}
