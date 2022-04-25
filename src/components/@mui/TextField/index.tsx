import { styled, TextField } from "@mui/material";


export default styled(TextField)({
  '& label.Mui-focused': {
    color: '#5CC9CD',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#FAFAFA',
    '& fieldset': {
      borderColor: '#D9E9EA',
      borderRadius: '8px'
    },
    '&:hover fieldset': {
      borderColor: '#D9E9EA'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#D9E9EA',
    },
  },
});