import React from 'react';
import "./style.scss";
import {Link, useNavigate} from 'react-router-dom'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {BASE_URL} from '../../env'
import Axios from 'axios'
import {artistActions} from '../../Store/artist-slice'
import {uiActions} from '../../Store/ui-slice'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import logo from "../../components/images/logo.jpg";

export default function AddProfile() {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const [artData, setArtData ] = useState([]);
    const artistList = async () => {
        let endpt = BASE_URL + "genre/";
        const resp = await Axios.get(endpt);      
          setRows(resp.data.results);

         
          // dispatch(artistActions.setArtistNumber(resp.data.results.length()));
     
      
       // dispatch(uiActions.showLoading());
        
      };
      useEffect(()=>{
        artistList();
        
        }, [rows])

return (
    <div className="list">
    <div className="listContainer">    
  
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">
            <div className="profile">
                  <label className='font'>campany profile</label>
                  
                </div>

            </TableCell>
            <TableCell className="tableCell left"> 
         
            </TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
         
            <TableRow>
              
              <TableCell className="tableCell">
              <div className="profile">
                  <label className='lable'>Campnay Name</label>
                  <input type="text" placeholder=""  className="input"/>
                </div>
              </TableCell>
              <div className="profile">
                  <label className='lable'>contact person</label>
                  <input type="text" placeholder=""  className="input"/>
                </div>
            </TableRow>
            <TableRow >
              
              <TableCell className="tableCell">
              <div className="profile">
                  <label className='lable'>Campnay address</label>
                  <input type="text" placeholder=""  className="input"/>
                </div>
              </TableCell>
              <div className="profile">
                  <label className='lable'>country</label>
                  <input type="text" placeholder=""  className="input"/>
                </div>
            </TableRow>
            <TableRow >
              
              <TableCell className="tableCell">
              <div className="profile">
                  <label className='lable'>city</label>
                  <input type="text" placeholder=""  className="input"/>
                </div>
              </TableCell>
              <div className="profile">
                  <label className='lable'>state</label>
                  <input type="text" placeholder=""  className="input"/>
                </div>
            </TableRow>
            <TableRow >
              
              <TableCell className="tableCell">
              <div className="profile">
                  <label className='lable'>postal code</label>
                  <input type="text" placeholder=""  className="input"/>
                </div>
              </TableCell>
              <div className="profile">
                  <label className='lable'>email</label>
                  <input type="text" placeholder=""  className="input"/>
                </div>
            </TableRow>
            <TableRow >
              
              <TableCell className="tableCell">
              <div className="profile">
                  <label className='lable'>office number </label>
                  <input type="text" placeholder=""  className="input"/>
                </div>
              </TableCell>
              <div className="profile">
                  <label className='lable'>mobail number</label>
                  <input type="text" placeholder=""  className="input"/>
                </div>
            </TableRow>
            <TableRow >
              
              <TableCell className="tableCell">
              <div className="profile">
                  <label className='lable'>fax </label>
                  <input type="text" placeholder=""  className="input"/>
                </div>
              </TableCell>
              <div className="profile">
                  <label className='lable'>website</label>
                  <input type="text" placeholder=""  className="input"/>
                </div>
            </TableRow>
            <TableRow >
              
              <TableCell className="tableCell">
              <div className="profile">
                  <label className='lable'>privancy</label>
                  <input type="text" placeholder=""  className="input"/>
                </div>
              </TableCell>
              <div className="profile">
                  <label className='lable'>term</label>
                  <input type="text" placeholder=""  className="input"/>
                </div>
            </TableRow>
            <TableRow >
              
              <TableCell className="tableCell">
              <div className="profile">
                  <label className='lable'>help</label>
                  <input type="text" placeholder=""  className="input"/>
                </div>
              </TableCell>
              <div className="profile">
                  <label className='lable'>about</label>
                  <input type="text" placeholder=""  className="input"/>
                </div>
            </TableRow>
        </TableBody>
      </Table>
      </div>
    
  </div>
    
)};
