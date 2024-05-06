"use client";

import { ProfileDashboard } from "@/components/dashboards/ProfileDashboard";
import React from "react";
import { LoginForm } from "@/components/forms/LoginForm";
import { isLogged } from "@/utils/account.service";

const LoginPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {isLogged() ? <ProfileDashboard /> : <LoginForm />}
    </div>
  );
};

export default LoginPage;
