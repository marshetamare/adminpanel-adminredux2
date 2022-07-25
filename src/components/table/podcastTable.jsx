import "./table.scss";
import {Link} from 'react-router-dom'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NewPodcastForm from "../../pages/new/newPodcastForm";
import {
  useEffect, 
  useState
} from 'react'
import {
   useSelector,
   useDispatch
  } from 'react-redux';
import Axios from 'axios'
import {artistActions} from '../../Store/artist-slice'
import {uiActions} from '../../Store/ui-slice'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../UI/modal/modal';
import Notification from '../UI/Notification/Notification';
import ScrollDialog from '../UI/Dialog/Dialog'
import {BASE_URL_POD} from '../../env'
const PodcastTable = () => {
const [rows, setRows] = useState([]);
const toggle = useSelector((state)=>state.artist.isNewFormVisible)
const modal = useSelector((state)=>state.ui.isOpen)
const dialog = useSelector((state)=>state.ui.isDialogOpen)
const [isOpen, setIsOpen] = useState(false);


const notem = useSelector((state)=>state.ui.isNotificationOpen);
const noteme = useSelector((state)=>state.ui.notificationData);
const dispatch = useDispatch()
  useEffect(()=>{
    podcastList();
    
    }, [rows])

  const toggleHandler = ()=>{
       //dispatch(artistActions.toggler())
       dispatch(uiActions.openDialog());
  }
  //<Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
  const handleClickOpen = ()=>{
      dispatch(uiActions.openDialog());
  }
  const handleDelete = async(id) => {
    //setData(data.filter((item) => item.id !== id));
    dispatch(uiActions.showLoading());
    
     let endpt = BASE_URL_POD+"host/"+id+"/delete/";
      const resp = await Axios.delete(endpt);
      if(resp.status===204){
        dispatch(artistActions.decrementArtistNumber(resp.data.length));
        dispatch(
          uiActions.openNotification(
            {
              title:'Success', 
              message:"You have deleted the podcast", 
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

      const podcastList = async () => {
       const endpt = BASE_URL_POD + "host/";
        const resp = await Axios.get(endpt);
        console.log(resp.data.results)
          setRows(resp.data.results);

         
          // dispatch(artistActions.setArtistNumber(resp.data.results.length()));
     
      
       // dispatch(uiActions.showLoading());
        
      };
let no=0;
  return (
    <TableContainer component={Paper} className="table">
    {!toggle && <div className="datatableTitle">
    <button  className="left" onClick={handleClickOpen}>
       <h1>+</h1>
    </button>

    {notem && 
    <Notification title={noteme.title} color={noteme.clr} bgcolor={noteme.bgcolor}>
          {noteme.message}
  </Notification> }

  
 {dialog && 
  <ScrollDialog title="Add Podcast" cancelBtn="Close" closeBtn="X" open={dialog}>
      <NewPodcastForm/>
      
  </ScrollDialog>}
  {modal && <Modal>
    <p>You have added the artist</p>
    </Modal>}

  </div>}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">#</TableCell>
            <TableCell className="tableCell">Hosted By</TableCell>
            <TableCell className="tableCell">Podcast Cover</TableCell>
            <TableCell className="tableCell">Podcast Title</TableCell>
            <TableCell className="tableCell">Description</TableCell>
            <TableCell className="tableCell" colSpan={2} style={{align:'center' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
                     
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.host_name}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.host_cover} alt="" className="image" />
                 

                </div>
              </TableCell>
              
              <TableCell className="tableCell">{row.host_title}</TableCell>
              
              <TableCell className="tableCell">
              <Link to={"/podcast/" + row.id} style={{ textDecoration: "none" }}>
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
  );
};

export default PodcastTable;
