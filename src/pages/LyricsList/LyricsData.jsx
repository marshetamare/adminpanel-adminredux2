import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {useState, useEffect} from 'react'
import {BASE_URL} from '../../env'
import Axios from 'axios'
import {Link} from 'react-router-dom'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function LyricsGrid() {
  const [datas, setDatas] = useState([]);
useEffect(()=>{
LyricsList()
},[datas])
  const LyricsList =  async ()=>{
await Axios.get(BASE_URL+"artist/").then((res)=>{
  
  setDatas(res.data.results);
})
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {datas.map((it) => (
          <Grid item xs={2} sm={4} md={4} key={it.id}>
            <Item>
                <Link to={"/lyrics/" + it.id} style={{textDecoration:'none'}}>
                   <h3>{it.lyrics_title}</h3>
                </Link>
                
                <p style={{margingLeft:'2px'}}><strong>Artist:</strong><span style={{color:'yellow',padding:'5px', margingLeft:'1px'}}>{it.artist_description}</span></p>
                <p style={{margingLeft:'2px'}}><strong>Music:</strong><span style={{color:'red', padding:'5px', margingLeft:'1px'}}>{it.artist_description}</span></p>
                
            </Item>
           
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
