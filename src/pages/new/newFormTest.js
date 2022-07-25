import Sidebar from "../../components/sidebar/Sidebar" 
import Navbar from "../../components/navbar/Navbar" 
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"; 
import "./new.scss" 
import {useSelector, useDispatch } from "react-redux" 
import { useState, useRef, useEffect } from "react"; 
import "./formStyle2.scss" 
 import Axios from 'axios'
 import {BASE_URL} from '../../env'
 import {trackActions} from '../../Store/track-slice'
const Form = () => { 
  const [file, setFile] = useState(""); 
  const [trackFile, setTrackFile] = useState(""); 
  const [artData, setArtData] = useState([])
  const [albData, setAlbData] = useState([])
  const [artistIDRef,setArtIdRef] = useState();
  const [albumIDRef,setAlbIdRef] = useState();
  const trackNameRef=useRef();

  const dispatch = useDispatch();

  const getArtist = async () => {
    await Axios.get(BASE_URL+"artist/").then((res) => {
        if (res.status ===200) {
          setArtData(res.data);
        }
  
      })
      .catch((err) => {
        // ArtistsX.push("error");
      });
  };
  const getAlbum = async () => {
    await Axios.get(BASE_URL+"album/").then((res) => {
        if (res.status ===200) {
          setAlbData(res.data);
        }
  
      })
      .catch((err) => {
        // ArtistsX.push("error");
      });
  };
  useEffect(() => {
    getArtist();
    getAlbum();

  }, []);

  
 const onSubmitHandler = async (e) => {
  e.preventDefault();
  const endpt = BASE_URL+ "track/";
  const formData = new FormData();
  let enteredName = trackNameRef.current.value;
  let enteredArtId = artistIDRef;
  let enteredAlbId = albumIDRef;
  let enteredGenId = albumIDRef;
  formData.append("track_name", enteredName);
  formData.append("album", enteredAlbId)
  formData.append("album_file", trackFile);
  formData.append("track_cover", file);
  formData.append("artist", enteredArtId);
  

 
  const createArtist = await Axios.post(endpt, formData).then((res) => {
    if(res.status===201){
      dispatch(
        trackActions.toggler()
      )
      alert('Successfully created!')
      console.log(res.data)
    }else{
      alert('please try again')
    }
  });
};

  return ( 
    <div className="list"> 
    
      <div className="listContainer"> 
       
        <form className="form"> 
           
              <div className="row form"> 
               
                <div className="col"> 
                <label  className="form-select form-select mb-3">Enter Track name: 
                <input  className="form-select form-select mb-3" type="text" ref={trackNameRef} /> 
                </label> 
                  <h3>Select Artists</h3> 
                  <select 
                    className="form-select form-select mb-3" 
                    name="artist" 
                    aria-label=".form-select example" 
                    onChange={(e) => {
                      setArtIdRef(e.target.value);
                    }}>
                    <option>Select</option>
                    {artData.map((res) => (
                      <option key={res.id} value={res.id}>
                        {res.artist_name} 
                      </option>
                    ))}
                  </select> 
                </div> 
                <div className="col"> 
                  <h3>Select Album</h3> 
                  <select 
                    className="form-select form-select mb-3" 
                    name="artist" 
                    aria-label=".form-select example" 
                    onChange={(e) => {
                      setAlbIdRef(e.target.value);
                    }}>
                    <option>select Album</option>
                    {albData.map((res) => (
                      <option key={res.id} value={res.id}>
                        {res.album_name} 
                      </option>
                    ))}
                  </select> 
                </div> 
                <div className="col"> 
                  <h4>Select Genere</h4> 
                  <select 
                    className="form-select form-select mb-3" 
                    name="artist" 
                    aria-label=".form-select example" 
                     > 
                    <option>Select</option> 
                    <option value="1">One</option> 
                    <option value="2">Two</option> 
                    <option value="3">Three</option> 
                  </select> 
                   
                </div> 
                <div className="col"> 
                  <h4>Select track file</h4> 
                  <input 
                  type="file" 
                  id="file" 
                  onChange={(e) => setTrackFile(e.target.files[0])} 
                  className="input"
                  style={{display:"none"}}

                /> 
                   
                </div> 
                <div classname=''> 
                <div className=""> 
                <label htmlFor="file"> 
                <div className="imageinput">  
                <label htmlFor="file"> 
                  upload cover Image: <DriveFolderUploadOutlinedIcon className="icon" /> 
                </label> 
                <input 
                  type="file" 
                  id="file" 
                  onChange={(e) => setFile(e.target.files[0])} 
                  style={{ display: "none" }} 
                /> 
              </div> 
               </label> 
                <input 
                  type="file" 
                  id="file" 
                 // onChange={(e) => setFile(e.target.files[0])} 
                  style={{ display: "none" }} 
                /> 
 
                  <button className="input" style={{backgroundColor:'rgb(240, 103, 11)',width:'200px'}}>Add Track</button> 
              </div>  
 
                </div> 
              </div>                
           
            
            </form> 
         
       
      </div> 
    </div> 
     
   
   
 
 
   
  ) 
} 
 
export default Form;