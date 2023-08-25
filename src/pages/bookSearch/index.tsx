import Loading from "@/components/Loading"
import SearchBar from "@/components/SearchBar"
import { Box, Container, Paper, Typography } from "@mui/material"
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
  })
  console.log(books)

  const handleRouteBookDetail = (id: string) => {
    router.push({
      pathname: '/bookDetail',
      query: {
        bookId: id
      }
    })
  }

  return(
    isLoading ? 
    <Loading/>
    :
    <Container>
      <SearchBar/>
      <ul>
        {
          books.map((e: any,idx:number)=>{
            return(
              <li key={idx} style={{borderTop: '1px solid #d5d5d5', listStyle: 'none'}}>
                <Box key={idx}  sx={{display: 'flex', marginY: '12px' }}>
                  <Paper style={{ margin: '0 15px', height: '200px', width: '150px', cursor: 'pointer'}} onClick={()=>handleRouteBookDetail(e.isbn13)}>
                    <img src={e.thumbnailUrl} alt="책썸네일" style={{height: '200px', width: '150px',}}/>
                  </Paper>
                  <Box>
                    <Typography>{e.title}</Typography>
                    <Typography>{e.author}</Typography>
                    <Typography>{e.priceStandard}원</Typography>
                  </Box>
                  
                </Box>
              </li>
            )
          })
        }
      </ul>
    </Container>
  )
}

export default BookSearch