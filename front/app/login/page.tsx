"use client";

import { ProfileDashboard } from "@/components/dashboards/ProfileDashboard";
import React, { useEffect } from "react";
import { LoginForm } from "@/components/forms/LoginForm";
import { isLogged, isTokenExpired } from "@/utils/account.service";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  useEffect(() => {
    isLogged() && !isTokenExpired() && router.push("/profile");
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
      <LoginForm />
    </div>
  );
};

export default LoginPage;
