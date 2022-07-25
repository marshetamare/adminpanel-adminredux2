import { createSlice } from '@reduxjs/toolkit';

const trackSlice = createSlice({
    name:'artist',
    initialState: {
        trackList:[
         
        ],
        trackId: 0,
        isNewFormVisible: false,
        numberOfTrack: 0,
   },
    reducers: {
        addTrack(state, action){
           state.trackList = action.payload;
        },
        toggler(state){
             state.isNewFormVisible=!state.isNewFormVisible;
        },
        incrementNumberOfTrack(state){
            state.numberOfTrack=state.numberOfTrack + 1;
        },
        setTrackNumber(state, action){
            state.numberOfTrack = action.payload;

        },
        decrementTrackNumber(state){
            state.numberOfTrack = state.numberOfTrack - 1;
        },
    }
})

export const trackActions = trackSlice.actions;
export default trackSlice;