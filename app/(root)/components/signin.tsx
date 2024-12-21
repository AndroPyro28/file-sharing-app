"use client";
import { signIn } from "next-auth/react";
import React, { useEffect } from "react";

export const SignIn = () => {
 
  return <div>

    <button onClick={() => {
    signIn("google");
    }}>
        Sign in as google
    </button>
  </div>;
};

export default SignIn;
