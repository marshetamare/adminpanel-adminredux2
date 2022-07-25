import "./new.scss";
import {useNavigate, useParams} from 'react-router-dom'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useRef, useEffect } from "react";
import { podcastActions } from '../../../Store/podcast-slice'
import { useSelector, useDispatch} from 'react-redux'
import {BASE_URL_POD} from '../../../env'
import Axios from 'axios'
import {uiActions} from '../../../Store/ui-slice'
import Notification from '../../../components/UI/Notification/Notification'
import ScrollDialog from '../../../components/UI/Dialog/Dialog'
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
const EditEpisodeForm = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [episodeData, setEpisodeData]= useState([]);
  const [seasonData, setSeasonData]= useState([]);
  const [seasonId, setSeason]= useState();

  const [categData, setCategData]= useState([]);
  const [categId, setCategId]= useState();

  const episodeNameRef = useRef();
  
  const episodeDescriptionRef = useRef();
 const episodeReleaseDateRef = useRef();

 const categoryIdRef = useRef();
 const seasonIdRef = useRef();
 const userIdRef = useRef();

 const dispatch = useDispatch();
 const testd = useSelector(state=>state.artist.artistList);
 const notify = useSelector((state)=>state.ui.isNotificationOpen);

 const navigate = useNavigate()
 const { episodeId } = useParams();
 useEffect(()=>{
  
  getCategory();
  getSeason();
 },[])
 useEffect(() => {
  getSingleEpisode();
}, []);
const getSingleEpisode = async () => {
  await Axios.get( `${BASE_URL_POD}episode/${episodeId}`).then((result) => {
    if (result.status === 200) {
      setEpisodeData(result.data);
    }
  })
  

};
 const getSeason = async () => {
  await Axios.get(BASE_URL_POD+"season/").then((res) => {
      if (res.status ===200) {
        setSeasonData(res.data.results);
      }

    })
    
};

const getCategory = async () => {
  await Axios.get(BASE_URL_POD+"category/").then((res) => {
      if (res.status ===200) {
        setCategData(res.data.results);
      }

    })
    
};
 const onSubmitHandler = async (e) => {
  e.preventDefault();
  const endpt = `${BASE_URL_POD}episode/${episodeId}/update`;
  const formData = new FormData();
  let enteredName = episodeNameRef.current.value;
  let enteredArtDesc = episodeDescriptionRef.current.value;
  let releaseDate = episodeReleaseDateRef.current.value;

  let categoryId = categId;
  let season_Id = seasonId;
  
  formData.append("episode_title", enteredName); 
  formData.append("episode_description", enteredArtDesc);
  formData.append("episode_file", file);
  formData.append("episode_release_date", releaseDate);
  formData.append("podcast_category_id", categoryId);
  formData.append("season_id", season_Id);
  


 await Axios.put(endpt, formData).then((res) => {
    if(res.status===201){
      dispatch(
        podcastActions.toggler()
      )
    
      dispatch(
        uiActions.closeDialog()
      )
      navigate.push('/episode')
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
              <audio
                src={
                  file
                    ? URL.createObjectURL(file)
                    : episodeData.episode_file
                }
                alt=""
              />
            </div>
             
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  
                />
              </div>

              
       
              <div className="formInput">
                <label>Title</label>
                <input type="text" placeholder={episodeData.episode_title} ref={episodeNameRef}/>
              </div>              
                <div className="formInput">
                  <label>Episode Descriptions</label>
                  <input type="text" placeholder={episodeData.episode_description} ref={episodeDescriptionRef} />
                </div>

                <div className="formInput">
                  <label>Release Date</label>
                  <input type="date" placeholder={episodeData.episode_release_date} ref={episodeReleaseDateRef} />
                </div>

                <div className="formInput">
                  <label>Category</label>
                  <select
                    className="form-select form-select mb-3"
                    name="artist"
                    aria-label=".form-select example"
                    onChange={ (e) => {
                      setCategId(e.target.value);
                    }}>
                    <option value={episodeData.podcast_category_id}>Select</option>
                    {categData.map((res) => (
                      <option key={res.id} value={res.id}>
                        {res.podcast_category_title} 
                      </option>
                    ))}
                  </select>

                </div>
                <div className="formInput">
                  <label>Season</label>
                                    <select
                    className="form-select form-select mb-3"
                    name="artist"
                    aria-label=".form-select example"
                    onChange={(e) => {
                      setSeason(e.target.value);
                    }}>
                    <option value={episodeData.season_id}>Select</option>
                    {seasonData.map((res) => (
                      <option key={res.id} value={res.id}>
                        {res.season_title} 
                      </option>
                    ))}
                  </select>
                </div>
                

             <div className="formInput">
             <button style={{backgroundColor:'rgb(240, 103, 11)',width:'200px'}} type="submit">Add Podcast</button>
             </div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEpisodeForm;
