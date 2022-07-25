import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice(
{
    name:'ui',
    initialState: {
        isLoading: false, 
        isOpen:false,
        isNotificationOpen:false,
        isDialogOpen: false,
        isSidebarVisible: false,
        notificationData:[{title:'', message:'', clr:'red',bgcolor:''}]
    },
    reducers:{
        showLoading(state){
            state.isLoading = !state.isLoading;
        },
        openModal(state){
            state.isOpen=true;
        },
        closeModal(state){
            state.isOpen=false;
        },
        openNotification(state,action){
            state.isNotificationOpen=true
            state.notificationData= action.payload
        },
        closeNotification(state){
            state.isNotificationOpen=false
        },
        openDialog(state){
            state.isDialogOpen = true;
        },
        closeDialog(state){
            state.isDialogOpen = false;
        },
        openSidebarMenu(state){
            state.isSidebarVisible=true;
        } , 
    
        closeSidebar(state){
            state.isSidebarVisible=false;
        } , 
    }
}
)
export const uiActions = uiSlice.actions;
export default uiSlice;