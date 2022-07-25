import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useState,useEffect } from "react";
import { Container, Row, Col } from 'react-grid-system';
import {useSelector, useDispatch} from 'react-redux'
import Axios from 'axios';
import {BASE_URL, BASE_URL_POD} from '../../env';
import {artistActions } from '../../Store/artist-slice';
import {albumActions } from '../../Store/album-slice';
import {trackActions } from '../../Store/track-slice';
import { AgChartsReact } from 'ag-charts-react';
import {GenreActions} from '../../Store/genre_slice';
import {uiActions} from '../../Store/ui-slice';
import MenuIcon from '@mui/icons-material/Menu';

const Home = () => {
  const [rows, setRows] = useState([]);
  const [artistd, setArtistd]=useState();
  const artist = useSelector((state)=>state.artist.numberOfArtist);
  const album = useSelector((state)=>state.album.numberOfAlbum);
  const track = useSelector((state)=>state.track.numberOfTrack);
   const podcast = useSelector((state)=>state.podcast.numberOfPodcast);

  const dispatch=useDispatch()
 
  useEffect(()=>{
    artistList();
    albumList();
    trackList();
    podcastList();
}, [])
const podcastList = async () => {
  const endpt = BASE_URL_POD + "host/";
   const resp = await Axios.get(endpt);
   if(resp.status===200){  
    
    dispatch(trackActions.setTrackNumber(resp.data.results.length));
    
   }
   
  // dispatch(uiActions.showLoading());
   
 };
  const artistList = async () => {
    const endpt = BASE_URL + "artist/";
     const resp = await Axios.get(endpt);
     if(resp.status===200){  
      
      dispatch(artistActions.setArtistNumber(resp.data.results.length));
      
     }
     
    // dispatch(uiActions.showLoading());
     
   };
   
   const albumList = async () => {
    const endpt = BASE_URL + "album/";
     const resp = await Axios.get(endpt);
     if(resp.status===200){  
      
      dispatch(albumActions.setAlbumNumber(resp.data.results.length));
      
     }
     
    // dispatch(uiActions.showLoading());
     
   };

   const trackList = async () => {
    const endpt = BASE_URL + "track/";
     const resp = await Axios.get(endpt);
     if(resp.status===200){  
      
      dispatch(trackActions.setTrackNumber(resp.data.results.length));
      
     }
     
    // dispatch(uiActions.showLoading());
     
   };
   const options={
    data:[
    { label: 'pop', value: 56.9 },
    { label: 'rap', value: 80.5 },
    { label: 'regge', value: 6.8 },
    { label: 'love', value: 78 },
    { label: 'oldies', value: 2.6 },
    { label: 'contry', value: 1.9 },
  ],
  series:[
    {
      type: 'pie',
      angleKey: 'value',
      labelKey: 'label',
    },
  ]
};
const genreList = async () => {
  let endpt = BASE_URL + "genre/";
  const resp = await Axios.get(endpt);
  if(resp.status===200){      
    setRows(resp.data.results);
   
  }
  
  dispatch(uiActions.showLoading());
};

const toggleHandler = ()=>{
    dispatch(GenreActions.toggler())
}
useEffect(()=>{
  genreList();
},[])

const sidebar = useSelector((state)=>state.ui.isSidebarVisible)
const openSidebar=()=>{
  dispatch(uiActions.openSidebarMenu())
}
 return (
    <div className="home">
    {sidebar && <Sidebar/> }
      <div className="homeContainer">
        <Navbar />
     
        <div className="widgets">
          <Widget type="musics" quantity={track}/>
          <Widget type="artist" quantity={artist}/>          
          <Widget type="album" quantity={album} />
          <Widget type="podcast" />
        </div>
        <div className="container">
                    
            <Container>
           <Row>         
           <Col sm={8} md={10}>
             <div className="col-md-8">             
              <AgChartsReact options={options} />                
              </div>
           </Col>
          
         </Row>
       </Container>
              
        </div>
        <div className="charts">
        <Chart title="User Registration Data" aspect={2 / 1} />

        </div>
        <div className="widgets">
          <Widget type="newMusics" />
          <Widget type="newArtist" />
          <Widget type="newAlbum" />
          <Widget type="newClient" />
        </div>
        <div className="listContainer">
          <div className="listTitle">popular musics</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
