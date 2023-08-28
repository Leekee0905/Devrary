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
      setBooks(data.item)
    },
  })

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
                <Box key={idx}  sx={{display: 'flex', marginY: '50px' }}>
                  <Paper style={{ margin: '0 15px', height: '200px', width: '150px', cursor: 'pointer'}} onClick={()=>handleRouteBookDetail(e.isbn13)}>
                    <img src={e.thumbnailUrl} alt="책썸네일" style={{height: '200px', width: '150px',}}/>
                  </Paper>
                  <Box>
                    <Typography sx={{fontSize: '15px', fontWeight: 500, marginY: '20px'}}>{e.title}</Typography>
                    <Typography sx={{fontSize: '13px', marginY: '20px'}}>{e.author}</Typography>
                    <Typography sx={{fontSize: '14px', marginY: '20px'}}>{e.priceStandard}원</Typography>
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