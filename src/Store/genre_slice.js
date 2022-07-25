import { createSlice } from '@reduxjs/toolkit';

const genreSlice = createSlice({
    name:'genre',
    initialState: {
        genreList:[
                   {genreTitle:'', genreCover: '', genreDescription:''},
              ],
        albumId: 0,
        isNewFormVisible: false,
        isSubmitButtonVisible: false,
        numberOfGenre: 0,
   },
    reducers: {
        addGenre(state, action){
            const newGenre =  action.payload;
            state.genreList.push(newGenre);
        },
        toggler(state){
             state.isNewFormVisible=!state.isNewFormVisible;
        },
        editGenre(state, action){
             state.genreId = action.payload;
        },
        incrementNumberOfGenre(state){
            state.numberOfGenre=state.numberOfGenre + 1;
        },
        setGenreNumber(state, action){
            state.numberOfGenre = action.payload;

        },
        decrementGenreNumber(state){
            state.numberOfGenre = state.numberOfGenre- 1;
        },
    }
})

export const GenreActions = genreSlice.actions;
export default genreSlice;