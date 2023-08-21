import { Box, Typography, Paper, Button } from '@mui/material'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SideMenu from './SideMenu';
const itemPerPage = 4
const BookCarousel = () => {
  const data = [{item: 'title',content: 'content'},{item: 'title',content: 'content'},{item: 'title',content: 'content'},{item: 'title',content: 'content'},{item: 'title',content: 'content'}]
  const totalSlides = Math.ceil(data.length / itemPerPage);

  const slides = Array.from({ length: totalSlides }).map((_, index) => (
    <Box key={index} style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    }}>
      {data
        .slice(index * itemPerPage, (index + 1) * itemPerPage)
        .map((item, itemIndex) => (
          <Paper key={itemIndex} style={{ margin: '0 15px', height: '300px', width: '200px' }}>
            <Typography variant="h5">{item.item}</Typography>
            <Typography variant="body1">{item.content}</Typography>
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
      <SideMenu/>
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