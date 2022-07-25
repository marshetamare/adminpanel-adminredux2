import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useRef, useEffect } from "react";
import { RadioActions } from '../../Store/radio_slice'
import { useSelector, useDispatch} from 'react-redux'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { radioEnd} from "../../env";
import {uiActions} from '../../Store/ui-slice'
import Notification from '../../components/UI/Notification/Notification'
import ScrollDialog from '../../components/UI/Dialog/Dialog.jsx'
const NewRadioForm = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [artdata, setArtData ] = useState();
  const artNameRef = useRef();
  const artDescriptionRef = useRef();
  const urlRef = useRef();
  const frequencyRef = useRef();  
 const dispatch = useDispatch();
 const testd = useSelector(state=>state.artist.artistList);
 const notify = useSelector((state)=>state.ui.isNotificationOpen);

 const navigate = useNavigate()

 useEffect(()=>{
  
  setArtData(testd);
 },[])

 const onSubmitHandler = async (e) => {
  const endpt = radioEnd;
  const formData = new FormData();
  let enteredName = artNameRef.current.value;
  let enteredUrl = urlRef.current.value;
  let enteredFrequency = frequencyRef.current.value;
  let enteredArtDesc = artDescriptionRef.current.value;
  formData.append("station_name", enteredName);
  formData.append("station_frequency", enteredFrequency);
  formData.append("station_url", enteredUrl);
  formData.append("station_cover", file);
  formData.append("station_description", enteredArtDesc);

  e.preventDefault();
  await Axios.post(endpt, formData).then((res) => {
    if(res.status===201){
      dispatch(
        RadioActions.toggler()
      )    
      dispatch(
        uiActions.closeDialog()
      )
      navigate.push('radio/');
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
      {//notify && <Notification><p>Done</p></Notification>
      }
      <ScrollDialog/>
        <div className="top">
          <h1>ADD Radio</h1>
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
                  <label>Radio Name</label>
                  <input type="text" placeholder="please enter name" ref={artNameRef}/>
                </div>
                              
                <div className="formInput">
                  <label>About Radio</label>
                  <textarea type="textarea" placeholder="please enter name" ref={artDescriptionRef} className="desc" />
                </div>
                <div className="formInput">
                  <label>Radio Url</label>
                  <textarea type="textarea" placeholder="please enter Radio Url" ref={urlRef} className="desc" />
                </div>
                <div className="formInput">
                  <label>Radio Frequency</label>
                  <textarea type="textarea" placeholder="please radio Frequency" ref={frequencyRef} className="desc" />
                </div>

             <div className="formInput">
             <button style={{backgroundColor:'rgb(240, 103, 11)',width:'200px'}} type="submit">Add radio</button>
             </div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRadioForm;
