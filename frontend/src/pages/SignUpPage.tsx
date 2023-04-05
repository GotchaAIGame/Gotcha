import React, { useState, Dispatch, SetStateAction } from "react";
import SignUp from "@components/Users/SignUp";
import SignUpSuccess from "@components/Users/SignUpSuccess";
import GlobalNavbar from "@components/common/GlobalNavbar";

type Props = {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

export default function SignUpPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return (
      <div>
        <SignUpSuccess />
      </div>
    );
  }
  return (
    <div>
      <GlobalNavbar />
      <SignUp setIsSuccess={setIsSuccess} />
    </div>
  );
}
