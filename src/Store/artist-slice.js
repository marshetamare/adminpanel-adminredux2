import { createSlice } from '@reduxjs/toolkit';

const artistSlice = createSlice({
    name:'artist',
    initialState: {
        artistList:[
            {
                id:'',
                name:'',
                img:'',
                description:''
        }
        ],
        artistId: 0,
        isNewFormVisible: false,
        numberOfArtist: 0,
   },
    reducers: {
        addArtist(state, action){
            const id =  action.payload.id;
            const name =  action.payload.name;
            const img =  action.payload.img;
            const description =  action.payload.description;
            state.artistList.push({id:id,name:name,img:img,description:description});
        
        },
        incrementNumberOfArtist(state){
            state.numberOfArtist=state.numberOfArtist + 1;
        },
        setArtistNumber(state, action){
            state.numberOfArtist = action.payload;

        },
        decrementArtistNumber(state){
            state.numberOfArtist = state.numberOfArtist - 1;
        },

        toggler(state){
             state.isNewFormVisible=!state.isNewFormVisible;
        },
        editArtist(state, action){
             state.artistId = action.payload;
        }
    }
})

export const artistActions = artistSlice.actions;
export default artistSlice;