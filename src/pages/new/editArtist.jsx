import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useRef, useEffect } from "react";
import { artistActions } from '../../Store/artist-slice'
import {uiActions } from '../../Store/ui-slice'
import { useSelector, useDispatch} from 'react-redux'
import Axios from 'axios'
import { BASE_URL } from "../../env";
import {useParams, useNavigate} from 'react-router-dom';
const EditArtist = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [artistData, setArtistData ] = useState([]);
  const artNameRef = useRef();
  const artDescriptionRef = useRef();

 const dispatch = useDispatch();

 const { artistId } = useParams();
const navigate = useNavigate();
 useEffect(() => {
  getSingleUser();
}, []);
const getSingleUser = async () => {
  await Axios.get( `${BASE_URL}artist/${artistId}`).then((result) => {
    if (result.status === 200) {
      setArtistData(result.data);
    }
  })
  console.log(artistData);

};

 const onSubmitHandler = async (e) => {
  e.preventDefault();
  const endpt = `${BASE_URL}artist/${artistId}/update/`;
  const formData = new FormData();
  let enteredName = artNameRef.current.value;
  let enteredArtDesc = artDescriptionRef.current.value;

  formData.append("artist_name", enteredName);
  formData.append("artist_avatar", file);
  formData.append("artist_description", enteredArtDesc);

  
 await Axios.patch(endpt, formData).then((res) => {
    if(res.status===201){
      dispatch(
        artistActions.toggler()
      )
      dispatch(
        uiActions.openNotification(
          {
            title:'Success', 
            message:"You have updated the artist", 
            clr:'green',
            bgcolor:'#c56378',
          }));
          navigate.push('artist/')
    }
 
    dispatch(uiActions.openNotification({title:'Error', message:"please try it again!", clr:'red', bgcolor:'#940294'}));
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
               
              <div className="formInput" style={{display:'flex', alignItems: 'center', flexDirection:'column',}}>
              <div className="left">
              <img
                src={
                
                  file
                    ? URL.createObjectURL(file)
                    : artistData.artist_cover
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
                  <label>Artist Name</label>
                  <input type="text" placeholder={artistData.artist_name} ref={artNameRef} />
                </div>
                              
                <div className="formInput">
                  <label>About Artist</label>
                  <textarea type="textarea"  placeholder={artistData.artist_description} ref={artDescriptionRef} className="desc"></textarea>
                </div>

             <div className="formInput">
              <button style={{backgroundColor:'rgb(240, 103, 11)',width:'200px'}}>update Artist</button>
            </div>
            </form>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default EditArtist;
