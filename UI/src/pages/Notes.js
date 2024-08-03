import React, { useState } from 'react'
import { Container, Typography } from '@material-ui/core'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {makeStyles} from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import  FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles= makeStyles({
  btn:{
    fontSize:70,
    backgroundColor:"violet",
    '&:hover':{
      backgroundColor:'blue'
    }
  },
  title:{
    textDecoration: 'underline',
    marginBottom:20,

  },

  field :{
    marginTop:20,
    marginBottom:20,
    display:'block'
  }

})
export default function Notes() {
  const history = useHistory()
  const classes= useStyles()
  const[title, setTitle]= useState('')
  const[details, setDetails]= useState('')
  const[titleError, setTitleError]= useState(false)
  const[detailsError, setDetailsError]= useState(false)
  const[category,SetCategory]=useState('todos')
  
  const handleSubmit=(e)=>{
   e.preventDefault()

   if(title==''){
    setTitleError(true)
   }

   
   if(details==''){
    setDetailsError(true)
   }

   if (title && details){
    fetch('http://localhost:8000/notes',
      {
        method:'POST',
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({title,details,category})
      }
    ).then(()=>history.push('/Create'))
  }
  }

  return (
    <Container>
      <Typography
      className={classes.title}
      variant='h6'
      color='textSecondary'
      component='h2'
      gutterBottom
      >
        Create a new notes
      </Typography>

  <form noValidate autoComplete='off' onSubmit={handleSubmit}>
<TextField
id="outlined-basic" 
label="Title"
 variant="outlined"
   onChange={(e)=> {setTitle(e.target.value)}}
    className={classes.field}
    varient="outlined"
    color="secondary"
    fullWidth
    required
    error={titleError}
    />

<TextField
onChange={(e)=> {setDetails(e.target.value)}}
id="outlined-basic" 
label="Details"
 variant="outlined"
    className={classes.field}
    varient="outlined"
    color="secondary"
    fullWidth
    multiline
    rows={4}
    required
    error={detailsError}

    />
<FormControl className={classes.field}>
    <FormLabel>Note category</FormLabel>
<RadioGroup value={category} onChange={(e)=>SetCategory(e.target.value)}>
    <FormControlLabel control={<Radio  value="money"/> } label='money'/>
    <FormControlLabel control={<Radio  value="todos"/> } label='todos'/>
    <FormControlLabel control={<Radio  value="reminders"/> } label='reminders'/>
    <FormControlLabel control={<Radio  value="work"/> } label='work'/>

    </RadioGroup>
<Button
      className={classes.btn}
      type='submit'
      color='secondary'
      variant='contained'
      endIcon={<KeyboardArrowRightIcon />}
      >
        submit
      </Button>
      </FormControl>

      </form>

      {/*<br/>
      <AcUnitOutlinedIcon  color='action' fontSize='large'/>*/}

      {/*<Button type='submit' color='primary'>submit</Button>
      
      <Button type='submit' color='secondary' variant='outlined'>submit</Button>
      <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
  </ButtonGroup>*/}


    </Container>
  )
}
