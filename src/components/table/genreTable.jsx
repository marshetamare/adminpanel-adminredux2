import "./table.scss";
import {Link, useNavigate} from 'react-router-dom'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NewGenreForm from "../../pages/genre/NewGenreForm";
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {BASE_URL} from '../../env'
import Axios from 'axios'
import {artistActions} from '../../Store/artist-slice'
import {uiActions} from '../../Store/ui-slice'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../UI/modal/modal';
import ScrollDialog from '../UI/Dialog/Dialog'
import Notification from '../../components/UI/Notification/Notification'
import { radioEnd} from "../../env";
const GenreTable = () => {
const [rows, setRows] = useState([]);
const toggle = useSelector((state)=>state.artist.isNewFormVisible)
const modal = useSelector((state)=>state.ui.isOpen)
const dialog = useSelector((state)=>state.ui.isDialogOpen)
const [isOpen, setIsOpen] = useState(false);
const [rNum, setRNum]=useState(1);
const notem = useSelector((state)=>state.ui.isNotificationOpen);
const noteme = useSelector((state)=>state.ui.notificationData);

const dispatch = useDispatch()
let navigator = useNavigate()
  useEffect(()=>{
    artistList();
    
    }, [rows])


  const handleClickOpen = ()=>{
      dispatch(uiActions.openDialog());
  }
  const handleDelet = async(id) => {
    //setData(data.filter((item) => item.id !== id));
    dispatch(uiActions.showLoading());
     let endpt = BASE_URL+ "genre/"+id+"/delete/";
      const resp = await Axios.delete(endpt);
      if(resp.status===204){
        dispatch(artistActions.decrementArtistNumber(resp.data.length));
       
        console.log('hello man');
      dispatch(
        uiActions.openNotification(
          {
            title:'Success', 
            message:"You have deleted the Radio", 
            clr:'green',
            bgcolor:'#cc65f0',
          }));
          
     
      }else{
        console.log(resp.error)
        dispatch(uiActions.openNotification(
          {title:'Error', 
          message:"please try it again!", 
          clr:'red', 
          bgcolor:'#940294'
        }));
      }
      setRows(rows.filter((item) => item.id !== id));
      dispatch(uiActions.showLoading());


  };
  const handleDelete = async(id) => {
    //setData(data.filter((item) => item.id !== id));
      dispatch(uiActions.showLoading());
      let endpt = BASE_URL + "genre/"+id+"/delete/";
       const resp = await Axios.delete(endpt);
       if(resp.status==204){
        dispatch(artistActions.decrementArtistNumber(resp.data.length));     
         dispatch(
         uiActions.openNotification(
          {
            title:'Success', 
            message:"You have deleted the genre", 
            clr:'green',
            bgcolor:'#cc65f0',
          }));
     
      } else {
        console.log(resp.error)
        dispatch(uiActions.openNotification(
          {title:'Error', 
          message:"please try it again!", 
          clr:'red', 
          bgcolor:'#940294'
        }));
      }
      setRows(rows.filter((item) => item.id !== id));
      dispatch(uiActions.showLoading());

     };

      const artistList = async () => {
        let endpt = BASE_URL + "genre/";
        const resp = await Axios.get(endpt);      
          setRows(resp.data.results);

         
          // dispatch(artistActions.setArtistNumber(resp.data.results.length()));
     
      
       // dispatch(uiActions.showLoading());
        
      };

    

  return (
    <TableContainer component={Paper} className="table">
    {<div className="datatableTitle">
    <button  className="left" onClick={handleClickOpen}>
      <h1>+</h1>
    </button>



 {/* <button className="primaryBtn" onClick={() => dispatch(uiActions.openModal())}>
    Open Modal
  </button>*/}
  
 {dialog && 
  <ScrollDialog title="Add Artist" cancelBtn="Close" closeBtn="X" open={dialog}>
      <NewGenreForm />
      
  </ScrollDialog>}
  {modal && <Modal>
    <p>You have added the Genre</p>
    </Modal>}

  </div>}

  {notem && 
  <Notification title={noteme.title} color={noteme.clr} bgcolor={noteme.bgcolor}>
         {noteme.message}
  </Notification> }
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">#</TableCell>
            <TableCell className="tableCell">Genre Cover</TableCell>
            <TableCell className="tableCell"> Genre title</TableCell>
            <TableCell className="tableCell"> Genre Discription</TableCell>
             <TableCell className="tableCell" colSpan={2} style={{align:'center' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.genre_cover} alt="" className="image" />
                 
               

                </div>
              </TableCell>
                 <TableCell className="tableCell">{row.genre_title}</TableCell>
              <TableCell className="tableCell">{row.genre_description}</TableCell>
             
              
              <TableCell className="tableCell">
              <Link to={"/genre/" + row.id} style={{ textDecoration: "none" }}>
                     <EditIcon className = "icons"/> 

            </Link>
              
              </TableCell>
                            
              <TableCell className="tableCell" onClick={() => handleDelet(row.id)}>
                <DeleteIcon className="deleteIcon"/>
              </TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
      {console.log(rows)}
    </TableContainer>
  );
};

export default GenreTable;
