// 'use client'
// import {useEffect} from 'react'
// import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
// import {Auth} from '@supabase/auth-ui-react'
// import Modal from "./Modal"
// import { useRouter } from "next/navigation"
// import {ThemeSupa} from '@supabase/auth-ui-shared'
// import useAuthModal from "@/hooks/useAuthModal"

// const AuthModal = () => {
//   const supabaseClient = useSupabaseClient()
//   const router = useRouter()
//   const {session} = useSessionContext()
//   const {onClose,isOpen}= useAuthModal()

//   useEffect(()=>{
//     if(session){
//       router.refresh()
//       onClose()
//     }
//   },[session,router,onClose])

//   const onChange =(open:boolean)=>{
//     if(!open){
//       onClose()
//     }
//   }
//   return (
//     <Modal title= 'Welcome Back' description="Login to your account" isOpen onChange={()=>{}}>
//       <Auth magicLink providers={['github']} theme="dark" supabaseClient={supabaseClient} appearance={{theme:ThemeSupa, variables:{
//         default:{
//           colors:{
//             brand: '#404040',
//             brandAccent:'22c55e'
//           }
//         }
//       }}}/>
//     </Modal>
//   )
// }

// export default AuthModal

"use client";

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { 
  useSessionContext, 
  useSupabaseClient
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import useAuthModal from "@/hooks/useAuthModal";

import Modal from './Modal';

const AuthModal = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();
  
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  return (
    <Modal 
      title="Welcome back" 
      description="Login to your account." 
      isOpen={isOpen} 
      onChange={onChange} 
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={['github']}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'
              }
            }
          }
        }}
        theme="dark"
      />
    </Modal>
  );
}

export default AuthModal;