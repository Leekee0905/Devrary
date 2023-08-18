import { Button, TextField, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form"
import SearchIcon from '@mui/icons-material/Search';

type BookName = {
  name: string;
}

const SearchBar = () => {

  const { control, handleSubmit } = useForm<BookName>({
    defaultValues: {
      name: ''
    }
  });
  return(
    <Box sx={{marginTop: '50px', marginBottom: '50px'}}>
      <form onSubmit={handleSubmit((e)=>console.log(e))}  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({field}) => (
            <>
              <TextField
                sx={{width: '100%'}}
                {...field}
                variant="outlined"
                InputProps={{
                  style:{
                    borderRadius: '100px'
                  },
                  startAdornment:(
                    <Button type='submit' variant='contained' 
                    sx={{
                      backgroundColor: 'white',
                      marginRight: '8px',
                      color: 'black',
                      marginLeft: '8px',
                      height: '100%',
                      border: 'none',
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: 'white',
                      },
                      '&:active': {
                        boxShadow: 'none',
                      },
                    }}
                    disableElevation 
                    >
                      <SearchIcon/>
                    </Button>
                  )
                }}
              />
            </>
          )}/>
        
      </form>
    </Box>
  )
}

export default SearchBar