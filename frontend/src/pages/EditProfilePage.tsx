import React from "react";
import EditProfile from "@components/EditProfile/EditProfile";
import "@styles/EditProfilePage.scss";
import GlobalNavbar from "@components/common/GlobalNavbar";
import Hambugerbar from "@components/common/Hambugerbar";

export default function EditProfilePage() {
  return (
    <div>
      <Hambugerbar />
      <GlobalNavbar />
      <EditProfile />
    </div>
  );
}
