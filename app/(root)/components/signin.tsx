"use client"
import React, { useEffect } from "react";
import { signIn } from "next-auth/react";
export const SignIn = () => {
  useEffect(() => {
    // signIn('google')
  }, [])
  return (
    <button
    onClick={() => { signIn('google') }}
    >
      Sign in as google
    </button>
  );
};

export default SignIn;
