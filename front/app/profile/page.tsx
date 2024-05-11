"use client";

import { ProfileDashboard } from "@/components/dashboards/ProfileDashboard";
import { LoginForm } from "@/components/forms/LoginForm";
import { isLogged, isTokenExpired } from "@/utils/account.service";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProfilePage = () => {
  const router = useRouter();

  useEffect(() => {
    (!isLogged() || isTokenExpired()) && router.push("/login");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {isLogged() && <ProfileDashboard />}
    </div>
  );
};

export default ProfilePage;
