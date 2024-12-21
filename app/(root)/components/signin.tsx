"use client";
import { signIn } from "@/auth";
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
