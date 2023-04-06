import React, { useRef } from "react";
import useScript from "@hooks/useScript";

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleButton() {
  const googleSignInButton = useRef(null);

  const onGoogleSignIn = async (res: any) => {
    const idToken = res.credential;
    const response = await fetch(
      `/oauth2/authorization/google?token=${idToken}`
    );
    console.log(response);
  };

  useScript("https://accounts.google.com/gsi/client", () => {
    if (typeof window.google !== "undefined") {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: onGoogleSignIn,
      });
      window.google.accounts.id.renderButton(googleSignInButton.current, {
        width: 320,
      });
    }
  });

  return <div id="google-login-api" ref={googleSignInButton} />;
}
