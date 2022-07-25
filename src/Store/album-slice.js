import { createSlice } from '@reduxjs/toolkit';

const albumSlice = createSlice({
    name:'album',
    initialState: {
        albumList:[
                   {albumName:'', artistID:'', albumCover: '', albumDescription:''},
              ],
        albumId: 0,
        isNewFormVisible: false,
        isSubmitButtonVisible: false,
        numberOfAlbum: 0,
   },
    reducers: {
        addAlbum(state, action){
            const newAlbum =  action.payload;
            state.albumList.push(newAlbum);
        },
        toggler(state){
             state.isNewFormVisible=!state.isNewFormVisible;
        },
        editAlbum(state, action){
             state.albumId = action.payload;
        },
        incrementNumberOfAlbum(state){
            state.numberOfAlbum=state.numberOfAlbum + 1;
        },
        setAlbumNumber(state, action){
            state.numberOfAlbum = action.payload;

        },
        decrementAlbumNumber(state){
            state.numberOfAlbum = state.numberOfAlbum - 1;
        },
    }
})

export const albumActions = albumSlice.actions;
export default albumSlice;