'use server'

import connectToDB from "@/database"
import User from "@/models/UserData";

export async function getUserData(userId) {
   await connectToDB();

   try{
    const foundUser = await User.findOne({userId : userId}).lean();

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


export async function postFavourite(userId , title , description , videoId , thumbnail){

  if(!userId){
    return {
      success : false,
      message : 'userId not get daze'
    }
  }

  await connectToDB();
  const favObj = {title , description , videoId , thumbnail}

  try{
    const updatedUser = await User.findOneAndUpdate({userId : userId} , { $push : {favourites : favObj}});

    if(updatedUser){
      return {
        success : true,
        message : "Favourites Updated"
      }
    }else{
      return {
        success : false,
        message : "Fav update failed"
      }
    }
  }catch(err){
    console.log(err)
    return {
      success : false,
      message : 'some error occured'
    }
  }
}


export async function deleteOneFavourite(userId , videoId) {

  if(!userId){
    return {
      success : false,
      message : 'userId not get daze'
    }
  }

  await connectToDB();

  try{
    const updatedUser = await User.findOneAndUpdate({userId : userId} , {$pull : {favourites : {videoId : videoId}}});

    if(updatedUser){
      return {
        success : true,
        message : "Favourite removed"
      }
    }else{
      return {
        success : false,
        message : "Fav removal failed"
      }
    }
  }catch(err){
    console.log(err)
    return {
      success : false,
      message : 'some error occured'
    }
  }
}



export async function postCart(userId , pujaId , date , time){

  if(!userId){
    return {
      success : false,
      message : 'userId not get daze'
    }
  }

  await connectToDB();
  const cartObj = {pujaId , date , time};

  try{
    const updatedUser = await User.findOneAndUpdate({userId : userId} , { $push : {cart : cartObj}});

    if(updatedUser){
      return {
        success : true,
        message : "cart Updated"
      }
    }else{
      return {
        success : false,
        message : "cart update failed"
      }
    }
  }catch(err){
    console.log(err)
    return {
      success : false,
      message : 'some error occured'
    }
  }
}


export async function deleteOneCart(userId , pujaId) {

  if(!userId){
    return {
      success : false,
      message : 'userId not get daze'
    }
  }

  await connectToDB();

  try{
    const updatedUser = await User.findOneAndUpdate({userId : userId} , {$pull : {cart : {pujaId : pujaId}}});

    if(updatedUser){
      return {
        success : true,
        message : "cart removed"
      }
    }else{
      return {
        success : false,
        message : "cart removal failed"
      }
    }
  }catch(err){
    console.log(err)
    return {
      success : false,
      message : 'some error occured'
    }
  }
}


export async function saveAddress({userId , name , street , city , state , country , postalCode }){

  if(!userId){
    return {
      success : false,
      message : 'userId not get daze'
    }
  }

  await connectToDB();
  const addObj = {
    name , selected : false , street , city , state , postalCode , country
  }

  console.log(addObj)

  try{
    const updatedUser = await User.findOneAndUpdate({userId : userId} ,{$push : {address : addObj}})

    if(updatedUser){
      return {
        success : true,
        message : "address saved"
      }
    }else{
      return {
        success : false,
        message : "address saving failed"
      }
    }
  }catch(err){
    console.log(err)
    return {
      success : false,
      message : 'some error occured'
    }
  }

}


export async function deleteAddress({userId , name}) {
  if(!userId){
    return {
      success : false,
      message : 'userId not get daze'
    }
  }

  await connectToDB();

  try{
    const updatedUser = await User.findOneAndUpdate({userId : userId} , {$pull : {address : {name : name}}});

    if(updatedUser){
      return {
        success : true,
        message : "address removed"
      }
    }else{
      return {
        success : false,
        message : "address delete failed"
      }
    }

  }catch(err){
    console.log(err)
    return {
      success : false,
      message : 'some error occured'
    }
  }
}


export async function saveSelected({userId , selectedAddress}) {
  if(!userId){
    return {
      success : false,
      message : 'userId not get daze'
    }
  }

  await connectToDB();

  try{
    const updatedUser = await User.findOneAndUpdate(
      {userId , "address.selected" : true},
      {$set : { "address.$.selected": false } }
    )

    const updatedUser2 = await User.findOneAndUpdate(
      {userId , "address.name" : selectedAddress},
      {$set : { "address.$.selected": true }}
    );

    if(updatedUser2){
      return {
        success : true,
        message : "select successfull"
      }
    }else{
      return {
        success : false,
        message : "Select failed"
      }
    }

  }catch(err){
    console.log(err)
    return {
      success : false,
      message : 'some error occured'
    }
  }
}