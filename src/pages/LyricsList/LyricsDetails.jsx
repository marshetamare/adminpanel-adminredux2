import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {useState, useEffect} from 'react'
import {BASE_URL} from '../../env'
import Axios from 'axios'
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import {Link, useParams} from 'react-router-dom'
import LyricsCardController from '../../components/UI/LyricsUI/LyricsCard'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function LyricsDetails() {
  const [datas, setDatas] = useState([]);

  const { lyricsId } = useParams()
useEffect(()=>{
LyricsList()
},[datas])
const LyricsList =  async ()=>{
    const endpt = `${BASE_URL}lyrics/6`
await Axios.get(endpt).then((res)=>{
  setDatas(res.data);
})
  }
  return (
  <div className="list">
    <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div className="detailConatiner">
          <textarea className='txtArea'>
            {datas.lyrics_detail}
          </textarea>
            <div className="artistInfo">
                <LyricsCardController/>
            </div>
        </div>
      </div>
    </div>
  );
}
