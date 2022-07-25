import React, {useEffect, useState} from 'react'
import Home from "./pages/home/Home";
import Login from "./pages/Auth/Login";
import List from "./pages/list/List";
import PodcastList from "./pages/list/podcastList";
import GenreList from "./pages/list/genreList";
import TrackList from "./pages/list/trackList";
import PodcastCategoryList from './pages/list/podcastCategoryList'
import PodcastSeasonList from './pages/list/podcastSeasonList'
import PodcastEpisodeList from './pages/list/podcastEpisodeList'
import EditPodcastCategoryForm from './pages/Podcasts/Category/editPodcastForm'
import EditSeasonForm from './pages/Podcasts/Seasons/editSeasonForm'
import EditEpisodeForm from './pages/Podcasts/Episodes/editEpisodeForm'

import AlbumList from "./pages/list/albumList";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import EditArtist from "./pages/new/editArtist";
import EditAlbum from "./pages/new/editAlbum";
import EditTrack from "./pages/new/editTrack";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import NewAlbumForm from "./pages/new/newAlbumForm";
import NewArtistForm from "./pages/new/newArtistForm";
import { useSelector } from 'react-redux'
import {albumActions} from './Store/album-slice'
import EditPodcastForm from './pages/new/editPodcastForm';
import LyricsList from './pages/LyricsList/LyricsList'
import LyricsDetails from './pages/LyricsList/LyricsDetails'
import EditGenre from "./pages/genre/editGenre";
import NewGenreForm from "./pages/genre/NewGenreForm";
import EditRadio from "./pages/radio/editradio";
import RadioList from "./pages/radio/radioList";
import EditProfile from "./pages/profile/editProfile";
import Playlist from './components/table/playlistTable';
import Favorite from './components/table/favoriteTable';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  
  const isLogin = useSelector((state)=>state.login.isUserLoggedIn)
  const isAlbumVisible = useSelector((state)=>state.album.isNewFormVisible);
  
  return (
   
    
    <div className={darkMode ? "app dark" : "app"}>
    
      <BrowserRouter>
        <Routes>
          <Route path="/">

            <Route index element={!isLogin ? <Login /> : <Home/>} />
            <Route path="home" element={!isLogin ? <Login /> : <Home />} />
            <Route path='album' element={!isLogin ? <Login /> : <NewAlbumForm/>}/>
            <Route path="artist" element={!isLogin ? <Login /> : <List />} />
            
            <Route path="login" element={!isLogin ? <Login /> : <Login />} />
            <Route path="album">
              <Route index element={!isLogin ? <Login /> : <AlbumList />} />
              <Route path=":albumId" element={!isLogin ? <Login /> : !isAlbumVisible ? <EditAlbum />:<AlbumList />} />
              <Route
                path="new"
                element={!isLogin ? <Login /> : <New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="artist">
              <Route index element={!isLogin ? <Login /> : <List />} />
              <Route path=":artistId" element={!isLogin ? <Login /> : <EditArtist />} />
              <Route
                path="new"
                element={!isLogin ? <Login /> : <New inputs={productInputs} title="Add New Product" />}
              />
            </Route>

            <Route path="track">
            <Route index element={!isLogin ? <Login /> : <TrackList />} />
            <Route path=":trackId" element={!isLogin ? <Login /> : <EditTrack />} />

          </Route>


          <Route path="genre">
              <Route index element={!isLogin ? <Login /> : <GenreList />} />
              <Route path=":albumId" element={!isLogin ? <Login /> : !isAlbumVisible ? <EditGenre />:<GenreList />} />
              <Route
                path="new"
                element={!isLogin ? <Login /> : <New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="playlist">
              <Route index element={!isLogin ? <Login /> : <Playlist />} />
              <Route path=":albumId" element={!isLogin ? <Login /> : !isAlbumVisible ? <EditGenre />:<GenreList />} />
              <Route
                path="new"
                element={!isLogin ? <Login /> : <New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="favorite">
              <Route index element={!isLogin ? <Login /> : <Favorite />} />
              <Route path=":albumId" element={!isLogin ? <Login /> : !isAlbumVisible ? <EditGenre />:<GenreList />} />
              <Route
                path="new"
                element={!isLogin ? <Login /> : <New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="setting">
              <Route index element={!isLogin ? <Login /> : <EditProfile />} />
              <Route path=":albumId" element={!isLogin ? <Login /> : !isAlbumVisible ? <EditGenre />:<GenreList />} />
              <Route
                path="new"
                element={!isLogin ? <Login /> : <New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="radio">
            <Route index element={!isLogin ? <Login /> : <RadioList />} />
            <Route path=":radioId" element={!isLogin ? <Login /> : <EditRadio />} />
            <Route
              path="new"
              element={!isLogin ? <Login /> : <New inputs={productInputs} title="Add New Product" />}
            />
          </Route>
       
      <Route path="podcast">
          <Route index element={!isLogin ? <Login /> : <PodcastList />} />
          <Route path=":podcastId" element={!isLogin ? <Login /> : <EditPodcastForm />} />
         
        </Route>
       { //podcast category
       }

        <Route path="category">
          <Route index element={!isLogin ? <Login /> : <PodcastCategoryList />} />
          <Route path=":categoryId" element={!isLogin ? <Login /> : <EditPodcastCategoryForm />} />
         
        </Route>

        {//podcast season 
        }
        <Route path="seasons">
          <Route index element={!isLogin ? <Login /> : <PodcastSeasonList />} />
          <Route path=":seasonId" element={!isLogin ? <Login /> : <EditSeasonForm/>} />
         
        </Route>
       
       { //podcast episode 
       }
        <Route path="episode">
          <Route index element={!isLogin ? <Login /> : <PodcastEpisodeList />} />
          <Route path=":episodeId" element={!isLogin ? <Login /> : <EditEpisodeForm />} />
         
        </Route>

        {
          //all about lyrics
        }

        <Route path="lyrics">
          <Route index element={!isLogin ? <Login /> : <LyricsList />} />
          <Route path=":lyricsId" element={!isLogin ? <Login /> : <LyricsDetails />} />
         
        </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
