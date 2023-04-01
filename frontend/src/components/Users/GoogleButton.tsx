// /* eslint-disable */
// import Button from "@components/common/Button";
// import React, { useEffect, useCallback, useState } from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import { GoogleOAuthProvider } from "@react-oauth/google";

// interface IUserInfo {
//   profileImg: string;
//   name: string;
//   email: string;
// }

// const clientId =
//   "616197188404-r4r42llime4tbahjkp7e5a8n4vr7v8sp.apps.googleusercontent.com";

// export default function GoogleButton() {
//   const [userInfo, setUserInfo] = useState<IUserInfo>({
//     profileImg: "",
//     name: "",
//     email: "",
//   });
//   const [isLogin, setIsLogin] = useState(false);
//   const googleLogin = useCallback((response: any) => {
//     // const userInfo = {
//     //   profileImg: response.profileObj.imageUrl,
//     //   email: response.profileObj.email,
//     //   name: response.profileObj.name,
//     // };
//     console.log(response);
//     setUserInfo(userInfo);
//     setIsLogin(true);
//   }, []);
//   return (
//     <div>
//       {isLogin ? (
//         <>
//           {/* <div
//             style={{
//               width: "32px",
//               height: "32px",
//               borderRadius: "32px",
//               background: `url(${userInfo.profileImg.replace("96", "32")})`,
//             }}
//           />
//           <h3>이름: {userInfo.name}</h3>
//           <h3>이메일: {userInfo.email}</h3> */}
//           "로그인 성공"
//         </>
//       ) : (
//         <GoogleOAuthProvider clientId={clientId}>
//           <GoogleLogin
//             // buttonText="Google 로그인"
//             onSuccess={googleLogin}
//             // onFailure={(res) => console.log(res)}
//           />
//         </GoogleOAuthProvider>
//       )}
//     </div>
//   );
// }
import React, { useRef } from "react";
import useScript from "@hooks/useScript";
// import { postGoogleLogin } from "api/auth";

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleButton() {
  const googleSignInButton = useRef(null);

  const onGoogleSignIn = async (res: any) => {
    // const result = await postGoogleLogin(res.credential);
    // 콜백 함수
    console.log(res);
  };

  useScript("https://accounts.google.com/gsi/client", () => {
    if (typeof window.google !== "undefined") {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: onGoogleSignIn,
      });
      window.google.accounts.id.renderButton(googleSignInButton.current, {
        width: "250px",
        // type: "icon",
        // shape: "circle",
      });
    }
  });

  return <div id="google-login-api" ref={googleSignInButton} />;
}
