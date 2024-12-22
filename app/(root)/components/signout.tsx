import { signOut } from "@/auth";
import React from "react";

export const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        signOut({ redirectTo: "/" });
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
};

export default SignOut;
