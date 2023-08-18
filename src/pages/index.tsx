import Test from './test'
import BookCarousel from './components/Carousel'
import { Container } from '@mui/material'
import SearchBar from './components/SearchBar'


export default function Home() {

  return (
    <Container>

    <SearchBar/>
    <BookCarousel/>
    </Container>
    
  )
}
