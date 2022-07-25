import { createSlice } from '@reduxjs/toolkit';

const LoginSlice = createSlice({
    name:'login',
    initialState: {
        userData:[
                   {userid:'', username:''},
              ],
  
        isUserLoggedIn: localStorage.getItem('islog'),
   },
    reducers: {
        addUser(state, action){
            
            state.userData.push(action.payload);
        },
        loggedIn(state){
             state.isUserLoggedIn=true;
            
        },
        loggedOut(state){
            state.isUserLoggedIn=false;
           
       },
    }
})

export const loginActions = LoginSlice.actions;
export default LoginSlice;