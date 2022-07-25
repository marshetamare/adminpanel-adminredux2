import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import AlbumIcon from '@mui/icons-material/Album';
import {Link} from 'react-router-dom'
const Widget = ({ type, quantity }) => {
  let data;

  const amount = quantity;
  const diff = 20;

  switch (type) {
    case "musics":
      data = {
        title: "Musics",
        isMoney: false,
        link: "See all musics",
        toLink: "/track",
        icon: (
          <MusicNoteIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "artist":
      data = {
        title: "Artists",
        isMoney: false,
        link: "View all artist",
        toLink: "/artist",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "album":
      data = {
        title: "Albums",
        isMoney: true,
        link: "View all albums",
        toLink: "/album",
        icon: (
          <AlbumIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "podcast":
      data = {
        title: "Podacsts",
        isMoney: true,
        link: "See all podcats",
        toLink: "/podcast",
        icon: (
          <PodcastsIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
      case "newClient":
        data = {
          title: "new app client",
          isMoney: false,
          link: "View all clients",
          toLink: "/artist",
          icon: (
            <PersonOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
              }}
            />
          ),
        };
        break;
        case "newMusics":
          data = {
            title: "New Musics in last 30 days",
            isMoney: false,
            link: "View new musics",
            toLink: "/track",
            icon: (
              <PersonOutlinedIcon
                className="icon"
                style={{
                  backgroundColor: "rgba(218, 165, 32, 0.2)",
                  color: "goldenrod",
                }}
              />
            ),
          };
          
        break;
        case "newArtist":
          data = {
            title: "New Artists",
            isMoney: false,
            link: "View all  new aritist",
            toLink: "/artist",
            icon: (
              <PersonOutlinedIcon
                className="icon"
                style={{
                  backgroundColor: "rgba(218, 165, 32, 0.2)",
                  color: "goldenrod",
                }}
              />
            ),
          };
          break;
          case "newAlbum":
            data = {
              title: "new Albums",
              isMoney: false,
              link: "view new albums",
              toLink: "/artist",
              
              icon: (
                <PersonOutlinedIcon
                  className="icon"
                  style={{
                    backgroundColor: "rgba(218, 165, 32, 0.2)",
                    color: "goldenrod",
                  }}
                />
              ),
            };
            break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && ""} {amount}
        </span>
        
          <span className="link">
          <Link to={data.toLink} style={{ textDecoration: "none" }}>
                  {data.link}
            </Link>
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
         <span>{(amount/100)*100} %</span> 
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
