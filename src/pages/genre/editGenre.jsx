import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useRef, useEffect } from "react";
import { GenreActions } from '../../Store/genre_slice'
import { useSelector, useDispatch} from 'react-redux'
import Axios from 'axios'
import { BASE_URL } from "../../env";
import {useParams} from 'react-router-dom';
const EditGenre = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [artData, setArtData ] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const albNameRef = useRef();
  const [artistIDRef,setArtIdRef] = useState();
  const albumReleaseDate = useRef();
  const albDescriptionRef = useRef();
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const endpoint=BASE_URL+'genre/';

useEffect(() => {
  getSingleAlbum();
}, []);

 const onSubmitHandler = async (e) => {
  e.preventDefault();  
  const endpt = `${BASE_URL}genre/${albumId}/update/`;
  const formData = new FormData();
  let enteredName = albNameRef.current.value;
  let enteredAlbDesc = albDescriptionRef.current.value;
  formData.append("genre_title", enteredName);
  formData.append("genre_description", enteredAlbDesc);
  formData.append("genre_cover", file);

  const createArtist = await Axios.put(endpt, formData).then((res) => {
    if(res.status===200){
      dispatch(
        GenreActions.toggler()
      )
      alert('Successfully Updated!')
      console.log(res.data)
    }else{
      alert('please try again')
    }
  });
};
 

const getSingleAlbum= async () => {
  await Axios.get( `${endpoint}/${albumId}/`).then((result) => {
    if (result.status === 200) {
      setAlbumData(result.data);
    }
  })
    console.log(albumData);
  
  
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
            
              </div>
              <div className="formInput" style={{display:'flex', alignItems: 'center', flexDirection:'column',}}>
              <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    :  albumData.genre_cover
                }
                alt="cover"
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
                  <label>Genre Name</label>
                  <input type="text" placeholder={albumData.genre_title} ref={albNameRef}/>
                </div>

                 
                <div className="formInput">
                  <label>About Genre</label>
                  <input type="text" placeholder={albumData.genre_description} ref={albDescriptionRef} />
                </div>
              <button style={{backgroundColor:'rgb(240, 103, 11)',width:'200px'}}>Update Genre</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGenre;
