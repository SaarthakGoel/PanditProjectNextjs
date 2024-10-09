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
    addFavourite(state , action){
      const {title , description , videoId , thumbnail} = action.payload;
      const fav = [...state.favourites , {title , description , videoId , thumbnail}]
      state.favourites = fav;
      console.log('redux fav update complete')
    },
    removeFavourite(state , action){
      const {videoId} = action.payload;
      const fav = state.favourites.filter((item) => item.videoId !== videoId);
      state.favourites = fav
      console.log('redux fav remove complete')
    }
  }
})

export const {setUserData , addFavourite , removeFavourite} = userDataSlice.actions;
export default userDataSlice.reducer;