import React from "react";
import { useSelector } from "react-redux";

export default function CreatorMainPage() {
  const userId = useSelector((state: any) => state.users.userId);

  return (
    <div>
      {userId ? (
        <p>{userId}님, 어서오세요!</p>
      ) : (
        <p>로그인이 필요한 서비스 입니다.</p>
      )}
      <p>출제자 페이지입니다</p>
    </div>
  );
}
