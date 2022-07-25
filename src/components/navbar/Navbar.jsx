import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { AiFillSetting ,AiFillProfile,AiOutlineLogout} from "react-icons/ai";
import {  } from "react-icons/fi";
import {useSelector, useDispatch} from 'react-redux'
import {loginActions} from '../../Store/Login-slice';
import { NavLink, Outlet } from "react-router-dom";
import {FiAlignRight,FiXCircle,FiChevronDown } from "react-icons/fi";
import "./Nav.css";
import logo from "../images/logo.jpg"
import { uiActions } from "../../Store/ui-slice";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
const randomRGB=()=>Math.floor(Math.random()*256);
const getRandomColor=()=>'rgb('+randomRGB()+','+randomRGB()+','+randomRGB()+')';
const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [currentColor,setCurrentColor]=useState(getRandomColor());
  const ldispatch = useDispatch();
  const handleLogout = ()=>{
    localStorage.removeItem("islog");
    ldispatch( 
        loginActions.loggedOut()
      )
  }
  const [isMenu, setisMenu] = useState(false);
  const [isResponsiveclose, setResponsiveclose] = useState(false);
  const toggleClass = () => {
    setisMenu(isMenu === false ? true : false);
    setResponsiveclose(isResponsiveclose === false ? true : false);
  };
  let boxClass = ["nav__container"];
  if(isMenu) {
    boxClass.push('responsive__nav__show');
  }else{
    boxClass.push('');
  }
  const [isMenuSubMenu, setMenuSubMenu] = useState(false);
  const toggleSubmenu = () => {
    setMenuSubMenu(isMenuSubMenu === false ? true : false);
  };
  let boxClassSubMenu = ["sub__menus"];
  if(isMenuSubMenu) {
    boxClassSubMenu.push('sub__menus__Active');
  }else {
    boxClassSubMenu.push('');
  }
  const sidebar = useSelector((state)=>state.ui.isSidebarVisible)
  const openSidebar=()=>{
    ldispatch(uiActions.openSidebarMenu())
  }
  return (
    <div className="navbar">
      
      <div className="wrapper">
      {!sidebar && <button onClick={openSidebar} className="material-icons"><MenuOutlinedIcon /></button>}
      <p style={{width:'400px',  padding:'20px'}}>Kin music Application</p>
      
      <li onClick={toggleSubmenu} className="sub__menus__arrows"><NavLink className={({ isActive }) => isActive ? "" : ""} to="">music managmnet <FiChevronDown /> </NavLink>
        <ul className={boxClassSubMenu.join(' ')} > 
          <li><NavLink onClick={toggleClass} className={({ isActive }) => isActive ? "active" : ""} to="/track">Tracks</NavLink></li>
          <li><NavLink onClick={toggleClass} className={({ isActive }) => isActive ? "active" : ""} to="/genre">Genres</NavLink></li>
          <li><NavLink onClick={toggleClass} className={({ isActive }) => isActive ? "active" : ""} to="/artist">artists</NavLink></li>
          <li><NavLink onClick={toggleClass} className={({ isActive }) => isActive ? "active" : ""} to="/album">albums</NavLink></li>
          <li><NavLink onClick={toggleClass} className={({ isActive }) => isActive ? "active" : ""} to="/lyrics">Lyrics</NavLink></li>
          <li><NavLink onClick={toggleClass} className={({ isActive }) => isActive ? "active" : ""} to="/podcast">podcast</NavLink></li>
          <li><NavLink onClick={toggleClass} className={({ isActive }) => isActive ? "active" : ""} to="/radio">radio</NavLink></li>
        </ul>
      </li>
      
        <div className="items">
         
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          
          <div className="item">
            
       <Accordion style={{backgroundColor:'transparent', height: '50px', zIndex:'1',}}>
        <AccordionSummary
        
          aria-controls=""
        >
          <Typography>
                    
           <img
             src={logo} style={{width:'60px', height:'40px',backgroundColor:'transparent'}} 
              className="avatar"
            />
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{backgroundColor:'#ffe500',width:'100px'}}
        >
        <Link to="/setting" style={{ textDecoration: "none" }} >
            <p>
              <AiFillProfile/> <span> Profile</span>
            </p>
          </Link>
          </AccordionDetails>
          <AccordionDetails  style={{backgroundColor:'#ffe500'}}>
          <Link to="/setting" style={{ textDecoration: "none" }} >
            <p>
              <AiFillSetting/>
              <span> Setting</span>
            </p>
          </Link>
          </AccordionDetails>
          <AccordionDetails  style={{backgroundColor:'#ffe500'}}>
          <Link to="/logout" style={{ textDecoration: "none" }}>
            <p onClick={handleLogout}>
              <AiOutlineLogout />
              <span> Logout</span>
            </p>
          </Link>
          </AccordionDetails>
             </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
