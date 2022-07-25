import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useRef, useEffect } from "react";
import { artistActions } from '../../Store/artist-slice'
import { useSelector, useDispatch} from 'react-redux'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from "../../env";
import {uiActions} from '../../Store/ui-slice'
import Notification from '../../components/UI/Notification/Notification'
import ScrollDialog from '../../components/UI/Dialog/Dialog.jsx'
const NewArtistForm = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [artdata, setArtData ] = useState();
  const [progr, setProgr ] = useState();
  const artNameRef = useRef();
  const artDescriptionRef = useRef();

 const dispatch = useDispatch();
 const testd = useSelector(state=>state.artist.artistList);
 const notify = useSelector((state)=>state.ui.isNotificationOpen);

 const navigate = useNavigate()

 useEffect(()=>{
  
  setArtData(testd);
 },[])



 const onSubmitHandler = async (e) => {
  const endpt = BASE_URL + "artist/";
  const formData = new FormData();
  let enteredName = artNameRef.current.value;
  let enteredArtDesc = artDescriptionRef.current.value;

  formData.append("artist_name", enteredName);
  formData.append("artist_cover", file);
  formData.append("artist_description", enteredArtDesc);

  e.preventDefault();
 await Axios.post(endpt, formData, {
  onUploadProgress: progressEvent=>{
    
    setProgr(Math.round(progressEvent.loaded/progressEvent.total)*100+"%");
  }
 }).then((res) => {
    if(res.status===201){
      dispatch(
        artistActions.toggler()
      )
      dispatch(
        artistActions.incrementNumberOfArtist()
      )
      dispatch(
        uiActions.closeDialog()
      )
      navigate.push('artist/')
    }else{
      dispatch(
        uiActions.closeDialog()
      )
      
    }
  });
};
 const progStyle={
  width: progr, 
  height: "10px", 
  backgroundColor:'blue',
  left:0,
  marginLeft:"1px",

 }

  return (
    <div className="new">
    
      <div className="newContainer">
      {
      //notify && <Notification><p>Done</p></Notification>
      }
     
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">

          <div className="right">
            <form onSubmit={onSubmitHandler}>
              <div className="formInput" style={{display:'flex', alignItems: 'center', flexDirection:'column',}}>
              <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
                <label htmlFor="file">
                   <DriveFolderUploadOutlinedIcon className="fileIcon icon" style={{transform: 'translateY(-50px)'}} />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              
                <div className="formInput">
                  <label>Artist Name</label>
                  <input type="text" placeholder="please enter name" ref={artNameRef}/>
                </div>
                              
                <div className="formInput">
                  <label>About Artist</label>
                  <textarea type="textarea" placeholder="please enter name" ref={artDescriptionRef} className="desc" />
                </div>
                
             <div className="formInput">
             <button style={{width:'20', backgroundColor:'blue',height:'40', borderRadius:'12px'}} type="submit">Add Artist</button>
             </div>
             <br/>
             <div  style={progStyle}><span style={{color:'white'}}>{progr && progr+"%"}</span></div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArtistForm;
