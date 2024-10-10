import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  address: [],
  orders: [],
  cart : [],
  favourites: []
}

const userDataSlice = createSlice({
  name : 'userData',
  initialState,
  reducers : {
    setUserData(state , action) {
      const { userId, address, favourites, orders , cart } = action.payload;
      state.userId = userId || state.userId; // Fallback to current state if undefined
      state.address = address || state.address; // Update if provided
      state.favourites = favourites || state.favourites; // Update if provided
      state.orders = orders || state.orders; // Update if provided
      state.cart = cart || state.cart;
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
    },
    addToCart(state , action){
      const {pujaIdInt , date , time} = action.payload;
      const cart = [...state.cart , {pujaId : pujaIdInt , date , time}];
      state.cart = cart
      console.log(state.cart)
      console.log('redux cart item added')
    },
    removeFromCart(state , action) {
      console.log(action.payload)
      const {pujaIdInt} = action.payload;
      const arr = state.cart.filter((item) => item.pujaId !== pujaIdInt)
      state.cart = arr;
      console.log(state.cart)
      console.log('redux cart item removed')
    }
  }
})

export const {setUserData , addFavourite , removeFavourite , addToCart , removeFromCart} = userDataSlice.actions;
export default userDataSlice.reducer;