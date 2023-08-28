import {Box, List, ListItemButton, ListItemText} from '@mui/material'
import { useState } from 'react';

interface SideMenuProps {
  setType: (type: string) => void;
}


const SideMenu = ({ setType }: SideMenuProps) => {

  const [selected , setSelected] = useState<number>(0)
  const handleSideBtn = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const clickedText = e.currentTarget.innerText;
    setType(clickedText)
    setSelected(index)
  }
  return(
    <Box sx={{width: '150px'}}>
      <List>
        <ListItemButton sx={{textAlign: 'center'}} onClick={(e)=>handleSideBtn(e,0)} selected={selected === 0}>
          <ListItemText>
            베스트셀러
          </ListItemText>
        </ListItemButton>
        <ListItemButton sx={{textAlign: 'center'}} onClick={(e)=>handleSideBtn(e,1)} selected={selected === 1}>
          <ListItemText>
            신간도서
          </ListItemText>
        </ListItemButton>
        <ListItemButton sx={{textAlign: 'center'}} onClick={(e)=>handleSideBtn(e,2)} selected={selected === 2}>
          <ListItemText>
            편집자추천
          </ListItemText>
        </ListItemButton>
      </List>

    </Box>
  )
}
export default SideMenu