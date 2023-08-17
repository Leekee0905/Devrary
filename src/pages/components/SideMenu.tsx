import {Box, List, ListItemButton, ListItemText} from '@mui/material'
const SideMenu = () => {

  return(
    <Box sx={{width: '150px'}}>
      <List>
        <ListItemButton sx={{textAlign: 'center'}}>
          <ListItemText>
            베스트셀러
          </ListItemText>
        </ListItemButton>
        <ListItemButton sx={{textAlign: 'center'}}>
          <ListItemText>
            신간도서
          </ListItemText>
        </ListItemButton>
        <ListItemButton sx={{textAlign: 'center'}}>
          <ListItemText>
            편집자추천
          </ListItemText>
        </ListItemButton>
      </List>

    </Box>
  )
}
export default SideMenu