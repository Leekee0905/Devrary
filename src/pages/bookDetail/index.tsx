import Loading from "@/components/Loading";
import SearchBar from "@/components/SearchBar";
import { Box, Container, Link, Paper, Typography, Divider } from "@mui/material";
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
    <Loading/>
    :
    <>
      <Container>
        <SearchBar/>
        <Box className="bookFirstBox" sx={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
          <Box className="boook-image">
            <Paper style={{ margin: '0 15px', height: '300px', width: '200px'}}>
              <img src={detailData.thumbnailUrl} alt="책썸네일"/>
            </Paper>
          </Box>
          <Box className="detailBox" sx={{flexGrow: 1}}>
            <Box sx={{ display: 'flex', marginY: '10px', alignItems: 'center', minWidth: '50px'}}>
              <Typography variant="h5" sx={{whiteSpace: 'nowrap'}}>제목</Typography>
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
          <Divider orientation="vertical" flexItem sx={{marginX: '20px'}} />
          <Box className="links">
            <Link href={detailData.link} underline="none" sx={{color: 'black'}}>
              <Typography sx={{marginY: '12px', whiteSpace: 'nowrap'}}>네이버 링크</Typography>
            </Link>
            <Link href={detailData.link} underline="none" sx={{color: 'black'}}>
              <Typography sx={{marginY: '12px', whiteSpace: 'nowrap'}}>알라딘 링크</Typography>
            </Link>
            <Link href={detailData.link} underline="none" sx={{color: 'black'}}>
              <Typography sx={{marginY: '12px', whiteSpace: 'nowrap'}}>인터파크 링크</Typography>
            </Link>
          </Box>
        </Box>

        <Divider/>

        <Box className="description" sx={{margin: '15px auto'}}>
          <Typography variant="h5">책에 대한 간단한 설명</Typography>
          <Typography sx={{marginTop: '15px'}}>{detailData.description}</Typography>
        </Box>

        <Box className="review">
          <Typography variant="h5">작성된 서평</Typography>
        </Box>
      </Container>
    </>
  )
}

export default BookDetail