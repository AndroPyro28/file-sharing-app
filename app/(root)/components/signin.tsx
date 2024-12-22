import { signIn } from "@/auth";
import React, { useEffect } from "react";

export const SignIn = () => {
  return (
    <form
      action={async () => {
        "use server"
        signIn("google", {
          
        });
      }}
    >
      <button type="submit">Sign in as google</button>
    </form>
  );
};

export default SignIn;
