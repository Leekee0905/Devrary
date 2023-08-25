import { Box, CircularProgress, Container, Typography } from "@mui/material"

const Loading = () => {
  return(
    <Container>
      <Box sx={{alignItems: 'center', textAlign: 'center', marginTop: '20%'}}>
        <CircularProgress size={100} color="inherit"/>
        <Typography variant="h1">로딩중입니다.....</Typography>
      </Box>
    </Container> 
  )
}

export default Loading