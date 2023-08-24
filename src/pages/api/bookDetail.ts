import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

interface BookDetailType{
  title: string,
  pubDate : string,
  item : {
    title : string,
    link : string,
    author : string,
    publisher : string,
    pubDate : string,
    thumbnailUrl : string,
    description: string,
    customerReviewRank : number,
    isbn13 : string,
    priceStandard : number,
    bestRank : number
  },
}
interface SuccessResponse<T> {
  data: T;
}

interface ErrorResponse {
  error: string;
}

type ApiReponse<T> = ErrorResponse | SuccessResponse<T>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiReponse<BookDetailType>>
) {
  if(req.method === 'GET'){
    try{
      const bookId = req.query.bookId
      const response = await axios.get(`http://101.101.209.241:8080/api/detail?bookId=${bookId}&bookStoreType=ALADIN`)
      res.status(200).json(response.data)
    }
    catch(error){
      console.log(error)
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
    
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
  
  
}