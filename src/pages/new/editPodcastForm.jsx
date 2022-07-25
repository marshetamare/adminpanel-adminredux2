import "./new.scss";
import {useNavigate, useParams} from 'react-router-dom'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useRef, useEffect } from "react";
import { podcastActions } from '../../Store/podcast-slice'
import { useSelector, useDispatch} from 'react-redux'
import {BASE_URL_POD} from '../../env'
import Axios from 'axios'
import {uiActions} from '../../Store/ui-slice'
import Notification from '../../components/UI/Notification/Notification'
import ScrollDialog from '../../components/UI/Dialog/Dialog.jsx'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
const EditPodcastForm = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [podcastData, setPodcastData ] = useState([]);
  const podNameRef = useRef();
  const podTitleRef = useRef();
  const podDescriptionRef = useRef();

 const dispatch = useDispatch();
const navigate = useNavigate()
 const notify = useSelector((state)=>state.ui.isNotificationOpen);
 const { podcastId } = useParams();

 useEffect(() => {
  getSingleUser();
}, []);
const getSingleUser = async () => {
  await Axios.get( `${BASE_URL_POD}host/${podcastId}`).then((result) => {
    if (result.status === 200) {
      setPodcastData(result.data);
    }
  })
  console.log(podcastData);

};

 const onSubmitHandler = async (e) => {
  const endpt = `${BASE_URL_POD}host/${podcastId}/update`;
  const formData = new FormData();
  let enteredName = podNameRef.current.value;
  let enteredTitle = podTitleRef.current.value;
  let enteredArtDesc = podDescriptionRef.current.value;
//data to be updated
let pname, pTitle, pDesc, pFile;
if(enteredName===null){
  pname=podcastData.host_name
}else{
  pname=enteredName;
}
if(enteredTitle===null){
  pTitle=podcastData.host_title
}else{
  pTitle=enteredTitle;
}
if(enteredArtDesc===null){
  pDesc=podcastData.host_description
}else{
  pDesc=enteredArtDesc;
}
if(file){
  pFile=podcastData.host_cover
}else{
  pFile=file;
}
  formData.append("host_name", pname);
  formData.append("host_title", pTitle);
  formData.append("host_cover", pFile);
  formData.append("host_description", pDesc);

  e.preventDefault();
 await Axios.patch(endpt, formData).then((res) => {
    if(res.status===201){
      dispatch(
        podcastActions.toggler()
      )
    
      dispatch(
        uiActions.closeDialog()
      )
      navigate.push('podcast/')
    }else{
      dispatch(
        uiActions.closeDialog()
      )
    }
  });
};
 

  return (
    <div className="new">
       <Sidebar />
      <div className="newContainer">
          <Navbar />
      {//notify && <Notification><p>Done</p></Notification>
      }
      <ScrollDialog/>
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">

          <div className="right">
            <form onSubmit={onSubmitHandler}>
              <div className="formInput" style={{display:'flex', alignItems: 'center', flexDirection:'column',}}>
              <div className="left" style={{display:'flex', alignItems: 'center', flexDirection:'column',}}>
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : podcastData.host_cover
                }
                alt=""
              />
            </div>
                <label htmlFor="file">
                   <DriveFolderUploadOutlinedIcon className="fileIcon icon" style={{transform: 'translate(10px,-40px)', color:'red'}} />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              
                <div className="formInput">
                  <label>Name</label>
                  <input type="text" placeholder={podcastData.host_name} ref={podNameRef}/>
                </div>
                <div className="formInput">
                <label>Title</label>
                <input type="text" placeholder={podcastData.host_title} ref={podTitleRef}/>
              </div>              
                <div className="formInput">
                  <label>About Podcast</label>
                  <input type="text" placeholder={podcastData.host_description} ref={podDescriptionRef} />
                </div>

             <div className="formInput">
             <button style={{backgroundColor:'rgb(240, 103, 11)',width:'200px'}} type="submit">Edit Podcast</button>
             </div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPodcastForm;
