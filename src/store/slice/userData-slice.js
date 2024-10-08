import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  address: [],
  orders: [],
  favourites: []
}

const userDataSlice = createSlice({
  name : 'userData',
  initialState,
  reducers : {
    setUserData(state , action) {
      const { userId, address, favourites, orders } = action.payload;
      state.userId = userId || state.userId; // Fallback to current state if undefined
      state.address = address || state.address; // Update if provided
      state.favourites = favourites || state.favourites; // Update if provided
      state.orders = orders || state.orders; // Update if provided
    },
    setFavourite(state , action){

    }
  }
})

export const {setUserData} = userDataSlice.actions;
export default userDataSlice.reducer;