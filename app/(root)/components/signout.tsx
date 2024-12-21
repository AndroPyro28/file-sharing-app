import { signOut } from "@/auth";
import React, { useEffect } from "react";

export const SignOut = () => {
  return (
    <form
      action={async () => {
        signOut({redirectTo:'/'});
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
};

export default SignOut;
