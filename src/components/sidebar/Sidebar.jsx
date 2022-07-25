import "./sidebar.scss";
//import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext,useEffect } from "react";

import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { AiFillDashboard } from "react-icons/ai";
import { FaMusic} from "react-icons/fa";
import { RiPlayListLine,RiPlayListFill } from "react-icons/ri";
import { GrFavorite} from "react-icons/gr";
import { FiMusic,FiRadio } from "react-icons/fi";
import { BsReverseLayoutTextWindowReverse} from "react-icons/bs";
import { MdAlbum } from "react-icons/md";
import { BiPodcast, BiUser, BiUserMinus, BiLogOutCircle} from "react-icons/bi";
//import { } from "react-icons/";
import { TbReport,TbReportMedical} from "react-icons/tb";

import {CgMediaPodcast } from "react-icons/cg";
import CloseIcon from '@mui/icons-material/Close';
import {useSelector, useDispatch} from 'react-redux'
import {uiActions} from '../../Store/ui-slice'
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../images/logo.png"
import { FaInternetExplorer} from "react-icons/fa";
import { GrBlog} from "react-icons/gr";

const Sidebar = () => {
  const { dispatch2 } = useContext(DarkModeContext);
 const dispatch = useDispatch();
 const isBarVisible = useSelector((state)=>state.ui.isSidebarVisible);
  const closeSidebarhandler=()=>{
       dispatch(uiActions.closeSidebar())
  }
  const sidebar = useSelector((state)=>state.ui.isSidebarVisible)
const openSidebar=()=>{
  dispatch(uiActions.openSidebarMenu())
}
const NavigateExternal = ({ to }) => {
  useEffect(() => {
    window.location.href = to;
  }, []);
  return null;
};
  return (
    <div className="sidebar">
      

      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">
            <img  src={logo} style={{width:'9vw', height:'10vh',paddingTop:'30px',backgroundColor:'transparent'}} alt="K I N Admin"/>
          </span>
        </Link>
      </div>
      <hr />
      <div className="center">
      <button onClick={closeSidebarhandler} style={{transform:'translateX(240px',backgroundColor:'red'}}><CloseIcon /></button>
        <ul>
          <p className="title">Main Navigation</p>
        
           
            <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
            < AiFillDashboard/>  <span>Dashboard</span>
            </li>
          </Link>
          
          <div stlye={{}}> 
          <h2> Musics</h2>   
       
      <Accordion style={{ width: 300 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls=""
        >
          <Typography
            style={{
              fontWeight: 10,
              
            }}
          >
            Musics Managment
          </Typography>
        </AccordionSummary>
        <AccordionDetails
        >
        <Link to="/track" style={{ textDecoration: "none" }}>
            <li>
              <FaMusic/> <span>Tracks</span>
            </li>
          </Link>
          </AccordionDetails>
          <AccordionDetails>
          <Link to="/playlist" style={{ textDecoration: "none" }}>
            <li>
              <RiPlayListLine/>
              <span>All Playlists</span>
            </li>
          </Link>
          </AccordionDetails>
          <AccordionDetails>
          <Link to="/playlist" style={{ textDecoration: "none" }}>
            <li>
              <RiPlayListFill />
              <span>Playlist Catagories</span>
            </li>
          </Link>
          </AccordionDetails>
          <AccordionDetails>
          <Link to="/favorite" style={{ textDecoration: "none" }}>
            <li>
              <GrFavorite />
              <span>Favorites</span>
            </li>
          </Link>
          </AccordionDetails>
       
      </Accordion>
    </div>
    <div stlye={{}}> 
          
      <Accordion style={{ width: 300 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography
            style={{
              fontWeight: 10,
            }}
          >
            Genre
          </Typography>
        </AccordionSummary>
        <AccordionDetails
        >
        <Link to="/genre" style={{ textDecoration: "none" }}>
            <li>
              <FiMusic />
              <span>All Genres</span>
            </li>
          </Link>
          </AccordionDetails>
            
      </Accordion>
    </div>
    <div stlye={{}}> 
       
      <Accordion style={{ width: 300 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content" >
          <Typography
            style={{
              fontWeight: 10,
            }}
          >
            Lyrics
          </Typography>
        </AccordionSummary>
        <AccordionDetails
        >
        <Link to="/lyrics" style={{ textDecoration: "none" }}>
            <li>
              <BsReverseLayoutTextWindowReverse />
              <span>All Lyrics</span>
            </li>
          </Link>
          </AccordionDetails>
                
      </Accordion>
    </div>
    <div stlye={{}}> 
            
      <Accordion style={{ width: 300 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography
            style={{
              fontWeight: 10,
            }}
          >
          Artists
          </Typography>
        </AccordionSummary>
        <AccordionDetails
        >
        <Link to="/artist" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>All artists</span>
            </li>
          </Link>
          </AccordionDetails>
         
      </Accordion>
    </div>
    <div stlye={{}}> 
         
      <Accordion style={{ width: 300 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography
            style={{
              fontWeight: 10,
            }}
          >
           Albums
          </Typography>
        </AccordionSummary>
        <AccordionDetails
        >
        <Link to="/album" style={{ textDecoration: "none" }}>
            <li>
              <MdAlbum />
              <span>Albums</span>
            </li>
          </Link>
          </AccordionDetails>
         
       
      </Accordion>
    </div>
    <div stlye={{}}> 
        
      <Accordion style={{ width: 300 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography
            style={{
              fontWeight: 10,
            }}
          >
            Radio Stations
          </Typography>
        </AccordionSummary>
        <AccordionDetails
        >
        <Link to="/radio" style={{ textDecoration: "none" }}>
            <li>
              <FiRadio />
              <span>All Stations</span>
            </li>
          </Link>
          </AccordionDetails>
         
      </Accordion>
    </div>
    <div stlye={{}}> 
          <h2> kin Managment</h2>    
      <Accordion style={{ width: 300 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography
            style={{
              fontWeight: 10,
            }}
          >
            Podcasts
          </Typography>
        </AccordionSummary>
        <AccordionDetails
        >
        <Link to="/podcast" style={{ textDecoration: "none" }}>
            <li>
              <BiPodcast />
              <span>All Podcasts</span>
            </li>
          </Link>
          </AccordionDetails>

          <AccordionDetails>
          <Link to="/category" style={{ textDecoration: "none" }}>
            <li>
              <BiPodcast  />
              <span>Podcast Catagories</span>
            </li>
          </Link>
          </AccordionDetails>

          <AccordionDetails>
          <Link to="/seasons" style={{ textDecoration: "none" }}>
            <li>
              <BiPodcast  />
              <span>Podcast Seasons</span>
            </li>
          </Link>
          </AccordionDetails>

          <AccordionDetails>
          <Link to="/episode" style={{ textDecoration: "none" }}>
            <li>
              <CgMediaPodcast />
              <span>Podcast Episods</span>
            </li>
          </Link>
          </AccordionDetails>

         
       
      </Accordion>
    </div>
    <div stlye={{}}> 
          
    <Accordion style={{ width: 300 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography
            style={{
              fontWeight: 10,
            }}
          >
            Setting
          </Typography>
        </AccordionSummary>
        <AccordionDetails
        >
        <Link to="/setting" style={{ textDecoration: "none" }}>
            <li>
              <BiUser />
              <span>profile</span>
            </li>
          </Link>
          </AccordionDetails>

          <AccordionDetails>
          <Link to="/logout" style={{ textDecoration: "none" }}>
            <li>
              <BiLogOutCircle  />
              <span>logout</span>
            </li>
          </Link>
          </AccordionDetails>

          <AccordionDetails>
         
          </AccordionDetails>

          <AccordionDetails>
          
          </AccordionDetails>

         
       
      </Accordion>
    </div>
    <div stlye={{}}> 
          <h2> kin Website managment</h2>
          <Accordion style={{ width: 300 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography
                  style={{
                    fontWeight: 10,
                  }}
                >
                  manage Website
                </Typography>
              </AccordionSummary>
              <AccordionDetails
              >
              <Link to={<NavigateExternal to="http://kinideas.com/" />} style={{ textDecoration: "none" }}>
                  <li>
                    <FaInternetExplorer />
                    <span>view website</span>
                  </li>
                </Link>
                </AccordionDetails>
      
                <AccordionDetails>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <li>
                    <GrBlog  />
                    <span>post blog</span>
                  </li>
                </Link>
                </AccordionDetails>
      
                <AccordionDetails>
               
                </AccordionDetails>
      
                <AccordionDetails>
                
                </AccordionDetails>
      
               
             
            </Accordion>
          </div>
      
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
        
      </div>
    </div>
  );
};

export default Sidebar;
