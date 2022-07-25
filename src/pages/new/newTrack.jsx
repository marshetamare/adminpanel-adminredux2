import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useRef, useEffect } from "react";
import { albumActions } from '../../Store/album-slice'
import { useSelector, useDispatch} from 'react-redux'
import Axios from 'axios'
import { BASE_URL } from "../../env";

const NewTrackForm = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [artData, setArtData ] = useState([]);
  const [albumData, setAlbumData ] = useState([]);
  const [genreData, setGenreData ] = useState([]);
  const trackNameRef = useRef();
  const [progr, setProgr ] = useState();
  const [artistIDRef,setArtIdRef] = useState();
  const [albumIDRef,setAlbIdRef] = useState();
  const [genreIDRef,setGenreIdRef] = useState();
  const albumReleaseDate = useRef();
  const trackDescriptionRef = useRef();
 const releaseDateRef = useRef();
  
 const dispatch = useDispatch();
 //list of artist 
 const getArtist = async () => {
  await Axios.get(BASE_URL+"artist/").then((res) => {
      if (res.status ===200) {
        setArtData(res.data.results);
      }

    })
    .catch((err) => {
      // ArtistsX.push("error");
    });
};
const getAlbum = async () => {
    await Axios.get(BASE_URL+"album/").then((res) => {
        if (res.status ===200) {
          setAlbumData(res.data.results);
        }
      })
      .catch((err) => {
        // ArtistsX.push("error");
      });
  };

  const getGenre = async () => {
    await Axios.get(BASE_URL+"genre/").then((res) => {
        if (res.status ===200) {
          setGenreData(res.data.results);
        }
      })
      .catch((err) => {
        // ArtistsX.push("error");
      });
  };

useEffect(() => {
  getAlbum() 
  getArtist()
  getGenre()
}, []);

 const onSubmitHandler = async (e) => {
  e.preventDefault();
  const endpt = BASE_URL+"track/";
  const formData = new FormData();
  let enteredName = trackNameRef.current.value;
  let enteredTrackDesc = trackDescriptionRef.current.value;
  let enteredAlbId = albumIDRef;
  let enteredGenreId = genreIDRef;
  let enteredDate = releaseDateRef.current.value;

 

  formData.append("track_name", enteredName);
  formData.append("track_description", enteredTrackDesc);
  formData.append("track_release_date", enteredDate)
  formData.append("album_id", enteredAlbId)
  formData.append("genre_id", enteredGenreId);
  
  formData.append("track_file", file);
    
    
 
  await Axios.post(endpt, formData, {
    onUploadProgress: progressEvent=>{
      
      setProgr(Math.round(progressEvent.loaded / progressEvent.total)*100+"%");
    }
   }).then((res) => {
    if(res.status===201){
      dispatch(
        albumActions.toggler()
        
      )
      dispatch(
        albumActions.incrementNumberOfTrack()
      )
      alert('Successfully created!')
    }else{
      console.log(res.error)
      alert('please try again')
      
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
      
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">

          <div className="right">
            <form onSubmit={onSubmitHandler}>


            <div className="formInput">
              <label>Select Album</label>
              <select
              className="form-select form-select mb-3"
              name="artist"
              aria-label=".form-select example"
              onChange={(e) => {
                setAlbIdRef(e.target.value);
              }}>
              <option>Album</option>
              {albumData.map((res) => (
                <option key={res.id} value={res.id}>
                  {res.album_title} 
                </option>
              ))}
          </select>
        </div>

            <div className="formInput">
            <label>Select Genre</label>
            <select
            className="form-select form-select mb-3 selectForm"
            
            name="artist"
            aria-label=".form-select example"
            onChange={(e) => {
              setGenreIdRef(e.target.value);
            }}>
            <option>Genre</option>
            {genreData.map((res) => (
              <option key={res.id} value={res.id}>
                {res.genre_title} 
              </option>
            ))}
          </select>
          </div>

              <div className="formInput" >
                <label htmlFor="file">
                   Audio file/mp3
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              
                <div className="formInput">
                  <label>Track Name</label>
                  <input type="text" placeholder="please enter name" ref={trackNameRef}/>
                </div>
               <div className="formInput">
                <label>Track Description</label>
                <input type="text" placeholder="please enter name" ref={trackDescriptionRef}/>
              </div>
              <div className="formInput">
                <label>Release Date</label>
                <input type="date" ref={releaseDateRef} placeholder="please enter the date" />
              </div>
 
                <div className="formInput">
                    <button style={{backgroundColor:'rgb(240, 103, 11)',width:'200px'}}>Add Track</button>
              </div>
              <div  style={progStyle}><span style={{color:'white', paddingBottom: "2px"}}>{progr && progr}</span></div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTrackForm;
