import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        allUsers:null,
        messagedUsers:[]
    },
    reducers: {
        setAuthUser:(state,action)=>{
            state.user = action.payload
        },
        setAllUsers:(state,action)=>{
             state.allUsers = action.payload
        },
        setMessagedUsers:(state,action)=>{
            state.messagedUsers = action.payload
            }
}})
export const {
    setAuthUser,
    setAllUsers,
    setMessagedUsers

} = authSlice.actions

export default authSlice.reducer