import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { BASE_URL } from "../../env";
import Axios from 'axios';
import {useState, useEffect} from 'react';
import {useDispatch } from 'react-redux';
import { uiActions } from "../../Store/ui-slice";
import {artistActions} from '../../Store/artist-slice'
import {useSelector } from "react-redux"
import PodcastTable from '../../components/table/podcastTable'
import EpisodeTable from "../../components/podcastTable/Episodes";
import MenuIcon from '@mui/icons-material/Menu';
const PodcastEpisodeList= () => {
  const [datas, setDatas] = useState([]);
  
const dispatch=useDispatch();
const sidebar = useSelector((state)=>state.ui.isSidebarVisible)
  const openSidebar=()=>{
    dispatch(uiActions.openSidebarMenu())
  }
  return (
    <div className="list">
        {sidebar && <Sidebar/> }
      <div className="listContainer">
        <Navbar/>
             <EpisodeTable/>
      
      </div>
    </div>
  )
}

export default PodcastEpisodeList;