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
import GenreTable from '../../components/table/genreTable'
import MenuIcon from '@mui/icons-material/Menu';

const List = () => {
  const [datas, setDatas] = useState([]);
  const dispatch=useDispatch();
const sidebar = useSelector((state)=>state.ui.isSidebarVisible)
const openSidebar=()=>{
  dispatch(uiActions.openSidebarMenu())
}

const dtat = [
]
  const artList = []
  datas.map((res)=>(artList.push({id:res.id, name:res.artist_name, img:res.artist_avatar, description:res.artist_description})));
  return (
    <div className="list">
      {sidebar && <Sidebar/> }
      <div className="listContainer">
        <Navbar/>
     

        <GenreTable/>
      
      </div>
    </div>
  )
}

export default List