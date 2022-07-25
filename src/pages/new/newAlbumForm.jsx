import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useRef, useEffect } from "react";
import { albumActions } from '../../Store/album-slice'
import { useSelector, useDispatch} from 'react-redux'
import Axios from 'axios'
import { BASE_URL } from "../../env";

const NewAlbumForm = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [artData, setArtData ] = useState([]);
  const [genreData, setGenreData ] = useState([]);
  const [progr, setProgr ] = useState();
  const albNameRef = useRef();
  const [artistIDRef,setArtIdRef] = useState();
  const [genreIDRef,setGenreIdRef] = useState();
  const albumReleaseDate = useRef();
  const albDescriptionRef = useRef();

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
  getArtist();
  getGenre();
}, []);

 const onSubmitHandler = async (e) => {
  e.preventDefault();
  const endpt = BASE_URL+ "album/";
  const formData = new FormData();
  let enteredName = albNameRef.current.value;
  let enteredAlbDesc = albDescriptionRef.current.value;
  let enteredArtId = artistIDRef;
  let enteredGenreId = genreIDRef;
  let enteredDate = albumReleaseDate.current.value;

  formData.append("album_name", enteredName);
  formData.append("album_description", enteredAlbDesc);
  formData.append("album_release", enteredDate)
  formData.append("album_cover", file);
  formData.append("artist", enteredArtId);
  

 
await Axios.post(endpt, formData, {
  onUploadProgress: progressEvent=>{
    
    setProgr(Math.round(progressEvent.loaded/progressEvent.total)*100+"%");
  }
 }).then((res) => {
    if(res.status===201){
      dispatch(
        albumActions.toggler()
      )
      
      dispatch(
        albumActions.incrementNumberOfAlbum()
      )
      alert('Successfully created!')
      console.log(res.data)
    }else{
      alert('please try again')
    }
    console.log(res.data)
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
                <div className="row">
                <div className="col">
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
                  <h3>Select Genre</h3>
                  <select
                    className="form-select form-select mb-3"
                    name="artist"
                    aria-label=".form-select example"
                    onChange={(e) => {
                      setGenreIdRef(e.target.value);
                    }}>
                    <option>Select</option>
                    {genreData.map((res) => (
                      <option key={res.id} value={res.id}>
                        {res.genre_title} 
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
                  <label>Album Name</label>
                  <input type="text" placeholder="please enter name" ref={albNameRef}/>
                </div>

            <div className="formInput">
              <label>Date</label>
              <input type="date" placeholder="release date" ref={albumReleaseDate} />
            </div>                
                <div className="formInput">
                  <label>About Album</label>
                  <textarea type="textarea" placeholder="please enter name" ref={albDescriptionRef} className="desc"/>
                </div>
                <div className="formInput">
                <button style={{width:'20', backgroundColor:'blue',height:'40', borderRadius:'12px'}} type="submit">Create Album</button>
             </div>
             <div  style={progStyle}><span style={{color:'white'}}>{progr && progr+"%"}</span></div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAlbumForm;
