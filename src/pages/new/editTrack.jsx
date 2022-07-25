import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useRef, useEffect } from "react";
import { albumActions } from '../../Store/album-slice'
import { useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import Axios from 'axios'
import { BASE_URL } from "../../env";

const EditTrackForm = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [artData, setArtData ] = useState([]);
  const [trackData, setTrackData]=useState([]);
  const [albumData, setAlbumData ] = useState([]);
  const [genreData, setGenreData ] = useState([]);
  const trackNameRef = useRef();
  const [artistIDRef,setArtIdRef] = useState();
  const [albumIDRef,setAlbIdRef] = useState();
  const [genreIDRef,setGenreIdRef] = useState();
  const albumReleaseDate = useRef();
  const trackDescriptionRef = useRef();
 const releaseDateRef = useRef();
  
 const dispatch = useDispatch();

 const { trackId } = useParams();


 useEffect(() => {
  getSingleTrack();
}, []);
const getSingleTrack = async () => {
  await Axios.get( `${BASE_URL}track/${trackId}`).then((result) => {
    if (result.status === 200) {
      setTrackData(result.data);
    }
  })
  console.log(trackData);

};
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
    
    
 
  await Axios.put(endpt, formData).then((res) => {
    if(res.ok){
      dispatch(
        albumActions.toggler()
        
      )

      alert('Successfully created!')
    }else{
      console.log(res.error)
      alert('please try again')
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


            <div className="formInput">
              <label>Select Album</label>
              <select
              className="form-select form-select mb-3"
              name="artist"
              aria-label=".form-select example"
              onChange={(e) => {
                setAlbIdRef(e.target.value);
              }}>
              <option>{trackData.album_id}</option>
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
            <option>{trackData.genre_id}</option>
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
                  placeholder={trackData.track_file}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              
                <div className="formInput">
                  <label>Track Name</label>
                  <input type="text" placeholder={trackData.track_name} ref={trackNameRef}/>
                </div>
               <div className="formInput">
                <label>Track Description</label>
                <input type="text" placeholder={trackData.track_description} ref={trackDescriptionRef}/>
              </div>
              <div className="formInput">
                <label>Release Date</label>
                <input type="date" ref={releaseDateRef} placeholder={trackData.track_release_date} />
              </div>
 
                <div className="formInput">
                    <button style={{backgroundColor:'rgb(240, 103, 11)',width:'200px'}}>UpdateTrack</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTrackForm;
