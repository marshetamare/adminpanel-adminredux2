import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useRef, useEffect } from "react";
import {GenreActions } from '../../Store/genre_slice'
import { useSelector, useDispatch} from 'react-redux'
import Axios from 'axios'
import { BASE_URL } from "../../env";
import useModal from "use-modal-element";
import {Routes,Link, Route, useNavigate} from 'react-router-dom';
import ScrollDialog from '../../components/UI/Dialog/Dialog.jsx'

const NewGenreForm = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [artData, setArtData ] = useState([]);
  const genreNameRef = useRef();
  const [artistIDRef,setArtIdRef] = useState();
  const albumReleaseDate = useRef();
  const genreDescriptionRef = useRef();

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

useEffect(() => {
  getArtist() 
}, []);

 const onSubmitHandler = async (e) => {
  e.preventDefault();
  const endpt = BASE_URL+ "genre/";
  const formData = new FormData();
  let enteredTitle = genreNameRef.current.value;
  let enteredGenreDesc = genreDescriptionRef.current.value;
  //let enteredArtId = artistIDRef;


  formData.append("genre_title", enteredTitle);
  formData.append("genre_description", enteredGenreDesc);
  formData.append("genre_cover", file);

  const createArtist = await Axios.post(endpt, formData).then((res) => {
    if(res.status===201){
      dispatch(
        GenreActions.toggler()
      )
      
      dispatch(
        GenreActions.incrementNumberOfGenre()
      )
     alert('Genre Successfully created!')
   
      console.log(res.data)
    }else{
      alert('please try again')
    }
    console.log(res.data)
  });
};
<Routes>
<Route path="/genre" element={<NewGenreForm />} />
</Routes>

const [Modal, toggleModal] = useModal({
  withBackground: {
    closable: true,
    scrollable: false,
    customClassName: "my-background",
  },
  withCloseButton: {
    type: "default", // 'default', 'rounded', 'text'
    text: "",
    customClassName: "my-close-button",
  },
  withControlButton: {
    type: "default", // 'default', 'outlined', 'text'
    text: "View",
    customClassName: "my-control-button",
    action: () => navigate('/genre'),
  },
  additional: {
    customWrapperClassName: "",
    fullyShieldedMobile: true,
  },
});
 
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
                <label>Genre Title</label>
                <input type="text" placeholder="please enter name" ref={genreNameRef}/>
              </div>
                            
              <div className="formInput">
                <label>Genre Descripition </label>
                <textarea type="textarea" placeholder="please enter name" ref={genreDescriptionRef} className="desc" />
              </div>
             

           <div className="formInput">
           <button style={{backgroundColor:'rgb(240, 103, 11)',width:'200px'}} type="submit">Add Genre</button>
           </div>
           
          </form>
        </div>
      </div>
    </div>
  </div>
);
};

export default NewGenreForm;
