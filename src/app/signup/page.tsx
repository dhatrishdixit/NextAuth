"use client"
import React,{useState,useEffect} from 'react'
import axios, { AxiosError } from "axios";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

interface userSchema {
  username:string,
  email:string,
  password:string
}
function page() {
  const [user,setUser] = useState<userSchema>({
    username:"",
    email:"",
    password:""
  });
  const router = useRouter();
  console.log(router);
  const [loading,setLoading] = useState<boolean>(false);
  const [buttonDisable,setButtonDisabled] = useState<boolean>(false);

  const onSubmit = async () =>{
      try {
         setLoading(true);
         await axios.put("/api/users/login",user);
         setLoading(false);
         toast.success("Registered successfully");
         router.push('/login');
      } catch (error:any) {
        console.log("error while signing up");
        setLoading(false);
        toast.error(error.response.data.message);
      } 
  }
  
  useEffect(()=>{
      if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
        setButtonDisabled(false);
      }
  },[user]);
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      {loading == true ? <div className='font-bold text-3xl'>
        loading....
      </div> : (
      <>
            <input 
             className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
             type='text'
             value={user.username}
             placeholder='username'
             onChange={(event)=>{
                  setUser(user => {
                    return {
                      ...user,
                      username:event.target.value
                    }
                  })
             }}
            />
            <input 
             className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
             type='text'
             value={user.email}
             placeholder='email'
             onChange={(event)=>{
                  setUser(user => {
                    return {
                      ...user,
                      email:event.target.value
                    }
                  })
             }}
            />
            <input 
             className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
             type='text'
             value={user.username}
             placeholder='username'
             onChange={(event)=>{
                  setUser(user => {
                    return {
                      ...user,
                      username:event.target.value
                    }
                  })
             }}
            />       
      </>
    )}
    </div>
  )
}

export default page