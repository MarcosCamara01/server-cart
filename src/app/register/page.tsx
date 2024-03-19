import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";
import { redirect } from 'next/navigation';
import Signup from '@/components/auth/Signup';

const Register = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (session) {
    redirect('/add-to-cart');
  } else {
    return (
      <Signup />
    )
  }
}

export default Register;
