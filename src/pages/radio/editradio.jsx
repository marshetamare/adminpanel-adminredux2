import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useRef, useEffect } from "react";
import { RadioActions } from '../../Store/radio_slice'
import {uiActions } from '../../Store/ui-slice'
import { useSelector, useDispatch} from 'react-redux'
import Axios from 'axios';
import { BASE_URL, radioEnd } from "../../env";
import {useParams, useNavigate} from 'react-router-dom';
 const EditRadio = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [artistData, setArtistData ] = useState([]);
  const artNameRef = useRef();
  const urlRef = useRef();
  const frequencyRef =useRef();
  const artDescriptionRef = useRef();
 const dispatch = useDispatch();

 const { radioId } = useParams();
const navigate = useNavigate();
 useEffect(() => {
  getSingleUser();
}, []);
const getSingleUser = async () => {
  await Axios.get( `${radioEnd}/${radioId}`).then((result) => {
    if (result.status === 200) {
      setArtistData(result.data);
    }
  })
  console.log(artistData);

};

 const onSubmitHandler = async (e) => {
  e.preventDefault();
  
  const endpt = `${radioEnd}/${radioId}/update/`;
  const formData = new FormData();
  let enteredName = artNameRef.current.value;
  let enteredUrl = urlRef.current.value;
  let enteredFrequency = frequencyRef.current.value;
  let enteredArtDesc = artDescriptionRef.current.value;

  formData.append("station_name", enteredName);
  formData.append("station_url", enteredUrl);
  formData.append("station_frequency", enteredFrequency);
  formData.append("station_cover", file);
  formData.append("station_description", enteredArtDesc);

  
 await Axios.patch(endpt, formData).then((res) => {
    if(res.status===200){
      dispatch(
        RadioActions.toggler()
      )
      dispatch(
        uiActions.openNotification(
          {
            title:'Success', 
            message:"You have updated the radio", 
            clr:'green',
            bgcolor:'#c56378',
          }));
           navigate.push('radio/');
    }
 else 
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
                    : artistData.station_cover
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
                  <label>Radio Station Name</label>
                  <input type="text" placeholder={artistData.station_name} ref={artNameRef} />
                </div>
                <div className="formInput">
                  <label>radio url</label>
                  <input type="text" placeholder={artistData.station_url} ref={urlRef} />
                </div>
                <div className="formInput">
                  <label>radio frequency</label>
                  <input type="text" placeholder={artistData.station_frequency} ref={frequencyRef} />
                </div>
                             
                <div className="formInput">
                  <label>About radio</label>
                  <textarea type="textarea"  placeholder={artistData.station_description} ref={artDescriptionRef} className="desc"></textarea>
                </div>

             
              <button style={{backgroundColor:'rgb(240, 103, 11)',width:'200px'}}>update Radio</button>
            </form>
          </div>
        </div>

        
      </div>
    </div>
    
  );
};

export default EditRadio;
