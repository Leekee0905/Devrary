import SearchBar from "@/components/SearchBar"
import { Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

const BookSearch = () => {
  const router = useRouter()
  const [books, setBooks] = useState<any>([])
  const { isLoading } = useQuery({
    queryKey: ['title',router.query.title],
    queryFn: ()=> axios.get('/api/search',{
      params:{
        title: router.query.title
      }
    }),
    onSuccess:({data})=>{
      console.log(data)
      setBooks(data.item)
    },
    staleTime: Infinity
  })

  if(isLoading){
    return(
      <Typography>
        Now on Loading...
      </Typography>
    )
  }
  return(
    <>
    <SearchBar/>
    {
      books.map((e: any,idx:number)=>{
        return(
          <Typography key={idx}>
            {e.title}
          </Typography>
        )
      })
    }
    </>
  )
}

export default BookSearch