import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface adminState {
    isLogedIn: boolean
}

const initialState: adminState = {
    isLogedIn : false
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setLogin(state, action: PayloadAction<boolean>){
            state.isLogedIn = action.payload;
        }
    }
});

export const { setLogin } = adminSlice.actions;
export default adminSlice.reducer;