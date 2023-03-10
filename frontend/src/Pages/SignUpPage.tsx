import React, { useState, Dispatch, SetStateAction } from "react";
import SignUp from "../Components/Users/SignUp";
import SignUpSuccess from "../Components/Users/SignUpSuccess";

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
