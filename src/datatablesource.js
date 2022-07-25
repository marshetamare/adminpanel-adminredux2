import { useSelector } from 'react-redux'
import React, {useState} from 'react'


export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },

  {
    field: "description",
    headerName: "Description",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//album columns

export const albumColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "album",
    headerName: "Cover Image",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.albumName}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Album Name",
    width: 230,
  },

  {
    field: "description",
    headerName: "Album Description",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
//end of album column


//album columns

export const trackColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "track",
    headerName: "Cover Image",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.albumName}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Artist Name",
    width: 230,
  },
  {
    field: "trackfile",
    headerName: "Play",
    width: 230,
  },

  {
    field: "description",
    headerName: "Track Description",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
//end of track column
//temporary data
 export const userRows = [

  {
    id: 1,
    username: "alex",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "alex@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "James",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "jamesw@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "abe",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "kebe",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "seble",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "seble@gmail.com",
    status: "passive",
    age: 22,
  },
 
  
  
];

