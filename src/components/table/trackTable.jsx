import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {useEffect, useState} from 'react'
import {trackActions} from '../../Store/track-slice'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {uiActions} from '../../Store/ui-slice'
import {BASE_URL} from '../../env'
import NewTrackForm from '../../pages/new/newTrack'
import ScrollDialog from '../UI/Dialog/Dialog'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const AlbumTable = () => {
    const [rows, setRows] = useState([]);
  
    const dispatch = useDispatch()
    const toggle = useSelector((state)=>state.track.isNewFormVisible)
    const isLoading = useSelector((state)=>state.ui.isLoading)
    const dialog = useSelector((state)=>state.ui.isDialogOpen)
    useEffect(()=>{
      trackList();
    },[])
    const trackList = async () => {
      let endpt = BASE_URL + "track/";
      const resp = await Axios.get(endpt);
      if(resp.status===200){
      
        setRows(resp.data.results);
        //dispatch(trackActions.addTrack(resp.data.results))
        
        dispatch(uiActions.showLoading());
      }
      
    };

  const handleDelete = async(id) => {
    //setData(data.filter((item) => item.id !== id));
    dispatch(uiActions.showLoading());
    
     let endpt = BASE_URL+"track/"+id+"/delete/";
      const resp = await Axios.delete(endpt);
      if(resp.status===204){
        alert('you have deleted the artist!')
        window.location.reload();
     
      }else{
        console.log(resp.error)
        window.location.reload();
      }
      setRows(rows.filter((item) => item.id !== id));
      dispatch(uiActions.showLoading());

  };
  
  const toggleHandler = ()=>{
    dispatch(trackActions.toggler())
}
 
const handleClickOpen = ()=>{
  dispatch(uiActions.openDialog());
}
  return (
    <TableContainer component={Paper} className="table">
    {!toggle && <div className="datatableTitle">
    <button  className="left" onClick={handleClickOpen}>
      <h1>+</h1>
    </button>


  </div>}

  {dialog && 
    <ScrollDialog title="Add Artist" cancelBtn="Close" closeBtn="X" open={dialog}>
        <NewTrackForm/>
        
    </ScrollDialog>}
 
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">MP3</TableCell>
            <TableCell className="tableCell">Description</TableCell>
           
            <TableCell className="tableCell" style={{float:'center', marginLeft: '40px'}} colSpan={3} >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper" style={{display:'flex', flexDirection:'column'}}>
                  <audio src={row.track_file} alt="" controls /><br/>
                  <strong style={{transform: 'translateY(-40px)'}} >{row.track_name}</strong>
                </div>

              </TableCell>
              <TableCell className="tableCell">{row.track_description}</TableCell>
              
              <TableCell className="tableCell">
                <span className={`status ${row.track_status}`} onClick = {(e)=>alert('done')}>{row.track_status? 'Approved' : 'Pending'}</span>
              </TableCell>

              <TableCell className="tableCell">
              <Link to={"/track/" + row.id} style={{ textDecoration: "none" }}>
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
    </TableContainer>
  );
};

export default AlbumTable;
