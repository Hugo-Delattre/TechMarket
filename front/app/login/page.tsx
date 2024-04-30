"use client";

import { ProfileDashboard } from "@/components/dashboards/ProfileDashboard";
import React, { useState } from "react";
import { LoginForm } from "@/components/forms/LoginForm";

const LoginPage = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* {isLoggedIn ? <ProfileDashboard /> : <LoginForm />} */}
      {isLoggedIn ? <ProfileDashboard /> : <LoginForm />}
    </div>
  );
};

export default LoginPage;
