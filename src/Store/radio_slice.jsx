import { createSlice } from '@reduxjs/toolkit';

const RadioSlice = createSlice({
    name:'radio',
    initialState: {
        radioList:[
            {
                id:'',
                name:'',
                img:'',
                description:'',
                url:'',
                frequency:''
        }
        ],
      
        isNewFormVisible: false,
      
   },
    reducers: {
        addRadio(state, action){
            const id =  action.payload.id;
            const name =  action.payload.name;
            const img =  action.payload.img;
            const description =  action.payload.description;
            const url =  action.payload.url;
            const frequency=  action.payload.frequency;
            state.radioList.push({id:id,name:name,img:img,description:description,url:url,frequency:frequency});
        
        },
        incrementNumberOfRadio(state){
            state.numberOfRadio=state.numberOfRadio + 1;
        },
        setRadioNumber(state, action){
            state.numberOfRadio = action.payload;

        },
        decrementRadioNumber(state){
            state.numberOfRadio = state.numberOfRadio - 1;
        },

        toggler(state){
             state.isNewFormVisible=!state.isNewFormVisible;
        },
        editRadio(state, action){
             state.radioId = action.payload;
        }
    }
})

export const RadioActions = RadioSlice.actions;
export default RadioSlice;