'use client'

import store from "@/store"
import { Provider } from "react-redux"
import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer"
import SignInListener from "@/components/signInListener"


export default function ReduxProvider({children}) {
   return (
    <Provider store={store}>
      <Header />
        <SignInListener />
        {children}
        <Footer />
    </Provider>
   )
}