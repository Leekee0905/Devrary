import { useRouter } from "next/router"
import { Box, Typography } from "@mui/material"
const Header = () => {
  const router = useRouter()
  return (
    <Box sx={{textAlign: 'center'}}>
      <Typography  variant="h2" sx={{margin: '20px', cursor: 'pointer',width: 'fit-content',marginLeft: 'auto', marginRight: 'auto',}}
        onClick={()=>router.push('/')}>
          Devrary
        </Typography>
    </Box>
  )
}

export default Header