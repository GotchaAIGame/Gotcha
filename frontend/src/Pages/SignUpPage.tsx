import React, { useState, Dispatch, SetStateAction } from "react";
import SignUp from "@components/Users/SignUp";
import SignUpSuccess from "@components/Users/SignUpSuccess";

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
      <SignUp setIsSuccess={setIsSuccess} />
    </div>
  );
}
