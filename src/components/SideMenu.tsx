import {Box, List, ListItemButton, ListItemText} from '@mui/material'

interface SideMenuProps {
  setType: (type: string) => void;
}


const SideMenu = ({ setType }: SideMenuProps) => {

  const handleSideBtn = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickedText = e.currentTarget.innerText;
    setType(clickedText)
  }
  return(
    <Box sx={{width: '150px'}}>
      <List>
        <ListItemButton sx={{textAlign: 'center'}} onClick={handleSideBtn}>
          <ListItemText>
            베스트셀러
          </ListItemText>
        </ListItemButton>
        <ListItemButton sx={{textAlign: 'center'}} onClick={handleSideBtn}>
          <ListItemText>
            신간도서
          </ListItemText>
        </ListItemButton>
        <ListItemButton sx={{textAlign: 'center'}} onClick={handleSideBtn}>
          <ListItemText>
            편집자추천
          </ListItemText>
        </ListItemButton>
      </List>

    </Box>
  )
}
export default SideMenu