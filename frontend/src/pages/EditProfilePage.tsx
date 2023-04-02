import React from "react";
import EditProfile from "@components/EditProfile/EditProfile";
import "@styles/EditProfilePage.scss";
import GlobalNavbar from "@components/common/GlobalNavbar";

export default function EditProfilePage() {
  return (
    <div>
      <GlobalNavbar />
      <EditProfile />
    </div>
  );
}
