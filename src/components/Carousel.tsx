import { Box, Typography, Paper, Button, Link } from '@mui/material'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SideMenu from './SideMenu';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
const itemPerPage = 4
const BookCarousel = (props:any) => {
  const router = useRouter();
  const [bookData, setBookData] = useState<any>([])
  const totalSlides = Math.ceil(bookData.length / itemPerPage);
  const [thumbnailType, setThumbnailType] = useState<string>('베스트셀러')
  const { isLoading } = useQuery({
    queryKey: ['type',thumbnailType],
    queryFn: ()=> {
      if(thumbnailType === '베스트셀러'){
        return axios.get('/api/bestseller')
      }
      else if(thumbnailType === '신간도서'){
        return axios.get('/api/newAll')
      }
      else if(thumbnailType === '편집자추천'){
        return axios.get('/api/editorChoice')
      }
    }
    ,
    onSuccess:({data}: any)=>{
      setBookData(data.item)
      console.log(data)
    }
  })
  console.log(thumbnailType)
  const slides = Array.from({ length: totalSlides }).map((_, index) => (
    <Box key={index} style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    }}>
      {bookData
        .slice(index * itemPerPage, (index + 1) * itemPerPage)
        .map((item:any, itemIndex:number) => (
          <Paper key={itemIndex} style={{ margin: '0 15px', height: '300px', width: '200px', cursor: 'pointer'}}
            onClick={()=>{
              router.push({
                pathname: '/bookDetail',
                query: {
                  bookId: item.isbn13
                }
              })}}
          >
              <img src={item.thumbnailUrl} alt='책' style={{height: '300px', width: '200px'}} loading='lazy'/>
          </Paper>
        ))}
    </Box>
  ));

  const renderCustomArrow = (
    onClickHandler: React.MouseEventHandler<HTMLButtonElement>,
    label: string,
    position: 'prev' | 'next'
  ) => (
    <Button
      type="button"
      onClick={onClickHandler}
      title={label}
      sx={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        [position === 'prev' ? 'left' : 'right']: 0,
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        padding: '8px 10px',
        cursor: 'pointer',
      }}
    >
      {position === 'prev' ? <ArrowBackIosIcon/> : <ArrowForwardIosIcon/>}
    </Button>
  );
  
  return(
    <Box sx={{display: 'flex', margin: 'auto'}}>
      <SideMenu setType={setThumbnailType}/>
      <Box sx={{ width: '75%',  margin: '0 auto' }}>
        <Carousel
          showArrows={true}
          emulateTouch={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && renderCustomArrow(onClickHandler, label, 'prev')
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && renderCustomArrow(onClickHandler, label, 'next')
          }
          className="custom-carousel-container"
        >
          {slides}
        </Carousel>
      </Box>
    </Box>
  )
}

export default BookCarousel