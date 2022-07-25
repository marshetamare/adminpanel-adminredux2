import "./new.scss";
import "./style.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useRef, useEffect } from "react";
import { GenreActions } from '../../Store/genre_slice'
import { useSelector, useDispatch} from 'react-redux'
import Axios from 'axios'
import { BASE_URL } from "../../env";
import {useParams} from 'react-router-dom';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import logo from "../../components/images/logo.jpg";
import Paper from "@mui/material/Paper";
import { width } from "@mui/system";
import {pagewidth} from "../../env";
const EditProfile = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [file1, setFile1] = useState("");
  const [artData, setArtData ] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const nameRef = useRef();
  const contactRef = useRef();
  const addressRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const postCodeRef = useRef();
  const emailRef = useRef();
  const mobailRef = useRef();
  const officeRef = useRef();
  const faxRef = useRef();
  const websiteRef = useRef();
  const privancyRef = useRef();
  const termRef = useRef();
  const aboutRef = useRef();
  const helpRef = useRef();
  const  albumId  = 1;
  const dispatch = useDispatch();
  const endpoint='http://34.79.102.235/company/2/';

useEffect(() => {
  getSingleAlbum();
  artistList();

}, []);

 const onSubmitHandler = async (e) => {
  e.preventDefault();  
  const endpt = `${endpoint}/${albumId}/update/`;
  const formData = new FormData();
  let enteredName = nameRef.current.value;
  let enteredContact= contactRef.current.value;
  let enteredAddress= addressRef.current.value;
  let enteredCountry= countryRef.current.value;
  let enteredCity = cityRef.current.value;
  let enteredState = stateRef.current.value;
  let enteredPostalCode = postCodeRef.current.value;
  let enteredEmail = emailRef.current.value;
  let enteredMobail = mobailRef.current.value;
  let enteredFax= faxRef.current.value;
  let enteredOffice = officeRef.current.value;
  let enteredWebsite = websiteRef.current.value;
  let enteredPrivancy = privancyRef.current.value;
  let enteredTerm = termRef.current.value;
  let enteredAbout = aboutRef.current.value;
  let enteredHelp = helpRef.current.value;

  
  formData.append("banner", file);
  formData.append("logo", file1);
  formData.append("campany_name",enteredName );
  formData.append("conatct_person",enteredContact );
  formData.append("address",enteredAddress );
  formData.append("country",enteredCountry );
  formData.append("city", enteredCity);
  formData.append("state",enteredAddress );
  formData.append("post_code", enteredPostalCode);
  formData.append("email",enteredEmail );
  formData.append("office_phone_number",enteredOffice );
  formData.append("mobail_phone_number",enteredMobail );
  formData.append("fax", enteredFax);
  formData.append("website",enteredWebsite );
  formData.append("privency",enteredPrivancy );
  formData.append("terms",enteredTerm );
  formData.append("help",enteredHelp );
  formData.append("about",enteredAbout );
  const createArtist = await Axios.patch('http://34.79.102.235/company/1/update/', formData).then((res) => {
    if(res.status===200){
       alert('Successfully Updated!')
      console.log(res.data.results)
    }else{
    
      alert('please try again');
    }
  });
};
const artistList = async () => {
    let endpt = endpoint;
    const resp = await Axios.get(endpt);      
      setAlbumData(resp.data);
  };

const getSingleAlbum= async () => {
  await Axios.get( `${endpoint}`).then((result) => {
    if (result.status === 200) {
      setAlbumData(result.data);
    }
    else 
   console.log("error happen");
  })
    console.log(albumData);
  
  
};

  return (
    <div className="new">
       <Sidebar />:
       
      <div className="newContainer">
          <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">

          <div className="right">
            <form onSubmit={onSubmitHandler}>
               
               
  <div className="list">
 
    <div className="listContainer">
    
      <TableContainer component={Paper} className="table">
	<div className="datatableTitle">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
             <TableCell className="tableCell">
            <div className="profile">
                  <label className='font'> change campany profile</label>
                  
                </div>

            </TableCell>
            <TableCell className="tableCell left"> 
            <img src={logo} style={{width:'200px'}} />
            </TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        
            <TableRow>
              <TableCell className="tableCell">
              <div className="profile" style={{display:'flex', alignItems: 'center', flexDirection:'column',}}>
              <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    :  albumData.banner
                }
                height = "400" width = "300"
                alt="cover"
              />
           
            </div>
                <label htmlFor="file">
                   <DriveFolderUploadOutlinedIcon className="fileIcon icon" style={{transform: 'translateY(-50px)'}} />
                </label>
                <p className="font"> change banner photo</p>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              </TableCell>
              <TableCell className="tableCell">
              <div className="profile" style={{display:'flex', alignItems: 'center', flexDirection:'column',}}>
              <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    :  albumData.logo
                }
                height = "400" width = "300"
                alt="cover"
              />
           
            </div>
                <label htmlFor="file">
                   <DriveFolderUploadOutlinedIcon className="fileIcon icon" style={{transform: 'translateY(-50px)'}} />
                </label>
                <p className="font">campany Logo</p>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              </TableCell>
              </TableRow>
              <TableRow>
              <TableCell className="tableCell">
              <div className="profile">
                  <label className='lable'>Campnay Name</label>
                  <input type="text"  placeholder={albumData.comapny_name} ref={nameRef} className="input"/>
                </div>
              </TableCell>
              <div className="profile">
                  <label className='lable'>contact person</label>
                  <input type="text" placeholder={albumData.contact_person} ref={contactRef} className="input"/>
                </div>
            </TableRow>
            <TableRow >
              
              <TableCell className="tableCell">
              <div className="profile">
                  <label className='lable'>Campnay address</label>
                  <input type="text" placeholder={albumData.address} ref={addressRef}  className="input"/>
                </div>
              </TableCell>
              <div className="profile">
                  <label className='lable'>country</label>
                  <input type="text" placeholder={albumData.country}  ref={countryRef} className="input"/>
                </div>
            </TableRow>
            <TableRow >
              
              <TableCell className="tableCell">
              <div className="profile">
                  <label className='lable'>city</label>
                  <input type="text" placeholder={albumData.city} ref={cityRef} className="input"/>
                </div>
              </TableCell>
              <div className="profile">
                  <label className='lable'>state</label>
                  <input type="text" placeholder={albumData.state} ref={stateRef} className="input"/>
                </div>
            </TableRow>
            <TableRow >
              
              <TableCell className="tableCell">
              <div className="profile">
                  <label className='lable'>postal code</label>
                  <input type="text" placeholder={albumData.postal_code} ref={postCodeRef} className="input"/>
                </div>
              </TableCell>
              <div className="profile">
                  <label className='lable'>email</label>
                  <input type="text" placeholder={albumData.email} ref={emailRef} className="input"/>
                </div>
            </TableRow>
            <TableRow >
              
              <TableCell className="tableCell">
              <div className="profile">
                  <label className='lable'>mobail number </label>
                  <input type="text" placeholder={albumData.mobile_Phone_number} ref={mobailRef}  className="input"/>
                </div>
              </TableCell>
              <div className="profile">
                  <label className='lable'>office number</label>
                  <input type="text" placeholder={albumData.office_Phone_number} ref={officeRef}  className="input"/>
                </div>
            </TableRow>
            <TableRow >
              
              <TableCell className="tableCell">
              <div className="profile">
                  <label className='lable'>fax </label>
                  <input type="text" placeholder={albumData.fax} ref={faxRef}  className="input"/>
                </div>
              </TableCell>
              <div className="profile">
                  <label className='lable'>website</label>
                  <input type="text" placeholder={albumData.website} ref={websiteRef} className="input"/>
                </div>
            </TableRow>
            <TableRow >
              
              <TableCell className="tableCell">
              <div className="profile">
                  <label className='lable'>privancy</label>
                  <input type="text" placeholder={albumData.privecy} ref={privancyRef} className="input"/>
                </div>
              </TableCell>
              <div className="profile">
                  <label className='lable'>term</label>
                  <input type="text" placeholder={albumData.terms} ref={termRef} className="input"/>
                </div>
            </TableRow>
            <TableRow >
              
              <TableCell className="tableCell">
              <div className="profile">
                  <label className='lable'>help</label>
                  <input type="text" placeholder={albumData.help} ref={helpRef}  className="input"/>
                </div>
              </TableCell>
              <div className="profile">
                  <label className='lable'>about</label>
                  <input type="text" placeholder={albumData.about} ref={aboutRef} className="input"/>
                </div>
            </TableRow>
            
            
        </TableBody>
      </Table>
      <button style={{backgroundColor:'rgb(240, 103, 11)',width:'200px'}} >Update Profile</button>
      </div>
     </TableContainer>
	
    
    </div>
  </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
