import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/trackDatatable"
import TrackTable from '../../components/table/trackTable'
import { BASE_URL } from "../../env";
import Axios from 'axios';
import {useState, useEffect} from 'react';
import {useDispatch } from 'react-redux';
import { uiActions } from "../../Store/ui-slice";
import {trackActions} from '../../Store/track-slice'
import {useSelector } from "react-redux"
import MenuIcon from '@mui/icons-material/Menu';
const TrackList = () => {
  const [datas, setDatas] = useState([]);
 useEffect(()=>{
  trackList();
  
},
[])
const dispatch=useDispatch();
const dtat = [
]
  const trackList = async () => {
    let endpt = BASE_URL + "/track/";
    const resp = await Axios.get(endpt);
    if(resp.status===200){
    
      setDatas(resp.data);
      dispatch(trackActions.addTrack(resp.data))
      
      dispatch(uiActions.showLoading());
    }

    
    
    
  };
  const sidebar = useSelector((state)=>state.ui.isSidebarVisible)
  const openSidebar=()=>{
    dispatch(uiActions.openSidebarMenu())
  }
  return (
    <div className="list">
     {sidebar && <Sidebar/> }
      <div className="listContainer">
        <Navbar/>
     
        <TrackTable/>
      
      </div>
    </div>
  )
}

export default TrackList