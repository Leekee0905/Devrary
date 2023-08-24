// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

interface BestSellerItemType {
  title: string;
  link: string;
  author: string;
  publisher: string;
  pubDate: string;
  description: string;
  thumbnailUrl: string;
  customerReviesRank: number;
  isbn13: string;
  priceStandard: number;
  bestRank: number;
}

interface BestSellerType {
  title: string;
  pubDate: string;
  item: BestSellerItemType[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BestSellerType>
) {
  const response = await axios.get('http://101.101.209.241:8080/api/bestseller')
  res.status(200).json(response.data)
}
