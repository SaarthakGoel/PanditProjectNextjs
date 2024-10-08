'use server'

import connectToDB from "@/database"
import User from "@/models/UserData";

export async function getUserData(userId) {
   await connectToDB();

   try{
    const foundUser = await User.findOne({userId : userId});

    if(!foundUser){
      return {
        success : false,
        message : "User not found"
      }
     }else{
      return {
        success : true,
        data : foundUser
      }
     }
   }catch(err){
    console.log(err);
    return {
      success : false,
      message : 'some error occured'
    }
   }
}