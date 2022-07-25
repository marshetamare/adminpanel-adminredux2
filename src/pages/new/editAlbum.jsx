import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useRef, useEffect } from "react";
import { albumActions } from '../../Store/album-slice'
import { useSelector, useDispatch} from 'react-redux'
import Axios from 'axios'
import { BASE_URL } from "../../env";
import {useParams} from 'react-router-dom';
const NewAlbumForm = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [artData, setArtData ] = useState([]);
  const [genData, setGenreData ] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const albNameRef = useRef();
  const [artistIDRef,setArtIdRef] = useState();
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
        setGenreData(res.data);
      }

    })
    .catch((err) => {
      // ArtistsX.push("error");
    });
};
useEffect(() => {
  getArtist() 
}, []);
useEffect(()=>{
getGenre();
},[genData]);
useEffect(() => {
 getSingleAlbum();
}, []);
const { albumId } = useParams();

 const onSubmitHandler = async (e) => {
  e.preventDefault();
  
  const endpt = `${BASE_URL}album/${albumId}/update/`;
  const formData = new FormData();
  let enteredName = albNameRef.current.value;
  let enteredAlbDesc = albDescriptionRef.current.value;
  let enteredArtId = artistIDRef;
  let enteredDate = albumReleaseDate.current.value;

  formData.append("album_name", enteredName);
  formData.append("album_description", enteredAlbDesc);
  formData.append("album_release", enteredDate)
  formData.append("album_cover", file);
  formData.append("artist", enteredArtId);
  

 
  await Axios.put(endpt, formData).then((res) => {
    if(res.status===201){
      dispatch(
        albumActions.toggler()
      )
      alert('Successfully Updated!')
      console.log(res.data)
    }else{
      alert('please try again')
    }
  });
};
 

const getSingleAlbum= async () => {
 await Axios.get(`${BASE_URL}album/${albumId}`).then((result) => {
   if (result.status === 200) {
     setAlbumData(result.data);
   }
 });
 
};

  return (
    <div className="new">
       <Sidebar />
      <div className="newContainer">
          <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">

          <div className="right">
            <form onSubmit={onSubmitHandler}>
                <div className="row">
                <div className="col">
                  <h3>Artist</h3>
                  <select
                    className="form-select form-select mb-3"
                    name="artist"
                    aria-label=".form-select example"
                    onChange={(e) => {
                      setArtIdRef(e.target.value);
                    }}>
                    <option>select</option>
                    {artData.map((res) => (
                      <option key={res.id} value={res.id}>
                        {res.artist_name} 
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <h3>Genre</h3>
                  <select
                    className="form-select form-select mb-3"
                    name="artist"
                    aria-label=".form-select example"
                    onChange={(e) => {
                      setArtIdRef(e.target.value);
                    }}>
                    <option>select</option>
                    {artData.map((res) => (
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
                    : albumData.album_cover
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
                  <input type="text" placeholder={albumData.album_name} ref={albNameRef}/>
                </div>

            <div className="formInput">
              <label>Date</label>
              <input type="text" placeholder={albumData.album_release_date}
             
              style={{onfocus:"(this.type='date')",
              onblur:"(this.type='text')"}}
              ref={albumReleaseDate} />
              
            </div>                
                <div className="formInput">
                  <label>About Album</label>
                  <input type="text" placeholder={albumData.album_description} ref={albDescriptionRef} />
                </div>
              <button style={{backgroundColor:'rgb(240, 103, 11)',width:'200px'}}>Update Album</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAlbumForm;
