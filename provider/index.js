'use client'

import store from "@/store"
import { Provider } from "react-redux"
import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer"
import SignInListener from "@/components/signInListener"
import SignOutListener from "@/components/signOutListener"


export default function ReduxProvider({children}) {
   return (
    <Provider store={store}>
      <Header />
        <SignInListener />
        <SignOutListener />
        {children}
        <Footer />
    </Provider>
   )
}