"use client";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";
export const SignOut = () => {
  return (
    <div>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
};
export default SignOut;
