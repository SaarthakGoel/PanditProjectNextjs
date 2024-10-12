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
    },
    addAddress(state , action){
      const {name , street , city , state : state1 , country , postalCode} = action.payload;
      state.address = [...state.address , {name , street , city , selected : false , state : state1 , country , postalCode}]
      console.log(state.address);
      console.log('redux address saved')
    },
    removeAddress(state , action){
      const {name} = action.payload;
      const addArr = state.address.filter((item) => item.name !== name)
      state.address = addArr
      console.log(state.address)
      console.log('Redux removed Address')
    },
    setSelected(state , action){
      const {selectedAddress} = action.payload;
      const arr = state.address.map((item) => {
        if (item.name === selectedAddress) {
          return { ...item, selected: true };  // Return modified object
        } else {
          return { ...item, selected: false };  // Ensure we return for all items
        }
      });
      state.address = arr;
      console.log(state.address)
      console.log('Redux Address selected')
    }
  }
})

export const {setUserData , addFavourite , removeFavourite , addToCart , removeFromCart , addAddress , removeAddress , setSelected} = userDataSlice.actions;
export default userDataSlice.reducer;