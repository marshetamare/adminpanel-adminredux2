import "../new/new.scss";
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
const NewLyricsForm = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [trackData, setTrackData ] = useState([]);
  const[trackIdRef, setTrackIdRef]=useState();
  const trackId = useRef();
  const lyricsNameRef = useRef();
  const lyricsDescriptionRef = useRef();

 const dispatch = useDispatch();
 const testd = useSelector(state=>state.artist.artistList);
 const notify = useSelector((state)=>state.ui.isNotificationOpen);

 const navigate = useNavigate()

 useEffect(()=>{
  
    getLyrics();
 },[])

 const getLyrics = async () => {
    await Axios.get(BASE_URL+"track/").then((res) => {
        if (res.status ===200) {
            setTrackData(res.data.results);
        }
  
      })
      .catch((err) => {
        // ArtistsX.push("error");
      });
  };
  

 const onSubmitHandler = async (e) => {
  const endpt = BASE_URL + "lyrics/";
  const formData = new FormData();
  let enteredName = lyricsNameRef.current.value;
  let enteredLyricsDesc = lyricsDescriptionRef.current.value;
  let enteredTrackId = trackIdRef;
  formData.append("lyrics_title", enteredName);
  formData.append("lyrics_detail", enteredLyricsDesc);
  formData.append("track_id", enteredTrackId);

  e.preventDefault();
 await Axios.post(endpt, formData).then((res) => {
    if(res.status===201){
      dispatch(
        artistActions.toggler()
      )
  
      dispatch(
        uiActions.closeDialog()
      )
      navigate.push('lyrics/')
    }else{
      dispatch(
        uiActions.closeDialog()
      )
      
    }
  });
};
 

  return (
    <div className="new">
    
      <div className="newContainer">
      {
      //notify && <Notification><p>Done</p></Notification>
      }
      <ScrollDialog/>
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">

          <div className="right">
            <form onSubmit={onSubmitHandler}>
              <div className="formInput" style={{display:'flex', alignItems: 'center', flexDirection:'column',}}>
         
              <label>Select Artists</label>
                  <select
                    className="form-select form-select mb-3"
                    name="artist"
                    aria-label=".form-select example"
                    onChange={(e) => {
                      setTrackIdRef(e.target.value);
                    }}>
                    <option>Select</option>
                    {trackData.map((res) => (
                      <option key={res.id} value={res.id}>
                        {res.track_name} 
                      </option>
                    ))}
                  </select>
              </div>

              
                <div className="formInput">
                  <label>Lyrics title</label>
                  <input type="text" placeholder="please enter name" ref={lyricsNameRef}/>
                </div>
                              
                <div className="formInput">
                  <label>About Lyrics</label>
                  <textarea type="textarea" placeholder="please enter name" ref={lyricsDescriptionRef} className="desc" />
                </div>

             <div className="formInput">
             <button style={{backgroundColor:'rgb(240, 103, 11)',width:'200px'}} type="submit">Add Artist</button>
             </div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLyricsForm;
