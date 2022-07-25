import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows} from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from 'react-redux'
import { artistActions } from "../../Store/artist-slice";
import { uiActions } from "../../Store/ui-slice";
import NewArtistForm from "../../pages/new/newArtistForm";
import NewAlbumForm from "../../pages/new/newAlbumForm";
import Axios from 'axios';
import { BASE_URL } from "../../env";
const Datatable = (props) => {
  const [data, setData] = useState();
  
  const dispatch = useDispatch()
  const toggle = useSelector((state)=>state.artist.isNewFormVisible)
  const isLoading = useSelector((state)=>state.ui.isLoading)
   const artistLists = [];
useEffect(()=>{
artistList();

}, [])

  const artistList = async () => {
    let endpt = BASE_URL + "/artist/";
    const resp = await Axios.get("https://jsonplaceholder.typicode.com/users");
    if(resp.status===200){
       resp.data.map((res)=>(artistLists.push({id:res.id, name:res.artist_name, img:res.artist_avatar, description:res.artist_description})));
      
       
      dispatch(artistActions.addArtist(resp.data))
      
 
    }
    dispatch(uiActions.showLoading());
    
  };

  const handleDelete = async(id) => {
    //setData(data.filter((item) => item.id !== id));
    dispatch(uiActions.showLoading());
    
     let endpt = BASE_URL+"/artist/"+id+"/delete/";
      const resp = await Axios.delete(endpt);
      if(resp.status===204){
        alert('you have deleted the artist!')
        window.location.reload();
     
      }else{
        console.log(resp.error)
        window.location.reload();
      }
      setData(data.filter((item) => item.id !== id));
      dispatch(uiActions.showLoading());

  };

  console.log(data)
 const artistRow = [
  
 ]
 
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/artist/" + params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>

            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  
  const toggleHandler = ()=>{
       dispatch(artistActions.toggler())
  }

  return (
    <div className="datatable">
      {!toggle && <div className="datatableTitle">
        <button  className="link" onClick={toggleHandler}>
          Add New
        </button>

      </div>}
    
     {props.dtype==='artist' ? toggle && <NewArtistForm/>:''}
      {
        <DataGrid
        className="datagrid"
        rows={data}
        
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />}
      {console.log(data)}
      {!isLoading && <h1> Loading . . .</h1>}
    </div>
  );
};

export default Datatable;
