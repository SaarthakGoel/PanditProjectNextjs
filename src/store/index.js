import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from './slice/userData-slice';

const store = configureStore({
  reducer : {
    userData : userDataReducer
  }
});

export default store;