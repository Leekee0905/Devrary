import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if(req.method === 'GET'){
    try{
      const title = req.query.title
      const response = await axios.get(`http://101.101.209.241:8080/api/search?keyword=${title}&page=${1}&size=${10}`)
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