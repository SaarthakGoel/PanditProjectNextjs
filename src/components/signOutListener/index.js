'use client'

import { logOutUserData } from "@/store/slice/userData-slice";
import { useSession } from "@clerk/nextjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function SignOutListener() {

  const {session} = useSession();
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(session)
    if (session) return;
    console.log(session)
    async function signOutDataSet(){
      if(!session){
        dispatch(logOutUserData())
      }
    }
    signOutDataSet();
  },[session , dispatch])

  return null
}