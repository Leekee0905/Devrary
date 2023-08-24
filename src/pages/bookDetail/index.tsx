import { Box, CircularProgress, Container, Link, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { useRouter } from "next/router"
import { useState } from "react";

interface DetailDataType {
  author: string;
  bestRank: number | null
  customerReviewRank: number
  description: string
  isbn13: string
  link: string
  priceStandard: number
  pubDate: string
  publisher: string
  thumbnailUrl: string
  title: string
}

const BookDetail = () => {
  const router = useRouter();
  const [detailData,setDetailData] = useState<DetailDataType>({
    author: '',
    bestRank: 0 || null,
    customerReviewRank: 0.0,
    description: '',
    isbn13: '',
    link: '',
    priceStandard: 0,
    pubDate: '',
    publisher: '',
    thumbnailUrl: '',
    title: ''
    })
  const {isLoading} = useQuery({
    queryKey: ['bookId', router.query.bookId],
    queryFn: ()=> axios.get('/api/bookDetail',{
      params:{
        bookId: router.query.bookId
      }
    }),
    onSuccess: ({data}) => {
      setDetailData(data.item[0])
    },
  })

  return(
    isLoading ? 
    <Container>
      <Box sx={{alignItems: 'center', textAlign: 'center', marginTop: '20%'}}>
        <CircularProgress size={100} color="inherit"/>
        <Typography variant="h1">로딩중입니다.....</Typography>
      </Box>
    </Container> 
    :
    <>
      <Container>
        <Box className="bookFirstBox" sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Box className="boook-image">
            <Paper style={{ margin: '0 15px', height: '300px', width: '200px'}}>
              <img src={detailData.thumbnailUrl} alt="책썸네일"/>
            </Paper>
          </Box>
          <Box className="detailBox" sx={{flexGrow: 1}}>
            <Box sx={{ display: 'flex', marginY: '10px', alignItems: 'center'}}>
              <Typography variant="h5">제목</Typography>
              <Typography  sx={{marginLeft: '12px'}}>{detailData.title}</Typography>
            </Box>

            <Box sx={{ display: 'flex', marginY: '10px', alignItems: 'center'}}>
              <Typography variant="h5">작가</Typography>
              <Typography  sx={{marginLeft: '12px'}}>{detailData.author}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', marginY: '10px', alignItems: 'center'}}>
              <Typography variant="h5">출판사</Typography>
              <Typography sx={{marginLeft: '12px'}}>{detailData.publisher}</Typography>
            </Box>

            <Box sx={{ display: 'flex', marginY: '10px', alignItems: 'center'}}>
              <Typography variant="h5">평점</Typography>
              <Typography sx={{marginLeft: '12px'}}>{detailData.customerReviewRank}</Typography>
            </Box>
            
            

          </Box>
          <Box className="links">
            <Link href={detailData.link} underline="none" sx={{color: 'black'}}>
              <Typography sx={{marginY: '12px'}}>네이버 링크</Typography>
            </Link>
            <Link href={detailData.link} underline="none" sx={{color: 'black'}}>
              <Typography sx={{marginY: '12px'}}>알라딘 링크</Typography>
            </Link>
            <Link href={detailData.link} underline="none" sx={{color: 'black'}}>
              <Typography sx={{marginY: '12px'}}>인터파크 링크</Typography>
            </Link>
          </Box>
        </Box>

        <Box className="description" sx={{margin: '15px auto'}}>
          <Typography variant="h5">책에 대한 간단한 설명</Typography>
          <Typography sx={{marginTop: '15px'}}>{detailData.description}</Typography>
        </Box>

        <Box className="review">
          <Typography>작성된 서평</Typography>
        </Box>
      </Container>
    </>
  )
}

export default BookDetail