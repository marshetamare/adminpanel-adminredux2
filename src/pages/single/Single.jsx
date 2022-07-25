import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";

const Single = () => {
  /*
  const [artistData, setArtistData] = useState([]);
  const { artistID } = useParams();
  useEffect(() => {
    getSingleUser();
  }, []);
  const getSingleUser = async () => {
    await Axios.get(`${BASE_URL}/artist/${artistID}`).then((result) => {
      if (result.status == 200) {
        setArtistData(result.data);
      }
    });
    console.log(artistData);
  };
  const onSubmitHandler = async (e) => {
    const endpt = `${BASE_URL}/artist/${artistID}/update`;
    const formData = new FormData();
    formData.append("artist_name", artistData.artist_name);
    formData.append("artist_avatar", artistData.artist_avatar);
    formData.append("artist_description", artistData.artist_description);

    e.preventDefault();
    const createArtist = await Axios.put(endpt, formData).then((res) => {
      if (res.status == 200) {
        alert("Edited!");
      }
    });
  };

*/
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle"></h1>
             
                <div className="detailItem">
                  <span className="itemKey">Name:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
      
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
