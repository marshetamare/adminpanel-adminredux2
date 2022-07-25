import { configureStore } from '@reduxjs/toolkit';
import albumSlice from './album-slice';
import artistSlice from './artist-slice'
import trackSlice from './track-slice';
import uiSlice from './ui-slice'
import podcastSlice from './podcast-slice'
import loginSlice from './Login-slice'

const Store = configureStore({
    reducer:{
        artist:artistSlice.reducer,
        album: albumSlice.reducer,
        ui:uiSlice.reducer,
        track: trackSlice.reducer,
        podcast: podcastSlice.reducer,
        login: loginSlice.reducer,
    }
})

export default Store;