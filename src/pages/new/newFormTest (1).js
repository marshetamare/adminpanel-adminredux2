import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./formStyle.scss"
import {useSelector } from "react-redux"
import { useState, useRef, useEffect } from "react";
import Upload from "./upload";

const Form = () => {
  const [file, setFile] = useState("");
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <form className="form">
          
              <div className="row form">
              
                <div className="col">
                <label  className="form-select form-select mb-3">Enter Track name:
                <input  className="form-select form-select mb-3" type="text" />
                </label>
                  <h3>Select Artists</h3>
                  <select
                    className="form-select form-select mb-3"
                    name="artist"
                    aria-label=".form-select example"
                  >
                    <option>Select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col">
                  <h3>Select Album</h3>
                  <select
                    className="form-select form-select mb-3"
                    name="artist"
                    aria-label=".form-select example"
                      >
                    <option>Select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col">
                  <h4>Select Genere</h4>
                  <select
                    className="form-select form-select mb-3"
                    name="artist"
                    aria-label=".form-select example"
                     >
                    <option>Select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  
                </div>
                <div classname=''>
                <div className="">
                <label htmlFor="file">
                <div className="imageinput"> 
                <label htmlFor="file">
                  upload cover Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
               </label>
                <input
                  type="file"
                  id="file"
                 // onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
                  <button className="input">Add Track</button>
              </div> 

                </div>
              </div>               
          
           
            </form>
        
      
      </div>
    </div>
    
  
  


  
  )
}

export default Form
         