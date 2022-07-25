import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NewAlbumForm from "../../pages/new/newAlbumForm";
import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {uiActions} from '../../Store/ui-slice'
import {albumActions} from '../../Store/album-slice'
import {BASE_URL} from '../../env'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ScrollDialog from '../UI/Dialog/Dialog'
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

const Favorite = () => {
    const [rows, setRows] = useState([]);
  
    const dispatch = useDispatch()
    const toggle = useSelector((state)=>state.album.isNewFormVisible)
    const isLoading = useSelector((state)=>state.ui.isLoading)
    const dialog = useSelector((state)=>state.ui.isDialogOpen)
    useEffect(()=>{
      albumList();
    },[])
    const handleDelete = async(id) => {
      //setData(data.filter((item) => item.id !== id));
      dispatch(uiActions.showLoading());
      
       let endpt = BASE_URL + "album/"+id+"/delete/";
        const resp = await Axios.delete(endpt);
        if(resp.status===204){
          alert('you have deleted the artist!')
          console.log(id);
       
        }else{
          console.log(resp.error)
        }
        setRows(rows.filter((item) => item.id !== id));
        dispatch(uiActions.showLoading());
        console.log(id);
  
    };
  
   
    const albumList = async () => {
      let endpt = BASE_URL + "album/";
      const resp = await Axios.get(endpt);
      if(resp.status===200){
      
        setRows(resp.data.results);
       
      }
      dispatch(uiActions.showLoading());
    };



   const handleClickOpen = ()=>{
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
       <TableContainer component={Paper} className="table">
  
 
  
  {dialog && 
    <ScrollDialog title="Create New Album" cancelBtn="Close" closeBtn="X" open={dialog}>
        <NewAlbumForm/>
        
    </ScrollDialog>}
 
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Favorite music</TableCell>
            <TableCell className="tableCell">artist</TableCell>
            <TableCell className="tableCell">Liked by</TableCell>
            <TableCell className="tableCell">created date</TableCell>
            <TableCell className="tableCell" colSpan={2} style={{marginLeft:"20%"}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (        
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.album_cover} alt="" className="image" />
                  {row.album_name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.album_title}</TableCell>
              <TableCell className="tableCell">{row.album_description}</TableCell>
              

              <TableCell className="tableCell">
                <Link to={"/album/" + row.id} style={{ textDecoration: "none" }}>
                     <EditIcon className = "icons"/> 
                </Link>
              </TableCell>
                            
              <TableCell className="tableCell" onClick={() => handleDelete(row.id)}>
                <DeleteIcon className="deleteIcon"/>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      {console.log(rows)}
    </TableContainer>
    </div>
    </div>
  );
};

export default Favorite;
