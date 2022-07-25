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
const EditPodcastCategoryForm = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [categoryData, setCategoryData ] = useState([]);
  const categoryNameRef = useRef();
  const podTitleRef = useRef();
  const categoryDescriptionRef = useRef();

 const dispatch = useDispatch();
 const testd = useSelector(state=>state.artist.artistList);
 const notify = useSelector((state)=>state.ui.isNotificationOpen);

 const navigate = useNavigate()
 const { categoryId } = useParams();

 useEffect(() => {
  getSingleCategory();
}, []);
const getSingleCategory = async () => {
  await Axios.get( `${BASE_URL_POD}category/${categoryId}`).then((result) => {
    if (result.status === 200) {
      setCategoryData(result.data);
    }
  })
  

};


 const onSubmitHandler = async (e) => {
  e.preventDefault();
  const endpt = `${BASE_URL_POD}category/${categoryId}/update`;
  const formData = new FormData();
  let enteredName = categoryNameRef.current.value;
  let enteredArtDesc = categoryDescriptionRef.current.value;

  formData.append("podcast_category_title", enteredName);
  //formData.append("host_title", enteredTitle);
  formData.append("podcast_category_cover", file);
  formData.append("podcast_category_description", enteredArtDesc);


 await Axios.patch(endpt, formData).then((res) => {
    if(res.status===201){
      dispatch(
        podcastActions.toggler()
      )
   
      dispatch(
        uiActions.closeDialog()
      )
      navigate.push('/category')
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
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : categoryData.podcast_category_cover
                }
                alt=""
              />
            </div>
                <label htmlFor="file">
                   <DriveFolderUploadOutlinedIcon className="fileIcon icon" style={{transform: 'translate(10px,-40px)', color:'red'}} />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              
       
              <div className="formInput">
                <label>Title</label>
                <input type="text" placeholder={categoryData.podcast_category_title} ref={categoryNameRef}/>
              </div>              
                <div className="formInput">
                  <label>About Category</label>
                  <input type="text" placeholder={categoryData.podcast_category_description} ref={categoryDescriptionRef} />
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

export default EditPodcastCategoryForm;
