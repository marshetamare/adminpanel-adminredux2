import "./new.scss";
import {useNavigate} from 'react-router-dom'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useRef, useEffect } from "react";
import { podcastActions } from '../../../Store/podcast-slice'
import { useSelector, useDispatch} from 'react-redux'
import {BASE_URL_POD} from '../../../env'
import Axios from 'axios'
import {uiActions} from '../../../Store/ui-slice'
import Notification from '../../../components/UI/Notification/Notification'
import ScrollDialog from '../../../components/UI/Dialog/Dialog'

const NewSeasonForm = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [seasonData, setSeasonData ] = useState();
  const [hostData, setHostData]= useState([]);
  const [hostId, setHostId]= useState();
  const seasonNameRef = useRef();
  
  const seasonDescriptionRef = useRef();

 const dispatch = useDispatch();
 const navigate = useNavigate()
 const testd = useSelector(state=>state.artist.artistList);
 const notify = useSelector((state)=>state.ui.isNotificationOpen);
 useEffect(()=>{
  
  getHost();
 },[])

 const getHost = async () => {
  await Axios.get(BASE_URL_POD+"host/").then((res) => {
      if (res.status ===200) {
        setHostData(res.data.results);
      }

    })
    
};


 const onSubmitHandler = async (e) => {
  e.preventDefault();
  const endpt = BASE_URL_POD + "season/";
  const formData = new FormData();
  let enteredName = seasonNameRef.current.value;
  let enteredArtDesc = seasonDescriptionRef.current.value;
  let enteredHostId = hostId;
  formData.append("season_title", enteredName);
  //formData.append("host_title", enteredTitle);
  formData.append("season_cover", file);
  formData.append("season_description", enteredArtDesc);
  formData.append("host_id", enteredHostId);

 await Axios.post(endpt, formData).then((res) => {
    if(res.status===201){
      dispatch(
        podcastActions.toggler()
      )
      dispatch(
        podcastActions.incrementNumberOfPodcastCategorySeasons()
      )
      dispatch(
        uiActions.closeDialog()
      )
      navigate.push('/podcast-season')
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
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
                <label>Title</label>
                <input type="text" placeholder="please enter name" ref={seasonNameRef}/>
              </div>              
                <div className="formInput">
                  <label>Season Descriptions</label>
                  <input type="text" placeholder="please enter name" ref={seasonDescriptionRef} />
                </div>

                <div className="formInput">
                  <ablel>Hosted By</ablel>
                  <select
                    className="form-select form-select mb-3"
                    name="artist"
                    aria-label=".form-select example"
                    onChange={(e) => {
                      setHostId(e.target.value);
                    }}>
                    <option>select</option>
                    {hostData.map((res) => (
                      <option key={res.id} value={res.id}>
                        {res.host_name} 
                      </option>
                    ))}
                  </select>
                </div>
             <div className="formInput">
             <button style={{width:'30', backgroundColor:'blue',height:'20', borderRadius:'12px'}} type="submit">Add Podcast</button>
             </div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSeasonForm;
