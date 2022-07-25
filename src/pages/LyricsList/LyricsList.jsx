import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import AlbumDatatable from "../../components/datatable/albDatatable"
import { BASE_URL } from "../../env";
import Axios from 'axios';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { uiActions } from "../../Store/ui-slice";
import LyricsGrid from './LyricsData'
import ScrollDialog from '../../components/UI/Dialog/Dialog.jsx'
import NewLyricsForm from './createNewLyrics'
import MenuIcon from '@mui/icons-material/Menu';
const LyricsList = () => {
  const [datas, setDatas] = useState([]);
const dispatch=useDispatch();
const dialog = useSelector((state)=>state.ui.isDialogOpen);

const handleDialog=()=>{
  dispatch(uiActions.openDialog());
}
const sidebar = useSelector((state)=>state.ui.isSidebarVisible)
const openSidebar=()=>{
  dispatch(uiActions.openSidebarMenu())
}

  return (
    <div className="list">
       {sidebar && <Sidebar/> }
      <div className="listContainer">
        <Navbar/>
        
            <div className="lyricsDashboard" >
                <div className="lyricsMainHead">
                    <h3>Lyrics</h3>
                    <div className="preDashHead">
                        <h3>Dashboard</h3>
                        <p>/</p>
                        <h5>Lyrics</h5>
                    </div>
                </div>
                <div className="addButnLyrics">
                    <button onClick={handleDialog}>
                        Add Lyrics
                    </button>
                </div>


{dialog && 
    <ScrollDialog title="Create New Lyrics" cancelBtn="Close" closeBtn="X" open={dialog}>
        <NewLyricsForm/>
        
    </ScrollDialog>}

            </div>
            
      <LyricsGrid />
                        
           
       
       
      
      </div>
    </div>
  )
}

export default LyricsList