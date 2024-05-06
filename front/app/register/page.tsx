"use client";

import { ProfileDashboard } from "@/components/dashboards/ProfileDashboard";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { isLogged } from "@/utils/account.service";

const page = () => {
  return (
    <div className="flex justify-center h-screen items-center">
      {isLogged() ? <ProfileDashboard /> : <RegisterForm />}
    </div>
  );
};

export default page;
