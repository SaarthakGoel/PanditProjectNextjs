'use client'

import { getUserData } from "@/actions";
import { setUserData } from "@/store/slice/userData-slice";
import { useSession } from "@clerk/nextjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function SignInListener() {

  const {session} = useSession();
  const dispatch = useDispatch()

  useEffect(() => {
    async function signInDataSet(){
      if(session){
        console.log(session?.user?.id)
        const data = await getUserData(session.user.id)
        console.log(data)
        dispatch(setUserData(data.data))
      }
    }
    signInDataSet();
  },[session])

  return (
    <div>

    </div>
  )
}